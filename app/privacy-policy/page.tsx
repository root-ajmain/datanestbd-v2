import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import { AppShell } from '@/components/shell/AppShell';

const pageContent = getPageContent('/privacy-policy');
export const metadata = getPageMetadata('/privacy-policy');

export default function PrivacyPolicyPage() {
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
            Last Updated: October 4, 2026 · DataNest BD Ltd., Dhaka, Bangladesh
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)] pt-4 border-t border-[var(--color-border)]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">1. Overview</h2>
            <p>
              DataNest BD (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This policy outlines how we collect, store, and process information submitted through our website and service consultation funnels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">2. Information We Collect</h2>
            <p>
              When you submit a consultation request or contact us, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name</li>
              <li>Contact details (WhatsApp phone number or corporate email address)</li>
              <li>Service interests and voluntary project overview text</li>
              <li>Technical attribution parameters (HTTP headers, source page, UTM campaign tags)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">3. Storage & Durable Security</h2>
            <p>
              Lead inquiries are securely validated and stored in encrypted databases with strict access controls. We do not sell, rent, or trade your contact information with unauthorized third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">4. WhatsApp API & Platform Data</h2>
            <p>
              For clients engaging our WhatsApp Business Platform services through WhatChimp, conversation data is processed strictly in accordance with Meta Business Terms of Service and applicable telecommunication standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">5. Contact Us</h2>
            <p>
              For any data access, update, or deletion requests, please contact our data team at{' '}
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
