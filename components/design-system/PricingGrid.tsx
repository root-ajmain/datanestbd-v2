'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import {
  billingCycles,
  pricingTiers,
  getDiscountedMonthlyTk,
  formatTk,
  type PricingTier,
} from '@/content/pricing';
import { siteConfig } from '@/content/site';

function waHref(tier: PricingTier, cycleLabel: string, monthlyTk: number) {
  const text = encodeURIComponent(
    `Hello DataNest BD, I want to get started with the ${tier.name} WhatsApp API plan (${cycleLabel}, ${formatTk(monthlyTk)}/mo + ${formatTk(tier.setupFeeTk)} one-time setup). Please schedule an online consultation via Google Meet/Zoom.`
  );
  return `${siteConfig.contact.whatsappUrl}?text=${text}`;
}

export function PricingGrid() {
  const [cycleId, setCycleId] = useState(billingCycles[0].id);
  const cycle = billingCycles.find((c) => c.id === cycleId) ?? billingCycles[0];

  return (
    <div>
      {/* Billing cycle toggle — a fixed set of precomputed prices, not a configurator. */}
      <div
        role="tablist"
        aria-label="Billing cycle"
        className="mx-auto mb-10 flex w-full max-w-md items-center gap-1 rounded-full border border-[var(--ds-border)] bg-[var(--surface-1)] p-1"
      >
        {billingCycles.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={c.id === cycleId}
            onClick={() => setCycleId(c.id)}
            className={`ds-focus-ring relative flex-1 rounded-full px-2 py-2.5 text-xs font-semibold transition-colors duration-200 font-[family-name:var(--font-body)] sm:text-sm ${
              c.id === cycleId
                ? 'bg-[var(--brand)] text-[var(--ds-text-on-brand)]'
                : 'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]'
            }`}
          >
            {c.label}
            {c.discountPct > 0 && (
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  c.id === cycleId ? 'bg-white/20' : 'bg-[var(--brand-12)] text-[var(--brand-hover)]'
                }`}
              >
                -{c.discountPct}%
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pricingTiers.map((tier) => {
          const discountedMonthly = getDiscountedMonthlyTk(tier.monthlyPriceTk, cycle.discountPct);
          const totalForCycle = discountedMonthly * cycle.months;
          const href = waHref(tier, cycle.label, discountedMonthly);

          return (
            <div
              key={tier.id}
              className={`ds-card relative flex flex-col rounded-2xl p-6 transition-transform duration-300 ${
                tier.highlighted
                  ? 'border-[var(--brand-65)] shadow-[0_0_0_1px_var(--brand-12),0_24px_48px_-20px_var(--brand-45)] lg:-translate-y-2'
                  : ''
              }`}
            >
              {tier.highlighted && (
                // Decorative only — no text sits on this strip, so the full
                // neon sweep (including the light aqua) is safe to use here.
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-[3px] -translate-y-px animate-[ds-gradient-flow-x_4s_ease-in-out_infinite] rounded-full bg-[length:200%_auto]"
                  style={{ backgroundImage: 'linear-gradient(90deg, var(--brand-hover), var(--accent), var(--brand-hover))' }}
                />
              )}

              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                  {tier.name}
                </h3>
                {tier.badge && <Badge>{tier.badge}</Badge>}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
                {tier.tagline}
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                  {formatTk(discountedMonthly)}
                </span>
                <span className="text-xs font-semibold text-[var(--ds-text-muted)] font-[family-name:var(--font-body)]">
                  / month
                </span>
              </div>
              {cycle.discountPct > 0 ? (
                <p className="mt-1 text-xs text-[var(--ds-text-muted)] font-[family-name:var(--font-body)]">
                  <span className="line-through">{formatTk(tier.monthlyPriceTk)}</span>
                  {' · '}
                  {formatTk(totalForCycle)} billed every {cycle.months} months
                </p>
              ) : (
                <p className="mt-1 text-xs text-[var(--ds-text-muted)] font-[family-name:var(--font-body)]">
                  Billed monthly
                </p>
              )}
              <p className="mt-1 text-[11px] font-semibold text-[var(--brand-hover)] font-[family-name:var(--font-body)]">
                {formatTk(tier.setupFeeTk)} one-time setup
              </p>

              <p className="mt-4 flex-1 text-xs leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
                {tier.idealFor}
              </p>

              <Button
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant={tier.highlighted ? 'primary' : 'secondary'}
                className="mt-6 w-full"
              >
                {tier.ctaText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
