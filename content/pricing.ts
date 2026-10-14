export interface BillingCycle {
  id: string;
  months: number;
  label: string;
  shortLabel: string;
  discountPct: number;
}

// >7% at 3 months, >10% at 6 months, 15% at 12 months.
export const billingCycles: BillingCycle[] = [
  { id: 'monthly', months: 1, label: 'Monthly', shortLabel: '1 mo', discountPct: 0 },
  { id: 'quarterly', months: 3, label: '3 Months', shortLabel: '3 mo', discountPct: 7 },
  { id: 'biannual', months: 6, label: '6 Months', shortLabel: '6 mo', discountPct: 10 },
  { id: 'annual', months: 12, label: '12 Months', shortLabel: '12 mo', discountPct: 15 },
];

export interface PricingTier {
  id: string;
  name: string;
  monthlyPriceTk: number;
  setupFeeTk: number;
  tagline: string;
  idealFor: string;
  badge?: string;
  highlighted?: boolean;
  ctaText: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPriceTk: 4000,
    setupFeeTk: 500,
    tagline: 'Official WhatsApp API, ready to run.',
    idealFor: 'New businesses moving from an unofficial WhatsApp tool to the official Meta Cloud API.',
    ctaText: 'Get Started',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPriceTk: 8500,
    setupFeeTk: 500,
    tagline: 'More seats, more automation, more reach.',
    idealFor: 'Growing teams that need a bigger shared inbox and broadcast campaigns.',
    badge: 'Most Popular',
    highlighted: true,
    ctaText: 'Get Started',
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPriceTk: 20000,
    setupFeeTk: 700,
    tagline: 'High-volume messaging with priority support.',
    idealFor: 'High-volume e-commerce, education platforms and agencies running broadcast campaigns.',
    ctaText: 'Get Started',
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPriceTk: 27000,
    setupFeeTk: 700,
    tagline: 'Maximum throughput for enterprise operations.',
    idealFor: 'Enterprise operations needing maximum agent capacity and dedicated consulting time.',
    ctaText: 'Get Started',
  },
];

/** Shown as a single shared showcase — every tier above includes all of this. */
export const includedInEveryPlan: { title: string; description: string }[] = [
  {
    title: 'Local Support',
    description: 'A Dhaka-based team that answers in your timezone.',
  },
  {
    title: 'Repeat System Training',
    description: 'Training sessions provided multiple times so your team runs the platform seamlessly.',
  },
  {
    title: 'Free Technical Support',
    description: 'Technical support is included — never a separate line item.',
  },
  {
    title: 'One-to-One WhatsApp Group',
    description: 'A maintained WhatsApp group for direct, one-to-one support.',
  },
  {
    title: 'Instant Stuck-Point Fixes',
    description: 'Simple blockers get solved instantly, not queued.',
  },
  {
    title: '3 Automatic Chatbots',
    description: 'Three automatic chatbot setups, built to your requirements.',
  },
  {
    title: 'Monthly Growth Consultancy',
    description: 'A one-to-one business development consultancy call, held virtually every month.',
  },
];

export function getDiscountedMonthlyTk(monthlyPriceTk: number, discountPct: number): number {
  return Math.round(monthlyPriceTk * (1 - discountPct / 100));
}

export function formatTk(amount: number): string {
  return `৳${amount.toLocaleString('en-US')}`;
}
