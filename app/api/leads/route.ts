import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { leadSubmissionSchema, type LeadRecord } from '@/lib/leads/schema';
import { db } from '@/lib/db.server';
import { checkRateLimit } from '@/lib/leads/rate-limit';

export const dynamic = 'force-dynamic';

// The frontend is deployed on a different origin (Hostinger) from this API
// (Vercel), so cross-origin requests need explicit CORS headers.
const ALLOWED_ORIGINS = ['https://datanestbd.com', 'https://www.datanestbd.com', 'http://localhost:3000'];

function corsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

// POST: Create New Lead Record (public contact/inquiry form submission)
export async function POST(req: NextRequest) {
  const cors = corsHeaders(req);
  try {
    // 1. Rate limiting by IP. X-Forwarded-For is a client-supplied header —
    // the *leftmost* entry is whatever the caller put there and is trivial
    // to spoof to a fresh value on every request to dodge the limit below.
    // Behind a reverse proxy (Vercel, Nginx, etc.) the proxy appends the
    // connection's real IP as the *last* entry, which the caller cannot
    // override, so that's the one this trusts. x-real-ip (set by some
    // proxies instead) is checked first since it isn't a comma-joined list.
    const realIp = req.headers.get('x-real-ip');
    const forwarded = req.headers.get('x-forwarded-for');
    const forwardedList = forwarded ? forwarded.split(',').map((part) => part.trim()).filter(Boolean) : [];
    const ip = realIp || forwardedList[forwardedList.length - 1] || 'unknown';

    const rateResult = checkRateLimit(ip, 12, 10 * 60 * 1000);
    if (!rateResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait a moment before submitting another inquiry.',
          retryAfter: rateResult.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            ...cors,
            'Retry-After': String(rateResult.retryAfterSeconds),
          },
        }
      );
    }

    // 2. Parse & Validate body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400, headers: cors });
    }

    const validationResult = leadSubmissionSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors,
        },
        { status: 400, headers: cors }
      );
    }

    const data = validationResult.data;

    // 3. Check Idempotency Key
    const existingLead = await db.findLeadBySubmissionKey(data.idempotencyKey);
    if (existingLead) {
      return NextResponse.json(
        {
          success: true,
          isReplay: true,
          receipt: {
            id: existingLead.id,
            submissionKey: existingLead.submissionKey,
            createdAt: existingLead.createdAt,
            status: existingLead.processingStatus,
          },
          message: 'Your inquiry has already been received and logged.',
        },
        { status: 200, headers: cors }
      );
    }

    // 4. Construct Lead Record
    const leadId = `lead_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const nowIso = new Date().toISOString();

    const newLead: LeadRecord = {
      id: leadId,
      submissionKey: data.idempotencyKey,
      createdAt: nowIso,
      updatedAt: nowIso,
      name: data.name,
      contactMethod: data.contactMethod,
      contactValue: data.contactValue,
      serviceId: data.serviceId,
      planId: data.planId,
      context: data.context,
      inquiryAcknowledged: data.inquiryAcknowledged,
      marketingOptIn: data.marketingOptIn,
      sourcePage: data.sourcePage,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      processingStatus: 'received',
    };

    // 5. Durable transactional persistence
    const saved = await db.createLead(newLead);

    return NextResponse.json(
      {
        success: true,
        isReplay: saved.isReplay,
        receipt: {
          id: saved.lead.id,
          submissionKey: saved.lead.submissionKey,
          createdAt: saved.lead.createdAt,
          status: saved.lead.processingStatus,
        },
        message: 'Inquiry received securely. Our team will review your requirements and respond promptly.',
      },
      { status: saved.isReplay ? 200 : 201, headers: cors }
    );
  } catch (error: unknown) {
    console.error('[POST /api/leads error]:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while recording your inquiry.' },
      { status: 500, headers: cors }
    );
  }
}
