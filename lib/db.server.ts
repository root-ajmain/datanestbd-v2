import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import type { LeadRecord } from './leads/schema';

// PostgreSQL connection pool singleton (if DATABASE_URL is provided)
let pgPool: Pool | null = null;
let pgSchemaInitialized = false;

function getPgPool(): Pool | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.trim() === '') {
    return null;
  }
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: databaseUrl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      // Hosted Postgres (Supabase, Neon, RDS, etc.) requires TLS; the `pg`
      // driver doesn't reliably infer this from a `sslmode=require` query
      // param alone, so it's set explicitly here.
      ssl: { rejectUnauthorized: false },
    });
  }
  return pgPool;
}

async function ensurePgTables(pool: Pool) {
  if (pgSchemaInitialized) return;
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(64) PRIMARY KEY,
        submission_key VARCHAR(128) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ,
        name VARCHAR(128) NOT NULL,
        contact_method VARCHAR(32) NOT NULL,
        contact_value VARCHAR(256) NOT NULL,
        service_id VARCHAR(64) NOT NULL,
        plan_id VARCHAR(64),
        context TEXT,
        inquiry_acknowledged BOOLEAN NOT NULL DEFAULT true,
        marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
        source_page VARCHAR(256),
        utm_source VARCHAR(128),
        utm_medium VARCHAR(128),
        utm_campaign VARCHAR(128),
        pixel_event_id VARCHAR(64),
        processing_status VARCHAR(32) NOT NULL DEFAULT 'received'
      );
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS pixel_event_id VARCHAR(64);

      CREATE INDEX IF NOT EXISTS idx_leads_submission_key ON leads(submission_key);
    `);
    pgSchemaInitialized = true;
  } finally {
    client.release();
  }
}

// Durable file-backed store fallback
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// The file store only persists on a writable, single-instance filesystem.
// Most serverless hosts (e.g. Vercel) give each invocation an ephemeral,
// often read-only filesystem outside /tmp, so leads would silently fail to
// save or vanish between requests there without DATABASE_URL configured.
if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  console.warn(
    '[db.server] DATABASE_URL is not set in production. Lead submissions will fall back to a local JSON file, which is not durable on most serverless hosts.'
  );
}

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(LEADS_FILE);
    } catch {
      await fs.writeFile(LEADS_FILE, '[]', 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring data file:', err);
  }
}

async function readLeadsFile(): Promise<LeadRecord[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(raw) as LeadRecord[];
  } catch {
    return [];
  }
}

async function writeLeadsFile(data: LeadRecord[]): Promise<void> {
  await ensureDataFile();
  const tempPath = `${LEADS_FILE}.tmp.${Date.now()}`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tempPath, LEADS_FILE);
}

// Serializes read-modify-write access to the leads file so concurrent
// submissions can't both pass the idempotency check before either writes,
// which would otherwise create duplicate records for the same key.
let fileStoreQueue: Promise<unknown> = Promise.resolve();
function withFileStoreLock<T>(fn: () => Promise<T>): Promise<T> {
  const result = fileStoreQueue.then(fn, fn);
  fileStoreQueue = result.catch(() => {});
  return result;
}

function rowToLead(row: Record<string, unknown>): LeadRecord {
  return {
    id: row.id as string,
    submissionKey: row.submission_key as string,
    createdAt: (row.created_at as Date).toISOString(),
    updatedAt: row.updated_at ? (row.updated_at as Date).toISOString() : undefined,
    name: row.name as string,
    contactMethod: row.contact_method as LeadRecord['contactMethod'],
    contactValue: row.contact_value as string,
    serviceId: row.service_id as string,
    planId: (row.plan_id as string) || undefined,
    context: (row.context as string) || undefined,
    inquiryAcknowledged: row.inquiry_acknowledged as boolean,
    marketingOptIn: row.marketing_opt_in as boolean,
    sourcePage: row.source_page as string,
    utmSource: (row.utm_source as string) || undefined,
    utmMedium: (row.utm_medium as string) || undefined,
    utmCampaign: (row.utm_campaign as string) || undefined,
    pixelEventId: (row.pixel_event_id as string) || undefined,
    processingStatus: row.processing_status as LeadRecord['processingStatus'],
  };
}

export const db = {
  // Idempotency lookup: has this submission already been recorded?
  async findLeadBySubmissionKey(submissionKey: string): Promise<LeadRecord | null> {
    const pool = getPgPool();
    if (pool) {
      try {
        await ensurePgTables(pool);
        const res = await pool.query('SELECT * FROM leads WHERE submission_key = $1 LIMIT 1', [submissionKey]);
        return res.rows.length === 0 ? null : rowToLead(res.rows[0]);
      } catch (err) {
        console.warn('PostgreSQL query error, falling back to durable file store:', err);
      }
    }

    // Routed through the same lock as writes: an unlocked read here can race
    // Windows' fs.rename in writeLeadsFile (a rename over a file with an open
    // read handle fails with EPERM), and would otherwise let two concurrent
    // requests both miss an in-flight write and create duplicate records.
    return withFileStoreLock(async () => {
      const leads = await readLeadsFile();
      return leads.find((l) => l.submissionKey === submissionKey) || null;
    });
  },

  // Create a new lead from a public contact/inquiry form submission
  async createLead(lead: LeadRecord): Promise<{ lead: LeadRecord; isReplay: boolean }> {
    const pool = getPgPool();
    if (pool) {
      try {
        await ensurePgTables(pool);
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const checkRes = await client.query('SELECT * FROM leads WHERE submission_key = $1 FOR UPDATE', [
            lead.submissionKey,
          ]);
          if (checkRes.rows.length > 0) {
            await client.query('ROLLBACK');
            return { lead: rowToLead(checkRes.rows[0]), isReplay: true };
          }

          await client.query(
            `INSERT INTO leads (
              id, submission_key, created_at, updated_at, name, contact_method, contact_value,
              service_id, plan_id, context, inquiry_acknowledged, marketing_opt_in,
              source_page, utm_source, utm_medium, utm_campaign, pixel_event_id, processing_status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
            [
              lead.id,
              lead.submissionKey,
              lead.createdAt,
              lead.updatedAt || null,
              lead.name,
              lead.contactMethod,
              lead.contactValue,
              lead.serviceId,
              lead.planId || null,
              lead.context || null,
              lead.inquiryAcknowledged,
              lead.marketingOptIn,
              lead.sourcePage,
              lead.utmSource || null,
              lead.utmMedium || null,
              lead.utmCampaign || null,
              lead.pixelEventId || null,
              lead.processingStatus,
            ]
          );

          await client.query('COMMIT');
          return { lead, isReplay: false };
        } catch (txErr) {
          await client.query('ROLLBACK');
          // Unique violation on submission_key means a concurrent request won the
          // insert race. That's a successful replay, not a failure—report it as
          // such instead of falling through to the (separate, unsynced) file store,
          // which would otherwise create a second, inconsistent copy of the lead.
          if ((txErr as { code?: string }).code === '23505') {
            const existing = await client.query('SELECT * FROM leads WHERE submission_key = $1 LIMIT 1', [
              lead.submissionKey,
            ]);
            if (existing.rows.length > 0) {
              return { lead: rowToLead(existing.rows[0]), isReplay: true };
            }
          }
          throw txErr;
        } finally {
          client.release();
        }
      } catch (err) {
        console.warn('PostgreSQL write error, persisting via durable file store:', err);
      }
    }

    return withFileStoreLock(async () => {
      const leads = await readLeadsFile();
      const existing = leads.find((l) => l.submissionKey === lead.submissionKey);
      if (existing) {
        return { lead: existing, isReplay: true };
      }

      leads.push(lead);
      await writeLeadsFile(leads);
      return { lead, isReplay: false };
    });
  },
};
