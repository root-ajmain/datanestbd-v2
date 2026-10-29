# DataNest BD website audit

Audit date: 2026-10-29  
Scope: repository, publicly accessible production pages, route inventory, conversion surfaces, SEO configuration, lead handling, accessibility signals, and validation commands.  
Change boundary: no application source files were modified during Phase 1. These reports are the only Phase 1 deliverables.

## Executive summary

The current site is a polished Next.js App Router marketing site with a clear Dhaka/online-delivery position, a visible WhatChimp credential link, illustrative-work disclosures, and a strong narrative homepage. The repository already contains reusable service, project, metadata, schema, lead-validation, analytics, and responsive-motion systems. This is an optimization project, not a blind rebuild.

Highest-impact findings:

1. **High — Lead durability is deployment-dependent.** `lib/db.server.ts` warns that production without `DATABASE_URL` falls back to a local JSON store that is not durable on most serverless hosts. Production storage, notifications, and API origin must be verified independently.
2. **High — Contact identity requires owner confirmation.** Current source/live evidence consistently shows `info@datanestbd.com`, `+880 1804-277420`, Dhaka, online consultations, Sunday–Thursday GMT+6. The legal name `DataNest BD Ltd.` and “Silver Partner since March 2026” are source claims, while credential-page content could not be rendered by the crawler; confirm business records before expanding identity claims.
3. **High — The brief’s required seven-service taxonomy differs from the current eight service records.** The current site includes Marketing Motion Videos and Meta Ecosystem Setup in addition to the six core groups; the target information architecture must be approved before content or routes change.
4. **High — WhatsApp pricing and feature claims are commercially sensitive.** Live pricing is explicit and Meta charges are stated separately, but WhatChimp/provider configuration and current Meta pricing were not verified from account access. Preserve disclaimers and obtain owner/provider confirmation before promoting “official provider”, payments, AI agent, broadcast, or plan-inclusion claims.
5. **Medium — Technical SEO is substantially implemented but needs a rendered production crawl.** Source includes metadata, canonicals, JSON-LD, sitemap, robots, redirects and security headers. Several live URL fetches returned crawler cache misses, so status, headers, schema and broken-link coverage remain incomplete until a browser/HTTP crawl is run.
6. **Medium — Conversion qualification is light.** Homepage forms collect name/business, service, WhatsApp number, meeting platform, details and consent. They do not currently collect company, business email, industry, message volume, preferred contact method, or explicit lead-source context as requested for the WhatsApp funnel.

## What is working

- Clear positioning around WhatsApp operations, web/software, AI/workflow automation and growth.
- Homepage has primary contact CTAs, service discovery, reference work, FAQ, WhatsApp escape hatch and consented inquiry form.
- WhatChimp credential URL is linked in the homepage, footer, about page and structured organization data.
- Illustrative reference architectures are labeled as illustrative and do not claim client results.
- Source has `prefers-reduced-motion` handling, semantic form labels, a skip link, responsive rules, security headers, rate limiting, Zod validation and idempotency fields.
- Legacy service/case-study/privacy/terms/refund/inquiry routes have permanent redirects in `next.config.ts`.

## Current repository state

- Uncommitted user files are present: `public/videos/23087-333074572.mp4` and `public/videos/cyber-plexus.mp4`. They were not touched.
- Current repository also contains historical `bug.md`, `BUILD_STATUS.md`, `SEO_KEYWORD_MAP.csv`, `SEO_RESEARCH.md`, and `content/seo-pages.json`; these are useful context but are not treated as current live proof without re-verification.
- Validation commands were started hidden/background. Final process status is recorded in `technical-audit.md`.

## Priority legend

- Critical: blocks safe operation, indexability, or trustworthy lead capture.
- High: material business, trust, security, or SEO risk.
- Medium: meaningful optimization or maintainability issue.
- Low: polish, measurement, or backlog improvement.

## Phase 1 decision

Do not implement the redesign until the owner confirms: (a) service taxonomy, (b) legal/contact identity, (c) current WhatChimp plan/feature boundaries, (d) production lead storage/API deployment, and (e) which current routes must remain primary for SEO equity.

