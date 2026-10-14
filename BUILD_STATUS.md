# DataNest BD — Build Status & Verification Checklist

**Project:** DataNest BD Marketing, Consultation & CRM Platform  
**Version:** 2.0 (Next.js App Router + TypeScript + Tailwind CSS + Secure CRUD Backend)  
**Location:** Dhaka, Bangladesh  
**Partner Status:** Official WhatChimp Silver Partner (Since March 2026)  
**Credential:** [https://partner.whatchimp.com/credential/datanest-bd/](https://partner.whatchimp.com/credential/datanest-bd/)

---

## 1. Stage Progress Checklist

- [x] **Color System Overhaul (Exact New Brand Palette)**
  - [x] Defined all 15 authoritative tokens in `:root` and dark mode variant.
  - [x] Zero legacy hex colors remaining; zero invented colors.
  - [x] **Rule 1 (Absolute):** Orange fills use `--navy-900` for text labels. NEVER white on `--orange-600` (4.84:1 passes AA).
  - [x] **Rule 2 (Absolute):** Iron Red is only used on light surfaces (`--white`, `--grey-100`, `--orange-50`). Never on `--navy-800`.
  - [x] **Rule 3 (Absolute):** NEVER `--orange-600` as text on white/grey-100. Uses `--red-700` instead.
  - [x] **Rule 4 & 5:** Orange is strictly an accent, one primary CTA per viewport.
  - [x] **Rule 6:** `--grey-200` is for structural borders and dividers only.

- [x] **Secure Database Integration & CRUD Backend**
  - [x] **Create (POST /api/leads):** Validates with Zod, checks idempotency key, records lead and outbox in transactional storage.
  - [x] **Read List (GET /api/leads):** Search by keyword, filter by status, service, and contact method.
  - [x] **Read Single (GET /api/leads/[id]):** Retrieve complete audit trail, UTM tags, submission key.
  - [x] **Update (PATCH /api/leads/[id]):** Update pipeline status (`received`, `in_review`, `contacted`, `archived`), priority (`normal`, `high`, `urgent`), and internal team notes.
  - [x] **Delete (DELETE /api/leads/[id]):** Cascade removal of lead and associated notification records.
  - [x] **Aggregations (GET /api/leads/stats):** Real-time CRM metrics for dashboard cards.

- [x] **Responsive CRM Dashboard UI (`/dashboard`)**
  - [x] Visual metrics: Total Inquiries, Pending Review, In Progress, Resolution Rate.
  - [x] Interactive filtering: Search by client name/value/context, status tabs, service selector.
  - [x] Responsive layout: Adapts from wide table with horizontal scroll to mobile cards.
  - [x] Slide-over drawer for inspecting and managing individual leads.
  - [x] Manual lead creation modal for phone/referral consultations.
  - [x] Permanent deletion confirmation modal with safety guard.
  - [x] Direct WhatsApp and email communication triggers (`wa.me` & `mailto:`).

---

## 2. Route Inventory

| Route | Status | Type | Purpose |
|---|---|---|---|
| `/` | Live | Static/ISR | Agency overview, WhatChimp proof, 4 service groups, process, lead form |
| `/dashboard` | Live | Dynamic Client | Responsive CRM Dashboard with full CRUD lead management |
| `/services` | Live | Static | Catalog of all 7 services grouped with technical deliverables |
| `/services/[slug]` | Live | Static (7 slugs) | Dedicated deep-dive for each service with boundaries, process, and FAQ |
| `/pricing` | Live | Static | Quote-led project scoping framework with explicit deliverable inclusions |
| `/work` | Live | Static | Reference system architectures and production workflows |
| `/work/[slug]` | Live | Static (3 slugs) | Architectural deep-dive with problem/scope/outcomes |
| `/about` | Live | Static | Company background, Dhaka HQ, and WhatChimp partnership verification |
| `/contact` | Live | Dynamic | Contextual inquiry form supporting query params (`service`, `plan`) |
| `/thank-you` | Live | Static (noindex) | Inquiry confirmation receipt |
| `/privacy-policy` | Live | Static | Data processing & privacy policy |
| `/terms-and-conditions`| Live | Static | Terms of service and Meta platform boundaries |
| `/refund-policy` | Live | Static | Milestone billing and cancellation policy |
| `/api/leads` | Live | GET & POST | List inquiries with filters (GET) and record new inquiries (POST) |
| `/api/leads/[id]` | Live | GET, PATCH, DELETE | Retrieve, update status/notes/priority, or delete a single lead |
| `/api/leads/stats` | Live | GET | Aggregate metrics for dashboard KPIs |
| `/sitemap.xml` | Live | Dynamic | Production XML sitemap |
| `/robots.txt` | Live | Dynamic | Robots crawler directive |
