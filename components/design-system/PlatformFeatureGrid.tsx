import React from 'react';
import {
  Send,
  MousePointerClick,
  Layers,
  Users,
  Bot,
  BrainCircuit,
  CalendarCheck,
  ShoppingBag,
  CreditCard,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { platformFeatureGroups } from '@/content/pricing';
import { Display } from './Heading';
import { Reveal } from './Reveal';

const icons: Record<string, LucideIcon> = {
  'Bulk WhatsApp Broadcast': Send,
  'Click to WhatsApp Ads': MousePointerClick,
  'Omnichannel Inbox': Layers,
  'Shared Inbox': Users,
  'WhatsApp Chatbot': Bot,
  'AI Agent': BrainCircuit,
  'Appointment Booking': CalendarCheck,
  'WhatsApp Catalog': ShoppingBag,
  'WhatsApp Payments': CreditCard,
  'WhatsApp Forms': ClipboardList,
};

interface PlatformFeatureGridProps {
  eyebrow?: string;
  title?: string;
  className?: string;
}

/**
 * Everything the WhatsApp Official API platform can do, grouped by job —
 * Messaging / Automation / Commerce — each group its own eyebrow label
 * over a tile grid, inside one glass panel so the three jobs read as one
 * connected platform rather than three separate feature lists.
 */
export function PlatformFeatureGrid({
  eyebrow = 'What the Platform Does',
  title = 'One number. Messaging, automation and commerce.',
  className = '',
}: PlatformFeatureGridProps) {
  return (
    <section className={`ds-glass relative rounded-3xl border-[var(--brand-35)] p-6 sm:p-10 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-12), transparent 70%)' }}
      />
      <div className="relative">
        <Display variant="eyebrow" className="text-[var(--brand-hover)]">
          {eyebrow}
        </Display>
        <Display variant="h2" className="mt-3 max-w-2xl text-[var(--ds-text-primary)]">
          {title}
        </Display>

        <div className="mt-8 space-y-8">
          {platformFeatureGroups.map((group, groupIdx) => (
            <div key={group.id}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-hover)] font-[family-name:var(--font-body)]">
                {group.title}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.features.map((item, idx) => {
                  const Icon = icons[item.title] ?? Bot;
                  return (
                    <Reveal key={item.title} delay={(groupIdx * group.features.length + idx) * 0.05} variant="scale">
                      <div className="ds-glass-tile flex items-start gap-3 rounded-2xl p-4 transition-colors duration-200 hover:border-[var(--brand-65)]">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-12)] text-[var(--brand-hover)]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                            {item.title}
                          </h4>
                          <p className="mt-0.5 text-xs leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
