import React from 'react';
import {
  MapPin,
  GraduationCap,
  LifeBuoy,
  MessagesSquare,
  Zap,
  Bot,
  CalendarCheck,
} from 'lucide-react';
import { includedInEveryPlan } from '@/content/pricing';
import { Display } from './Heading';
import { Reveal } from './Reveal';

const icons = [MapPin, GraduationCap, LifeBuoy, MessagesSquare, Zap, Bot, CalendarCheck];

interface IncludedShowcaseProps {
  eyebrow?: string;
  title?: string;
  className?: string;
}

/**
 * The impulse-aisle display: every DataNest BD plan quietly includes this —
 * shown once, prominently, rather than repeated inside every pricing card.
 */
export function IncludedShowcase({
  eyebrow = 'Included With Every Plan',
  title = "What you get, no matter which plan you pick",
  className = '',
}: IncludedShowcaseProps) {
  return (
    <section className={`ds-glass relative rounded-3xl border-[var(--brand-35)] p-6 sm:p-10 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--brand-12), transparent 70%)' }}
      />
      <div className="relative">
        <Display variant="eyebrow" className="text-[var(--brand-hover)]">
          {eyebrow}
        </Display>
        <Display variant="h2" className="mt-3 max-w-2xl text-[var(--ds-text-primary)]">
          {title}
        </Display>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {includedInEveryPlan.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <Reveal key={item.title} delay={idx * 0.06} variant="scale">
                <div className="ds-glass-tile flex items-start gap-3 rounded-2xl p-4 transition-colors duration-200 hover:border-[var(--brand-65)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-12)] text-[var(--brand-hover)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                      {item.title}
                    </h3>
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
    </section>
  );
}
