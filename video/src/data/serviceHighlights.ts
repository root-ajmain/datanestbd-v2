// Points are drawn verbatim or near-verbatim from content/services.ts and
// content/pricing.ts (includedInEveryPlan) in the main app — this project is
// standalone and isn't imported by the Next app, so the copy is duplicated
// here by hand. Keep in sync if that source copy changes.
export interface ServiceHighlight {
  id: string;
  title: string;
  points: string[];
}

export const serviceHighlights: ServiceHighlight[] = [
  {
    id: 'whatsapp-api',
    title: 'Official WhatsApp Business API',
    points: [
      'Official Meta Cloud API setup, not an unofficial workaround',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'web-development',
    title: 'Conversion-Focused Websites',
    points: [
      'A clearer path from visitor intent to a qualified inquiry',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'saas-development',
    title: 'Full-Stack SaaS Engineering',
    points: [
      'A usable, scalable product built around one real workflow',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI Agents & Workflow Automation',
    points: [
      'Defined boundaries and explicit human fallback, always',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'landing-pages',
    title: 'High-Converting Landing Pages',
    points: [
      'One campaign, one offer, one frictionless next step',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Data-Driven Facebook & Google Ads',
    points: [
      'Tracking built around qualified leads, not vanity clicks',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'marketing-motion-videos',
    title: 'Marketing Motion Videos',
    points: [
      'Short, platform-ready video built around one message',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
  {
    id: 'meta-ecosystem',
    title: 'Facebook Ecosystem Setup',
    points: [
      'Business assets, permissions and verification readiness',
      'A Dhaka-based team that answers in your timezone',
      'Technical support included — never a separate line item',
    ],
  },
];
