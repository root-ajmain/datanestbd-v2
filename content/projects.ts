export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  isSampleArchitecture: boolean;
  problem: string;
  scope: string;
  architecture: string[];
  outcomesExpected: string[];
  attributionLimitations: string;
  image: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'whatchimp-multiagent-waba',
    slug: 'whatchimp-multiagent-waba',
    title: 'High-Volume WhatsApp Support & Qualification Hub',
    category: 'WhatsApp Infrastructure',
    isSampleArchitecture: true,
    problem:
      'A growing retailer may struggle to assign WhatsApp questions when several people share one unstructured inbox. Replies can be duplicated, customer context can be missed, and the team may have no consistent way to pass a qualified inquiry to its CRM.',
    scope:
      'The proposed workflow connects WhatsApp Business API to a WhatChimp shared inbox. Incoming events are validated and matched to a conversation before assignment. Agreed qualification fields are passed to the CRM, while failed or duplicate events need explicit handling. Templates support permitted notifications and a person remains available for escalation.',
    architecture: [
      'Official Meta WhatsApp Business Cloud API',
      'WhatChimp Partner Engine with multi-agent routing',
      'Webhook ingestion pipeline to internal lead database',
      'Categorized template submission system for shipping & utility updates',
    ],
    outcomesExpected: [
      'Intended outcome: shared conversation access without passing a phone between staff',
      'Multi-agent concurrent response with full audit trail',
      'Automated qualification triage before human agent pickup',
    ],
    attributionLimitations:
      'Illustrative reference architecture. No named client deployment or measured results are claimed.',
    image: '/images/datanest_whatsapp_flowgent_1791075386142.jpg',
  },
  {
    id: 'cloud-saas-enterprise-portal',
    slug: 'cloud-saas-enterprise-portal',
    title: 'Enterprise Operational Portal & Analytics Dashboard',
    category: 'Full-Stack SaaS',
    isSampleArchitecture: true,
    problem:
      'An operations team may use separate spreadsheets for work assignments, status updates and reports. Without a shared record and clear permissions, managers can struggle to identify the current version and staff may repeat the same data entry.',
    scope:
      'The proposed portal uses Next.js interfaces and a PostgreSQL data model to connect records, permissions and reporting. Roles define who can view or change each record. Validated updates feed reporting queries and exports. Tenant isolation, backup recovery and query performance need testing against the actual workload before launch.',
    architecture: [
      'Next.js App Router with TypeScript and Tailwind CSS',
      'PostgreSQL multi-tenant schema with parameterized queries',
      'Server-side data aggregation with workload-specific performance testing',
      'Role-based permissions (Admin, Manager, Field Agent)',
    ],
    outcomesExpected: [
      'Centralized operational records with strict audit logs',
      'Automated daily aggregation reports without manual spreadsheet editing',
    ],
    attributionLimitations:
      'Illustrative SaaS reference architecture; dashboard figures are examples, not customer results.',
    image: '/images/datanest_saas_platform_1791075396246.jpg',
  },
  {
    id: 'intelligent-lead-triage-pipeline',
    slug: 'intelligent-lead-triage-pipeline',
    title: 'Grounded Lead Triage & Automated CRM Ingestion Pipeline',
    category: 'AI Workflow Automation',
    isSampleArchitecture: true,
    problem:
      'A sales team may receive inquiries with different formats and incomplete details. Manually identifying the service, urgency and next action can delay follow-up. The first design step is to define qualification criteria and collect representative examples for evaluation.',
    scope:
      'The proposed pipeline extracts agreed fields from inquiry text, validates the output and creates or updates a CRM record. Rule checks determine which actions are allowed. Missing, contradictory or sensitive information routes to a person rather than being silently guessed. Logs, duplicate handling and retry rules support investigation when an integration fails.',
    architecture: [
      'Server-side schema validation via Zod',
      'Structured entity extraction with strict output boundaries',
      'Escalation queue alerting key account executives via WhatsApp & Slack',
      'Durable outbox retry worker preventing dropped submissions',
    ],
    outcomesExpected: [
      'Intended outcome: a consistent triage queue with a defined next action',
      'Validated records and a review path for incomplete or uncertain information',
    ],
    attributionLimitations:
      'Illustrative AI workflow. Accuracy and time savings must be evaluated with representative business data.',
    image: '/images/datanest_ai_automation_1791075407796.jpg',
  },
];
