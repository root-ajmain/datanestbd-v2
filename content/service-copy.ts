export const serviceCopy: Record<string, {
  summary: string;
  faqs: { question: string; answer: string }[];
}> = {
  'whatsapp-api': {
    summary: 'A WhatsApp API project starts with your support workflow, business account access and phone-number readiness. We configure the agreed shared inbox, agent assignments, approved message templates and CRM handoffs, then walk your team through daily use. Order updates, appointment reminders and lead qualification each need clear triggers and a route to a person when automation cannot help. Setup also includes reviewing recipient permission and opt-out handling. Platform configuration does not guarantee a verification badge, unlimited messaging or protection from account restrictions.',
    faqs: [
      { question: 'How is the WhatsApp Business API different from the app?', answer: 'The API connects WhatsApp messaging to software such as a shared team inbox, CRM or workflow service. It is useful when a business needs integrations and structured team handling. The right choice depends on your message volume, team size and operational needs.' },
      { question: 'What should we prepare before setup?', answer: 'Prepare authorized access to your Meta business assets, your business details, a suitable phone number and the workflows you want to support. We assess the existing number and account setup before confirming the onboarding approach. Keep account ownership with your business.' },
      { question: 'How are platform fees and Meta messaging charges different?', answer: 'DataNest BD package fees cover the agreed platform and onboarding services. Applicable Meta fees are separate and depend on delivered messages, message category and recipient market. Service replies within the customer service window are free of Meta messaging charges. Check the current Meta rate card before budgeting.' },
      { question: 'Can official API accounts still be restricted?', answer: 'Yes. Using the official API does not remove Meta policies or account-quality checks. Recipient permission, appropriate templates and opt-out handling remain necessary. Meta controls restrictions and approvals.' },
    ],
  },
  'web-development': {
    summary: 'We start by identifying who visits your website, what they need to understand and which action matters to the business. The project scope defines page content, responsive layouts, inquiry forms and any integration with a CRM or WhatsApp. Development uses Next.js and TypeScript where appropriate, with reviewable staging work and testing before handover. Technical SEO covers descriptive page metadata, crawlable content and canonical URLs. Performance is tested against agreed conditions; hosting, third-party scripts and network quality affect real visitor results.',
    faqs: [
      { question: 'What affects the cost of a business website?', answer: 'Cost depends on page count, content preparation, custom interactions, integrations and operational requirements. A brochure website and a role-based application need different scopes. We prepare the estimate after reviewing those requirements.' },
      { question: 'Does technical SEO guarantee Google rankings?', answer: 'No. Technical SEO helps search engines access and understand a site. Rankings also depend on useful content, competition and other signals. We define implementation deliverables rather than promise a position in search results.' },
      { question: 'Can our website connect to WhatsApp or a CRM?', answer: 'Yes, subject to the destination system and agreed scope. An integration may be a clear WhatsApp handoff, a validated form submission or an authenticated webhook. We define which data is sent and how failures are handled before implementation.' },
    ],
  },
  'saas-development': {
    summary: 'A useful SaaS MVP starts with one customer workflow and clear acceptance criteria. We map users, organizations, permissions and data ownership before implementing the product. The scope can include authentication, tenant-aware records, subscription billing, admin tools and reports. Integrations, migration and operational support are planned explicitly rather than assumed. Delivery milestones give you a working increment to review, while deployment documentation explains configuration, backups and ongoing infrastructure costs. Source-code handover follows the agreed project terms.',
    faqs: [
      { question: 'How do you decide what belongs in the MVP?', answer: 'We identify the smallest workflow that lets a real user complete the core task. Secondary features are prioritized separately. The agreed milestone scope defines the user roles, inputs, outputs and acceptance checks.' },
      { question: 'Can the product support several customer organizations?', answer: 'Yes, when multi-tenancy is included in scope. Tenant data ownership and authorization must be designed and tested explicitly, including reporting, exports and administrative access.' },
      { question: 'What costs continue after the build?', answer: 'Hosting, database services, email or messaging usage, third-party licenses and maintenance may create recurring costs. We separate those from development fees. Custom code ownership and handover follow your project agreement.' },
    ],
  },
  'ai-automation': {
    summary: 'We begin with a repeatable task, a set of representative inputs and an agreed definition of a correct result. A workflow may extract inquiry details, classify documents, retrieve approved knowledge or prepare a response for review. Integrations run within defined permissions, and uncertain or sensitive cases go to a person. Validation and logging help identify failures and support correction. A pilot should measure usefulness, error rates, latency and operating cost before wider rollout. AI can still make mistakes; retrieval and guardrails reduce risk rather than eliminate it.',
    faqs: [
      { question: 'Which tasks are good candidates for AI automation?', answer: 'Start with repetitive tasks that have accessible inputs and a result your team can evaluate, such as inquiry triage or document classification. Tasks with unclear rules or high consequences usually need stronger human review.' },
      { question: 'Can you guarantee that an AI agent never makes a mistake?', answer: 'No. We use approved knowledge, structured outputs, validation and human escalation to manage errors. Testing uses representative examples, and the production workflow needs monitoring and correction paths.' },
      { question: 'Are model usage charges included in development?', answer: 'Model inference, hosting and external API charges are separate from engineering unless your scope says otherwise. We estimate usage during planning and review actual cost during the pilot.' },
    ],
  },
  'landing-pages': {
    summary: 'A campaign landing page should answer the question raised by the ad or search result. We align the headline, offer, evidence and call to action before building the interface. The page then needs readable mobile content, usable forms and a clear confirmation or handoff. Tracking is configured around meaningful actions, such as a completed inquiry, rather than treating every button click as a sale. Testing can compare a specific copy or form hypothesis once there is enough relevant traffic. Results still depend on the offer, audience and follow-up process.',
    faqs: [
      { question: 'How is a landing page different from a full website?', answer: 'A landing page focuses on one audience, one offer and one next step. A full website supports broader discovery across services, company information and resources. Campaign pages should match the intent of the traffic sent to them.' },
      { question: 'What do you need from us before writing the page?', answer: 'We need the offer, target audience, desired action, campaign message and any proof you can substantiate. Real product details and approved testimonials are more useful than generic claims.' },
      { question: 'Can inquiries be sent to WhatsApp or our CRM?', answer: 'Yes, depending on the agreed integration. We distinguish saving the inquiry from opening WhatsApp and provide a clear next step. Tracking should reflect the action that actually completed.' },
    ],
  },
  'digital-marketing': {
    summary: 'Campaign planning starts with your offer, audience and definition of a qualified inquiry. We review the destination page and conversion tracking before choosing channels, creative tests and budget allocation. Reporting distinguishes advertising spend, management work and business outcomes. Lead quality feedback from your sales team helps identify whether apparent conversions are useful. Account access is assigned through appropriate business permissions, and your organization keeps ownership of its advertising assets. Results vary with competition, budget, creative, offer quality and the follow-up process.',
    faqs: [
      { question: 'Is advertising spend included in your management fee?', answer: 'Ad spend is paid separately to Meta or Google unless your written proposal explicitly states otherwise. The agency fee covers the agreed strategy, setup, management and reporting work.' },
      { question: 'Who owns the ad accounts and campaign data?', answer: 'Your business retains ownership of its accounts. DataNest BD works through authorized access rather than taking over personal login credentials. Access and handover responsibilities are defined in the scope.' },
      { question: 'How do you measure campaign performance?', answer: 'We agree on the relevant conversion and review qualified inquiries, acquisition costs and sales feedback alongside platform metrics. No fixed return on ad spend is promised without evidence and agreed measurement conditions.' },
    ],
  },
  'marketing-motion-videos': {
    summary: 'A motion video project starts with the platform it will run on and the single message it needs to carry. We script and storyboard around your offer, then edit using the footage, product photos or screen recordings you can provide. Pacing, captions and typography are built for sound-off viewing on social feeds and ad placements. Each video is exported in the aspect ratio and length your destination platform expects. Production covers the creative asset itself; running it as a paid campaign is scoped separately.',
    faqs: [
      { question: 'What is the difference between a motion video and a full ad campaign?', answer: 'A motion video is the creative asset: the script, edit and platform-ready export. Running it as a paid campaign with audience targeting, budget and tracking is a separate scope, covered under Data-Driven Facebook & Google Ads.' },
      { question: 'Can you use our existing product photos or footage?', answer: 'Yes. We can edit from footage, photos or screen recordings you already have. If new footage needs to be filmed on location, that is scoped and quoted separately.' },
      { question: 'How long does a typical video take to produce?', answer: 'Turnaround depends on script complexity, how much raw material you can provide upfront and the number of revision rounds. We confirm a timeline once we review the brief.' },
    ],
  },
  'meta-ecosystem': {
    summary: 'A setup review identifies which business owns each Page, ad account, domain and WhatsApp asset, and who has permission to manage it. We help organize access, review domain configuration and identify mismatches in business details before a verification submission. The authorized business representative completes the required steps through Meta. Business verification, domain verification and subscription-based verification badges are different processes; completing one does not guarantee the others. Our work is configuration and readiness assistance, with approval decisions retained by the platform.',
    faqs: [
      { question: 'Can DataNest BD guarantee Meta business verification?', answer: 'No. We help review business details, asset configuration and available submission steps. Meta decides eligibility, required documents and approval.' },
      { question: 'Is business verification the same as a paid verified badge?', answer: 'No. Business verification, domain ownership verification and paid verification subscriptions serve different purposes. We identify which process is relevant to your account and intended integration.' },
      { question: 'Do we need to share personal passwords?', answer: 'Use authorized business roles and platform-supported access wherever available. Your representative should retain control of the business account and complete sensitive verification steps directly.' },
    ],
  },
};
