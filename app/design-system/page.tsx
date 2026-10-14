import type { Metadata } from 'next';
import { MessageSquare, Cpu, Code2 } from 'lucide-react';
import { GlobalNavbar } from '@/components/shell/GlobalNavbar';
import { MobileBottomTabs } from '@/components/shell/MobileBottomTabs';
import { Footer } from '@/components/design-system/Footer';
import { Display } from '@/components/design-system/Heading';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { StatBlock } from '@/components/design-system/StatBlock';
import { PricingGrid } from '@/components/design-system/PricingGrid';

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Token layer, self-hosted font stack, and component proof for the DataNest BD dark-mode design system.',
  robots: { index: false, follow: false },
};

const logoStrip = ['NEXT.JS', 'TYPESCRIPT', 'POSTGRESQL', 'META CLOUD API', 'WHATCHIMP', 'VERCEL'];

const features = [
  {
    icon: MessageSquare,
    title: 'Official WhatsApp API',
    body: 'Multi-agent shared inboxes, template submission support, and opt-in guidance for official Cloud API infrastructure.',
  },
  {
    icon: Cpu,
    title: 'AI Workflow Automation',
    body: 'Grounded retrieval, deterministic guardrails, and explicit human-in-the-loop fallback for every automated action.',
  },
  {
    icon: Code2,
    title: 'Next.js Engineering',
    body: 'Server-rendered websites with accessibility reviews and performance testing on representative mobile devices.',
  },
];

const stats = [
  { value: '7+', label: 'Service lines' },
  { value: 'API', label: 'Official messaging setup' },
  { value: '100%', label: 'Online delivery' },
  { value: 'Events', label: 'Webhook integrations' },
];

export default function DesignSystemPage() {
  return (
    <div className="ds-root min-h-screen">
      <GlobalNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        {/*
          Sized and positioned so the red H1 accent word sits well outside the
          glow's falloff: at the headline's position this computes to a red-on-
          red-tinted-black background around ~4:1, clearing the 3:1 floor for
          large/bold text with real margin (and the blur softens the peak
          further in the actual render, on top of that margin).
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--brand-45), transparent 55%)' }}
        />
        {/* A second, offset aqua glow — a duo-tone neon ambience rather than
            a single flat red blob. Positioned clear of the headline so it
            never has to interact with the red-text contrast math above. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[72%] top-[18%] h-[260px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-12), transparent 60%)' }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <Display variant="eyebrow" className="text-[var(--ds-text-secondary)]">
            Design System Demo
          </Display>
          <Display variant="h1" accent="INFRASTRUCTURE" className="mt-5 text-[var(--ds-text-primary)]">
            BUILT ON OFFICIAL
          </Display>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)] sm:text-lg">
            Official WhatsApp Business API, Next.js web engineering, and AI workflow automation —
            unified under one dark, red-accented design system.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary">Start a Project</Button>
            <Button href="/services" variant="ghost">View Services</Button>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="border-y border-[var(--ds-border)] bg-[var(--surface-1)] px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logoStrip.map((name) => (
            <span
              key={name}
              className="text-sm font-bold uppercase tracking-[0.15em] text-white/45 font-[family-name:var(--font-body)]"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Display variant="eyebrow" className="text-[var(--ds-text-secondary)]">
            Why it holds up
          </Display>
          <Display variant="h2" className="mt-4 max-w-2xl text-[var(--ds-text-primary)]">
            Three systems, one standard
          </Display>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <Card key={title}>
                <Icon className="h-6 w-6 text-[var(--brand)]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
                  {body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STAT ROW */}
      <section className="border-y border-[var(--ds-border)] bg-[var(--surface-1)] px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Display variant="eyebrow" className="text-[var(--ds-text-secondary)]">
            Pricing
          </Display>
          <Display variant="h2" className="mt-4 max-w-2xl text-[var(--ds-text-primary)]">
            One clear tier for every stage
          </Display>
          <div className="mt-10">
            <PricingGrid />
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ds-gradient-brand px-6 py-16 text-center sm:px-8">
        <Display variant="h2" className="mx-auto max-w-2xl text-[var(--ds-text-on-brand)]">
          Ready to build on this?
        </Display>
        {/* Solid white, not a dimmed opacity: white/85 on this red measures ~3.7:1,
            under the 4.5:1 floor for 16px body text. Full white holds 4.71:1. */}
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white font-[family-name:var(--font-body)]">
          Talk to the team that runs this stack in production.
        </p>
        <div className="mt-8">
          <a
            href="/contact"
            className="ds-focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[var(--brand)] transition-colors hover:bg-white/90 font-[family-name:var(--font-body)]"
          >
            Talk to Our Team
          </a>
        </div>
      </section>

      <Footer />
      <MobileBottomTabs />
    </div>
  );
}
