import { serviceCopy } from './service-copy';
export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortOutcome: string;
  summary: string;
  group: 'whatsapp' | 'development' | 'ai' | 'marketing';
  groupLabel: string;
  deliverables: string[];
  process: { step: string; description: string }[];
  boundaries: string[];
  faqs: { question: string; answer: string }[];
  ctaIntent: string;
  ctaText: string;
  highlightImage?: string;
}

export const services: ServiceItem[] = [
  {
    id: 'whatsapp-api',
    slug: 'whatsapp-api',
    title: 'Official WhatsApp Business API via WhatChimp',
    shortOutcome: 'Organize customer conversations, team replies, and permitted follow-up with official infrastructure.',
    summary: serviceCopy['whatsapp-api'].summary,
    group: 'whatsapp',
    groupLabel: 'WhatsApp & Customer Operations',
    deliverables: [
      'Official Meta WhatsApp Business Account (WABA) setup & phone number verification',
      'WhatChimp workspace provisioning for multi-agent support teams',
      'Meta-compliant message template drafting, submission & category mapping',
      'Automated routing & keyword-based qualification workflows',
      'CRM integration with webhooks and lead sync',
      'Opt-in permission logging and suppression list configuration',
    ],
    process: [
      { step: '01. Eligibility & Asset Audit', description: 'Review phone number history, Meta Business Portfolio, and brand website requirements.' },
      { step: '02. Platform Provisioning', description: 'Configure WhatChimp partnership connection, workspace permissions, and agent seats.' },
      { step: '03. Template & Workflow Architecture', description: 'Draft transactional and utility templates adhering strictly to Meta content policies.' },
      { step: '04. Verification & Testing', description: 'Test two-way live messaging, webhook delivery, and agent assignment rules with test contacts.' },
      { step: '05. Team Training & Go-Live', description: 'Equip support reps with canned replies, tag management, and escalation paths.' },
    ],
    boundaries: [
      'The official API does not bypass Meta sending rules or policy enforcement.',
      'Template approval is determined solely by Meta automated and manual reviewers.',
      'Recipient tier limits scale based on recipient feedback and messaging quality, not artificial vendor promises.',
      'DataNest assists with verification readiness; Meta makes final account verification decisions.',
    ],
    faqs: serviceCopy['whatsapp-api'].faqs,
    ctaIntent: 'consultation',
    ctaText: 'Request a WhatsApp Consultation',
    highlightImage: '/images/datanest_whatsapp_flowgent_1791075386142.jpg',
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Conversion-Focused Websites & Web Applications',
    shortOutcome: 'A clearer path from visitor intent to a qualified, durable business inquiry.',
    summary: serviceCopy['web-development'].summary,
    group: 'development',
    groupLabel: 'Websites & SaaS Engineering',
    deliverables: [
      'Next.js App Router architecture with strict TypeScript',
      'Responsive interface with performance checks on representative networks',
      'Accessible semantic structure meeting WCAG 2.1 AA standards',
      'Durable lead capture with server-side validation and database storage',
      'Clean SEO architecture with OpenGraph, JSON-LD, and XML sitemaps',
    ],
    process: [
      { step: '01. Scope & Flow Definition', description: 'Map visitor buyer journeys, primary conversion goals, and content taxonomy.' },
      { step: '02. UI/UX & Component Systems', description: 'Build responsive design layouts with strict typographic and contrast discipline.' },
      { step: '03. Frontend & Server Implementation', description: 'Develop server components, secure API endpoints, and database adapters.' },
      { step: '04. Performance & Accessibility QA', description: 'Audit Core Web Vitals, screen reader compatibility, and keyboard navigation.' },
      { step: '05. Production Handover', description: 'Deploy to scalable cloud containers with custom domain, SSL, and error monitoring.' },
    ],
    boundaries: [
      'Website delivery focuses on the agreed business scope and documented API contracts.',
      'Ongoing content authoring and continuous hosting maintenance are defined via transparent service agreements.',
    ],
    faqs: serviceCopy['web-development'].faqs,
    ctaIntent: 'website',
    ctaText: 'Discuss Your Website',
    highlightImage: '/images/datanest_hero_workspace_1791075374724.jpg',
  },
  {
    id: 'saas-development',
    slug: 'saas-development',
    title: 'Full-Stack SaaS Product Engineering',
    shortOutcome: 'Build a usable, scalable digital product around a defined business workflow.',
    summary: serviceCopy['saas-development'].summary,
    group: 'development',
    groupLabel: 'Websites & SaaS Engineering',
    deliverables: [
      'Modular full-stack application architecture (Next.js / Node / PostgreSQL)',
      'Multi-tenant database schema with secure role-based access control (RBAC)',
      'API gateway and webhook notification pipelines',
      'Subscription billing and payment gateway integration',
      'Automated testing suites and continuous deployment pipelines',
    ],
    process: [
      { step: '01. Product Discovery & Data Modeling', description: 'Identify user personas, critical user journeys, and entity relationships.' },
      { step: '02. MVP Architecture', description: 'Engineer core authentication, permission barriers, and primary workflow logic.' },
      { step: '03. Iterative Build Sprints', description: 'Implement tenant dashboards, data pipelines, and external integrations.' },
      { step: '04. Security Audit & Stress Testing', description: 'Verify SQL injection defenses, rate limits, and concurrent query loads.' },
      { step: '05. Staging & Production Deployment', description: 'Launch with automated backups, monitoring, and runbooks.' },
    ],
    boundaries: [
      'We do not guarantee arbitrary completion dates without clear milestone scopes.',
      'Third-party cloud infrastructure charges are paid directly by the client.',
    ],
    faqs: serviceCopy['saas-development'].faqs,
    ctaIntent: 'saas',
    ctaText: 'Scope a SaaS Product',
    highlightImage: '/images/datanest_saas_platform_1791075396246.jpg',
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI Agents & Smart Workflow Automation',
    shortOutcome: 'Reduce repetitive operations with defined boundaries and explicit human fallback.',
    summary: serviceCopy['ai-automation'].summary,
    group: 'ai',
    groupLabel: 'AI Agents & Workflows',
    deliverables: [
      'Grounded retrieval and context extraction from enterprise documents',
      'Automated lead triage and support ticket classification',
      'Deterministic rule validation before external state changes',
      'Explicit human-in-the-loop review queues for sensitive workflows',
      'Structured audit logs for all automated actions and tool executions',
    ],
    process: [
      { step: '01. Workflow Mapping', description: 'Identify repetitive bottleneck tasks, input formats, and accuracy requirements.' },
      { step: '02. Boundary & Guardrail Definition', description: 'Establish permitted actions, confidence thresholds, and human escalation triggers.' },
      { step: '03. Integration & Testing', description: 'Connect business APIs, evaluate edge cases, and benchmark model responses.' },
      { step: '04. Deployment & Observability', description: 'Roll out automated tasks with continuous performance logging and latency monitoring.' },
    ],
    boundaries: [
      'We do not deploy hallucination-prone autonomous systems without human fallback controls.',
      'Model compute token costs are transparently separated from agency engineering fees.',
    ],
    faqs: serviceCopy['ai-automation'].faqs,
    ctaIntent: 'automation',
    ctaText: 'Scope an AI Workflow',
    highlightImage: '/images/datanest_ai_automation_1791075407796.jpg',
  },
  {
    id: 'landing-pages',
    slug: 'landing-pages',
    title: 'High-Converting Landing Pages',
    shortOutcome: 'Connect one campaign to one clear, measurable, and frictionless action.',
    summary: serviceCopy['landing-pages'].summary,
    group: 'marketing',
    groupLabel: 'Ads & Meta Ecosystem',
    deliverables: [
      'Single-focus visual hierarchy tailored to specific campaign angles',
      'Mobile-first layout with page-speed and usability testing',
      'Context-preserving inquiry form with instant validation',
      'Clean event attribution for Meta Pixel and Google Ads tracking',
    ],
    process: [
      { step: '01. Campaign Angle Alignment', description: 'Analyze target audience intent, ad hooks, and primary offer objection points.' },
      { step: '02. Wireframe & Visual Composition', description: 'Craft compelling typography, proof adjacency, and focused action areas.' },
      { step: '03. Build & Conversion Tracking', description: 'Implement server-rendered page with precise client and server event tagging.' },
    ],
    boundaries: [
      'Conversion rates depend on traffic quality, ad message match, and market fit, not code alone.',
    ],
    faqs: serviceCopy['landing-pages'].faqs,
    ctaIntent: 'landing-page',
    ctaText: 'Discuss a Landing Page',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Data-Driven Facebook & Google Ads',
    shortOutcome: 'Track qualified leads and real business outcomes rather than vanity clicks.',
    summary: serviceCopy['digital-marketing'].summary,
    group: 'marketing',
    groupLabel: 'Ads & Meta Ecosystem',
    deliverables: [
      'Full campaign architecture (Top-of-funnel discovery to high-intent retargeting)',
      'Ad copy, structured angles, and creative asset direction',
      'Conversion API (CAPI) & Google Ads enhanced conversion setup',
      'Weekly performance reporting focused on Cost Per Qualified Lead (CPQL)',
    ],
    process: [
      { step: '01. Offer & Audience Audit', description: 'Define ideal customer profiles and audit past campaign historical metrics.' },
      { step: '02. Tracking Infrastructure', description: 'Verify pixel firing, domain verification, and server conversion events.' },
      { step: '03. Creative Execution & Testing', description: 'Launch structured split tests across creative variations and copy hooks.' },
      { step: '04. Optimization & Scaling', description: 'Reallocate budget towards validated high-intent audiences and ads.' },
    ],
    boundaries: [
      'Ad spend is paid directly by the client to Meta/Google; our fee covers strategy, management, and tracking.',
      'We do not make unrealistic guaranteed ROAS promises without baseline performance data.',
    ],
    faqs: serviceCopy['digital-marketing'].faqs,
    ctaIntent: 'marketing',
    ctaText: 'Discuss a Campaign',
  },
  {
    id: 'marketing-motion-videos',
    slug: 'marketing-motion-videos',
    title: 'Marketing Motion Videos',
    shortOutcome: 'Short, platform-ready video content built around one offer and one message.',
    summary: serviceCopy['marketing-motion-videos'].summary,
    group: 'marketing',
    groupLabel: 'Ads & Meta Ecosystem',
    deliverables: [
      'Script and storyboard aligned to your offer and target platform',
      'Short-form motion video edited for Reels, TikTok, YouTube Shorts and ad placements',
      'On-brand captions, typography and pacing suited to sound-off viewing',
      'Platform-specific exports (aspect ratio, length, burned-in captions)',
      'Poster frame and thumbnail for feed and ad placements',
    ],
    process: [
      { step: '01. Brief & Script', description: 'Define the message, audience and destination platform before any visual work starts.' },
      { step: '02. Storyboard & Asset Collection', description: 'Draft the shot sequence and gather product photos, screen recordings or brand assets needed.' },
      { step: '03. Edit & Motion Design', description: 'Edit the video with pacing, captions and brand-consistent typography.' },
      { step: '04. Review & Platform Export', description: 'Revise against feedback, then export in the sizes and formats each destination platform needs.' },
    ],
    boundaries: [
      'Video production does not guarantee a specific view count, engagement rate or ad performance.',
      'Licensed stock footage, music or voiceover talent are billed separately when used.',
      'Revisions follow the agreed brief; new concepts outside that scope are quoted separately.',
    ],
    faqs: serviceCopy['marketing-motion-videos'].faqs,
    ctaIntent: 'motion-video',
    ctaText: 'Discuss a Video Project',
  },
  {
    id: 'meta-ecosystem',
    slug: 'meta-ecosystem',
    title: 'Facebook Ecosystem Setup & Verification Assistance',
    shortOutcome: 'Configure business assets, permissions, and submission readiness.',
    summary: serviceCopy['meta-ecosystem'].summary,
    group: 'marketing',
    groupLabel: 'Ads & Meta Ecosystem',
    deliverables: [
      'Meta Business Portfolio hierarchy structuring and security audit',
      'Two-factor authentication compliance across organizational assets',
      'Domain DNS TXT verification and event aggregation setup',
      'WhatsApp Business Account linking and payment method setup',
      'Partner access role assignment without sharing personal credentials',
    ],
    process: [
      { step: '01. Asset Audit', description: 'Review current access levels, orphaned pages, and security configurations.' },
      { step: '02. Legal Documentation Review', description: 'Prepare trade license, utility bills, and bank statements matching Meta criteria.' },
      { step: '03. Submission Guidance', description: 'Guide your authorized representative through the official Meta verification portal.' },
    ],
    boundaries: [
      'Verification approval is the sole discretion of Meta Platforms, Inc.',
      'We assist with document conformity, technical setup, and readiness audit.',
    ],
    faqs: serviceCopy['meta-ecosystem'].faqs,
    ctaIntent: 'meta-setup',
    ctaText: 'Request Setup Assessment',
  },
];

export const serviceGroups = [
  {
    id: 'whatsapp',
    title: 'WhatsApp & Customer Operations',
    shortTitle: 'WhatsApp API',
    description: 'Official WhatsApp Business Platform infrastructure, WhatChimp partnership, multi-agent workspaces, and compliance.',
    serviceIds: ['whatsapp-api'],
  },
  {
    id: 'development',
    title: 'Websites & SaaS Engineering',
    shortTitle: 'Web & SaaS',
    description: 'High-speed Next.js web applications, digital products, and resilient cloud architectures.',
    serviceIds: ['web-development', 'saas-development'],
  },
  {
    id: 'ai',
    title: 'AI Agents & Smart Workflows',
    shortTitle: 'AI Workflows',
    description: 'Grounded intelligence, business workflow automation, and structured human-in-the-loop escalation.',
    serviceIds: ['ai-automation'],
  },
  {
    id: 'marketing',
    title: 'Ads & Meta Ecosystem',
    shortTitle: 'Ads & Meta',
    description: 'Campaign tracking, qualified inquiry generation, and Meta Business Portfolio configuration.',
    serviceIds: ['landing-pages', 'digital-marketing', 'marketing-motion-videos', 'meta-ecosystem'],
  },
];
