import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import { AppShell } from '@/components/shell/AppShell';

const pageContent = getPageContent('/refund-policy');
export const metadata = getPageMetadata('/refund-policy');

export default function RefundPolicyPage() {
  return (
    <AppShell>
      <article className="space-y-6 max-w-3xl">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[var(--color-text-accent)] uppercase">
            Legal & Compliance
          </span>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)]">
            {pageContent.heading}
          </h1>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{pageContent.introduction}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Last Updated: October 4, 2026 · DataNest BD
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)] pt-4 border-t border-[var(--color-border)]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">1. Milestone-Based Engagements</h2>
            <p>
              Custom software engineering and AI workflow projects are scoped in progressive milestones. Payments allocated to completed and approved milestones are non-refundable once deliverables are handed over.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">2. WhatsApp API Setup & Platform Fees</h2>
            <p>
              Setup fees cover engineering time required for Meta Business Manager audits, DNS configuration, and workspace provisioning. Applicable Meta messaging charges and platform subscription credits are consumed by usage and subject to provider billing policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">3. Cancellations & Pre-Paid Retainers</h2>
            <p>
              If a client requests project termination prior to milestone commencement, unutilized retainer balances will be refunded within 14 business days after deducting incurred third-party licensing costs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">4. Inquiries & Assistance</h2>
            <p>
              For questions regarding billing or invoice reconciliation, contact our accounts desk at{' '}
              <a href="mailto:info@datanestbd.com" className="text-[var(--color-text-primary)] font-bold underline">
                info@datanestbd.com
              </a>.
            </p>
          </section>
        </div>
      </article>
    </AppShell>
  );
}
