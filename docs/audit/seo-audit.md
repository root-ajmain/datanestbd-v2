# SEO and performance audit

Audit date: 2026-10-29. This is a source-backed and publicly observable audit; Search Console, analytics, Lighthouse field data, and authenticated hosting access were not available in this phase.

## Strengths

- Root and content pages use generated metadata from `content/seo-pages.json` through `lib/page-metadata.ts`.
- Canonical URLs, descriptions, Open Graph basics, Twitter card metadata and index/follow controls are present in source.
- `app/sitemap.ts` includes primary pages, all service slugs and all project slugs.
- `app/robots.ts` points to `/sitemap.xml` and uses the canonical origin.
- Organization, WebSite, Service and BreadcrumbList JSON-LD helpers exist and are escaped with `jsonLdString()`.
- Redirect map preserves legacy routes such as `/services/whatsapp`, `/services/web`, `/services/saas`, `/services/ai`, `/case-studies`, `/privacy`, `/terms`, `/refund`, and `/inquiry`.
- Homepage has a single H1, logical H2 sections, descriptive link labels, skip navigation and an accessible form surface in rendered output.

## Findings

### SEO-001 — Production crawl coverage is incomplete (High)

**Evidence:** Live open checks returned full content for `/`, `/pricing`, `/about`, `/services/whatsapp-api`, and `/services/ai-automation`. Several other valid URLs returned crawler cache misses, including `/services`, `/work`, `/contact`, policy pages and some dynamic slugs. This is a tool limitation, not proof of a production 404.

**Impact:** Status codes, redirect behavior, canonical tags, schema and broken links are not yet verified across the full public route set.

**Fix:** Run a browser/HTTP crawl against the canonical domain and record status, final URL, title, H1, canonical, robots, JSON-LD, links, console errors and response headers per route.

### SEO-002 — Twitter card is only `summary` in source (Medium)

**Evidence:** `lib/page-metadata.ts:24` sets `twitter.card` to `summary`; the brief requests social preview assets and Twitter/X metadata.

**Impact:** Reduced social preview prominence and no explicit image in generated page metadata.

**Fix:** Add a verified, brand-safe social image and use `summary_large_image` where appropriate after asset review.

### SEO-003 — Sitemap includes trust/legal pages but not utility `/thank-you`; current behavior should be verified (Low)

**Evidence:** `app/sitemap.ts` includes commercial, project, service and legal pages; `content/seo-pages.json` marks `/thank-you` noindex. This is directionally correct, but live sitemap/robots fetch could not be read by the crawler.

**Fix:** Confirm `/thank-you` is absent from sitemap, sends noindex, and all included URLs are canonical 200s.

### SEO-004 — Service architecture needs keyword/intent reconciliation (High)

**Evidence:** Current service records contain eight offerings, while the requested redesign brief names seven. `content/seo-pages.json` also retains legacy evidence URLs and route guidance.

**Impact:** Changing labels/routes without a mapping can cause cannibalization, broken internal links, or loss of existing intent.

**Fix:** Approve a keyword map and route ownership matrix before altering headings, slugs or navigation.

### SEO-005 — No blog/knowledge-center route is present (Medium)

**Evidence:** `app/` has no blog route; the SEO content file references future content topics and external evidence URLs.

**Impact:** Limited non-brand topical authority and internal-link opportunities for commercial pages.

**Fix:** Propose a reviewed editorial architecture; do not auto-publish unreviewed AI content.

### SEO-006 — LocalBusiness schema is not currently represented (Medium)

**Evidence:** `lib/seo.ts` creates Organization, WebSite, Service and BreadcrumbList; no LocalBusiness helper is present. The brief asks for LocalBusiness only where applicable.

**Impact:** Local entity signals may be incomplete, but adding unsupported address/hours would be worse.

**Fix:** Confirm legal identity, service area, address/online-only model and business hours before deciding whether LocalBusiness is accurate.

### SEO-007 — Performance risks are present but unmeasured (Medium)

**Evidence:** Multiple video assets and motion components are used across the marketing site; CSS includes glass blur and animation. Source has reduced-motion rules, but no current Lighthouse or field CWV result was captured.

**Impact:** LCP/INP on mobile and low-bandwidth Bangladesh connections may be weaker than the brief’s targets.

**Fix:** Measure 360/390/768/1440 widths with cold-cache Lighthouse and real-device/browser checks before optimizing; record LCP, INP proxy, CLS, transfer size and main-thread cost.

## Required measurement before implementation claims

Capture production results for homepage, `/services`, `/pricing`, `/work`, `/contact`, one service detail and one project detail. Include mobile and desktop, with exact date, URL, viewport, network profile, cache state and tool version.

