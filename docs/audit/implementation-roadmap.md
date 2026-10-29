# Implementation roadmap and approval gate

Audit date: 2026-10-29. This document is a proposal only; no implementation is authorized by this report.

## Stage 0 — Decisions required before code

1. Confirm legal name, public contact details, hours and social destinations.
2. Confirm WhatChimp tier, supported feature set, plan pricing, “demo” meaning and permitted claims.
3. Choose the approved service taxonomy: current eight services or the brief’s seven-card grouping.
4. Confirm deployment topology: Hostinger frontend, Vercel/API origin, database, notifications and environment ownership.
5. Confirm which routes are indexed/primary and which historical URLs must retain redirects.

## Proposed phases

| Phase | Current problem | Proposed change | Business impact | Technical approach | Complexity | Risks/dependencies |
|---|---|---|---|---|---|---|
| A. Trust and funnel alignment | Demo/provider language and service taxonomy are inconsistent | Reconcile claims, CTA labels, partnership explanation and service map | Higher buyer confidence; fewer mismatched expectations | Centralize approved copy/config; preserve slugs | Small | Owner/provider confirmation |
| B. WhatsApp sales funnel | Qualification fields and API education are spread across pages | Create/strengthen dedicated WhatsApp page with progressive fields, limitations, credential link and CTAs | Better qualified recurring-revenue leads | Reuse `LeadForm`, schema, analytics, metadata | Medium | WhatChimp/Meta feature validation |
| C. Homepage conversion refinement | H1 is brand-led; proof is illustrative | Test approved commercial hero, trust adjacency, challenge-to-solution mapping and consultation CTA | Clearer first-visit conversion path | Preserve `GrowthExperience`; update content/tokens only after approval | Medium | Avoid factual claim drift |
| D. SEO/content architecture | No blog/knowledge center; crawl evidence incomplete | Complete crawl, map keywords/routes, add reviewed editorial architecture | More qualified organic discovery | Use existing metadata/sitemap patterns; add content only after review | Medium | Search Console baseline unavailable |
| E. Lead reliability | Production persistence/API/notifications unverified | Verify live API, database, notification, CORS, rate limiting and failure paths | Prevent lost inquiries | Controlled test submission; no secret exposure | Medium | Production access and test consent |
| F. Performance/accessibility QA | Motion/video/blur cost is unmeasured | Measure and optimize at required viewports; verify reduced motion and keyboard paths | Better mobile conversion and CWV | Lighthouse/browser evidence, asset budgets, CSS/JS review | Medium | Real-device/network access |
| G. Proof system | No verified metrics/testimonials | Add reusable case-study model with evidence states | Stronger trust without invented claims | Extend `content/projects.ts` with evidence/status fields | Small–Medium | Client permission and measurements |

## Proposed file areas

- Content/config: `content/site.ts`, `content/navigation.ts`, `content/services.ts`, `content/seo-pages.json`, `content/faqs.ts`, `content/pricing.ts`.
- Page composition: `app/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/pricing/page.tsx`, `app/contact/page.tsx`.
- Lead/measurement: `components/forms/LeadForm.tsx`, `components/forms/ContactLeadForm.tsx`, `lib/leads/schema.ts`, `lib/analytics.ts`.
- SEO: `lib/page-metadata.ts`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`.
- QA/docs: `tests/ui.test.tsx`, `docs/audit/*`, future `docs/implementation/*`.

## Approval gate

Before implementation, please approve or revise the decisions in Stage 0 and select the first implementation phase. The recommended first approved change is Phase A (trust/funnel alignment), because it resolves claim and route ambiguity before visual or SEO expansion.

