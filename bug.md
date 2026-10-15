# DataNest BD website QA report

Date: 2026-10-16  
Scope: all routes in `app/`, all service/project slugs in `content/`, redirects, 404, API validation/CORS, existing UI tests, and responsive browser regression checks.

## Summary

- No confirmed end-user page, navigation, responsive-layout, accessibility-label, broken-link, or browser-console defects were found in this pass.
- 21 routes were checked: 19 sitemap routes plus `/thank-you` and `/design-system`.
- All 10 existing UI tests passed.
- The headless browser regression passed for desktop plus 390px and 768px layouts, including no horizontal overflow, no page errors, motion-preference persistence, and the home-page scroll story.
- All tested routes returned `200`; the intentional legacy redirects returned `308`; the unknown route returned `404`.
- The production build passed after the fixes and generated all 28 static pages.

## Confirmed bugs

### BUG-001 — Canonical npm scripts fail when the workspace path contains `&`

- Severity: Medium (developer/QA workflow blocker)
- Status: Resolved
- Affected commands: `npm run lint`, `npm run build`, `npm run test:ui`
- Reproduction:

  1. Run any of the commands above from this workspace:
     `C:\Users\ajmai\Downloads\datanest-bd---whatsapp-api,-ai-&-web-development`
  2. The npm-generated Windows launcher mis-parses the path at `&`.

- Observed result: the launcher reports `'-web-development\\node_modules\\.bin\\' is not recognized` and then tries to load modules from paths such as `C:\Users\ajmai\Downloads\eslint` or `C:\Users\ajmai\Downloads\next`.
- Expected result: the package scripts should resolve binaries relative to the project directory and run normally.
- Fix applied: the `dev`, `build`, `start`, and `lint` scripts now invoke the local Node entrypoints directly, avoiding the broken Windows `.bin` launcher path.
- Verification: `npm.cmd run lint` passed, `npm.cmd run build` passed, and `npm.cmd run test:ui` passed after allowing its Node worker process to spawn.

## Follow-up observation

### OBS-001 — Intermittent missing webpack chunks during the first dirty-cache dev run

- Severity: Low to Medium (development runtime; not reproduced in the clean background run)
- Status: Needs follow-up
- During the first concurrent cold-route crawl, the dev server logged errors including `Cannot find module './611.js'`, `Cannot find module './897.js'`, and `_app` load errors from `.next/server`. Retrying the routes returned `200`.
- After restarting the server as a hidden background process, the same full route crawl and headless browser regression completed without entries in `dev-bg-err.log`.
- Current disposition: not reproduced after the redesign in the clean hidden background run; retain as a development-cache follow-up rather than a confirmed production defect.

## Front-end enhancement completed

- Added a service-led operating-layer map to `/services` covering WhatsApp operations, web/SaaS engineering, AI workflows, and growth/Meta systems.
- Added direct links from every layer to its service specification page and a clear contact handoff.
- Added a subtle `ONLINE - DHAKA` availability signal to the desktop navigation while preserving the existing mobile navigation behavior.
- Added responsive and reduced-motion styling for the new map using the existing dark glass/neon design system; no horizontal overflow was found at 390px or 768px.
- Primary files changed: `components/sections/ServiceSignalMap.tsx`, `app/services/page.tsx`, `components/shell/GlobalNavbar.tsx`, `app/premium.css`, and `package.json`.

## Coverage and results

### Routes

Checked: `/`, `/pricing`, `/services`, `/work`, `/about`, `/contact`, `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`, `/thank-you`, `/design-system`, all seven service slugs, and all three work slugs.

Also checked:

- `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/icon.svg`, representative image/font assets
- Legacy redirects in `next.config.ts`
- Unknown-route 404 handling
- Internal links discovered across all checked HTML pages: no broken internal targets found
- Page titles, one H1 per route, and image `alt` attributes: no missing items found

### Forms/API

- Invalid JSON: `400`
- Invalid payload: `400` with field-level errors
- Allowed-origin preflight: `204` with CORS headers
- Disallowed-origin response: no allow-origin header
- Existing `tests/ui.test.tsx`: 10 passed, 0 failed

### Tooling note

The final canonical production command `npm.cmd run build` completed successfully, including type checking, static generation, trace collection, and the 28-page route manifest. ESLint completed with one pre-existing unused-disable warning in `codex/codex-cli/bin/codex.js` and no errors.
