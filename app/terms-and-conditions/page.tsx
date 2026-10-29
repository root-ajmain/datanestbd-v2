import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import { AppShell } from '@/components/shell/AppShell';

const pageContent = getPageContent('/terms-and-conditions');
export const metadata = getPageMetadata('/terms-and-conditions');

export default function TermsAndConditionsPage() {
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
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">1. Scope of Services</h2>
            <p>
              DataNest BD provides software engineering, WhatsApp Business API onboarding (via WhatChimp), and AI workflow integration. All deliverables and timelines are defined in written Statements of Work (SOW).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">2. Meta Platform Boundaries & Compliance</h2>
            <p>
              Clients engaging WhatsApp Business Platform services must comply strictly with WhatsApp Commerce and Business Policies. DataNest BD assists with configuration and verification readiness, but Meta retains sole authority over template approvals, phone number restrictions, and recipient tier limits.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">3. Intellectual Property</h2>
            <p>
              Upon complete milestone settlement, bespoke application code and custom documentation developed specifically for the client become the sole property of the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">4. Governing Law</h2>
            <p>
              These terms are governed by the laws of Bangladesh. Any dispute arising under these terms shall be subject to the jurisdiction of the courts of Dhaka, Bangladesh.
            </p>
          </section>
        </div>
      </article>
    </AppShell>
  );
}
