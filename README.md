# DataNest BD — Marketing & Consultation Web Application

Full-stack Next.js App Router application built for **DataNest BD**, an AI/automation and engineering agency in Dhaka, Bangladesh, and an official verified WhatChimp Silver Partner.

---

## 1. Verified Partnerships & Proof

- **WhatChimp Silver Agency Partner:**  
  Verified credential: [https://partner.whatchimp.com/credential/datanest-bd/](https://partner.whatchimp.com/credential/datanest-bd/)  
  Official partnership active since March 2026.
- **Customer-Facing Messaging Ecosystem:**  
  FlowGent ([https://flowgent.tech](https://flowgent.tech))

---

## 2. Tech Stack

- **Framework:** Next.js 15+ (App Router), Strict TypeScript, React Server Components
- **Styling:** Exact 9-color authoritative palette, Tailwind CSS v4, semantic CSS custom properties
- **Database & Persistence:**
  - Dual-mode architecture: PostgreSQL with parameterized queries via `pg` connection pool.
  - Durable file-backed ACID WAL repository fallback when `DATABASE_URL` is absent.
  - Idempotent lead deduplication via unique submission keys.
  - Outbox notification queue with exponential backoff retry worker.
- **SEO & Structured Data:**
  - Server-rendered JSON-LD (Organization, WebSite, Service, BreadcrumbList)
  - Native `robots.ts` and `sitemap.ts`
  - OpenGraph & Twitter large image social cards
  - 301 permanent redirects mapped for migration equity

---

## 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://datanestbd.com
DATABASE_URL=postgres://user:password@host:5432/datanest
LEAD_CAPTURE_ENABLED=true
EMAIL_PROVIDER_API_KEY=
LEAD_NOTIFICATION_TO=info@datanestbd.com
LEAD_NOTIFICATION_FROM=leads@datanestbd.com
```

---

## 4. Run & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (Port 3000)
npm run dev

# Run outbox retry worker
npx ts-node scripts/process-outbox.ts

# Production build
npm run build

# Start production server
npm start
```
