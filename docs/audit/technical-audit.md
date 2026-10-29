# Technical architecture audit

Audit date: 2026-10-29. Evidence sources are repository paths, package manifests, existing tests, and live-page observations. No source code was changed.

## Architecture inventory

| Area | Finding | Evidence | Priority |
|---|---|---|---|
| Framework | Next.js 15 App Router with React 19 and TypeScript | `package.json`, `app/` route tree | Low |
| Rendering | Server components by default, client components for motion/theme/forms/analytics | `app/layout.tsx`, `components/` | Low |
| Styling | Tailwind CSS v4 plus semantic CSS tokens and premium CSS | `postcss.config.mjs`, `app/globals.css`, `app/premium.css` | Low |
| Deployment | Supports standalone runtime and static export for Hostinger; API may be separate | `next.config.ts`, `scripts/build-static-export.mjs`, `.env.example` | High |
| Persistence | PostgreSQL when `DATABASE_URL` exists; file-backed fallback otherwise | `lib/db.server.ts` | High |
| Lead API | `POST /api/leads`, CORS allowlist, Zod validation, idempotency, rate limiting | `app/api/leads/route.ts`, `lib/leads/*` | Medium |
| Analytics | Meta Pixel PageView, Contact/WhatsApp, ViewContent and Lead wrappers | `components/analytics/*`, `lib/analytics.ts` | Medium |
| SEO | Native sitemap/robots, generated metadata, Organization/WebSite/Service/Breadcrumb JSON-LD | `app/sitemap.ts`, `app/robots.ts`, `lib/page-metadata.ts`, `lib/seo.ts` | Medium |
| Authentication | No public authentication route found in `app/`; historical build notes mention CRM/dashboard work not present in current route tree | `rg --files app`, `BUILD_STATUS.md` | High |

## Findings

### TECH-001 — Production lead durability is not proven (High)

**Evidence:** `lib/db.server.ts` explicitly warns that production without `DATABASE_URL` falls back to local JSON, which is not durable on most serverless hosts. `.env.example` leaves `DATABASE_URL` empty. The repository cannot prove the live environment variable, database connectivity, notification worker, or retention behavior.

**Impact:** A successful form response could be followed by lost inquiries, duplicate handling gaps, or missing notifications.

**Recommendation:** Verify the deployed API origin, production `DATABASE_URL` presence without exposing its value, database migration/schema readiness, notification provider, and a controlled test lead. Do not claim production lead durability from code alone.

### TECH-002 — Static frontend/API split must be verified (High)

**Evidence:** `next.config.ts` comments and `.env.example` describe Hostinger frontend plus Vercel API via `NEXT_PUBLIC_API_BASE_URL`; `app/api/leads/route.ts` allows only specific origins.

**Impact:** A missing or stale API base URL, `www` mismatch, or unlisted preview origin can make the form fail while the site still renders.

**Recommendation:** Verify production browser submission path and CORS preflight against both apex and `www`; never add broad `*` CORS.

### TECH-003 — Rate limiting is process-local (Medium)

**Evidence:** `lib/leads/rate-limit.ts` uses an in-memory `Map`.

**Impact:** Limits reset across serverless instances/restarts and are not a durable abuse-control boundary.

**Recommendation:** Keep application validation, then consider an edge/provider rate limit or shared store after approval and cost review.

### TECH-004 — Security baseline is thoughtfully configured but live headers are unverified (Medium)

**Evidence:** `next.config.ts` declares CSP, frame denial, nosniff, referrer policy, permissions policy and HSTS for non-static deployments.

**Impact:** Static Hostinger output or a proxy may not emit the same headers; Meta/Cloudflare/connect-src changes can also drift.

**Recommendation:** Inspect production response headers for `/`, `/contact`, `/api/leads`, and static-host pages. Compare them to the intended policy and test Meta Pixel/lead behavior after any tightening.

### TECH-005 — Dependency posture needs a current vulnerability scan (Medium)

**Evidence:** Next.js, React, ESLint and other versions are pinned by package ranges/lockfile, but no current `npm audit` result was captured in this phase.

**Recommendation:** Run an approved, read-only dependency audit in the implementation proposal and review transitive findings before upgrades.

### TECH-006 — Repository route truth and historical documents diverge (Medium)

**Evidence:** `app/` currently has no `/dashboard` routes, while `BUILD_STATUS.md` describes dashboard endpoints as live. `bug.md` is dated 2026-10-16 and records an earlier QA state.

**Impact:** Documentation may cause incorrect assumptions about authenticated CRM/API availability.

**Recommendation:** Treat the current route tree and production responses as authoritative; archive or label historical status documents during an approved documentation phase.

## Validation status

- `npm.cmd run lint`: **failed** with one error in `components/media/SectionVideo.tsx:26` (`react-hooks/set-state-in-effect`, synchronous `setReduceMotion` inside an effect) and two warnings: an unused eslint-disable directive in `codex/codex-cli/bin/codex.js` and `@next/next/no-img-element` in `components/analytics/MetaPixel.tsx:36`.
- `npm.cmd run test:ui`: **passed**, 10 tests, 0 failures.
- `npm.cmd run build`: **passed**, Next.js 15.5.28 compiled, type checking completed, 29 static pages generated. The build emitted the `DATABASE_URL` durability warning described in TECH-001. Next build output says linting is skipped during build, so the build pass does not override the lint failure.
- Existing `bug.md` reports a prior successful lint/build/UI pass, but the current lint failure is the authoritative current result.
