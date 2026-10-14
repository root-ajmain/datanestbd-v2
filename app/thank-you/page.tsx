import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';
import { siteConfig } from '@/content/site';

const pageContent = getPageContent('/thank-you');
export const metadata = getPageMetadata('/thank-you');

export default function ThankYouPage() {
  return (
    <AppShell>
      <div className="py-12 flex flex-col items-center text-center space-y-6 max-w-xl mx-auto">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--navy-800)] text-[var(--orange-500)] shadow-xs">
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <h1 className="text-3xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)]">
            {pageContent.heading}
          </h1>

        <p className="text-sm leading-relaxed text-[var(--navy-800)] dark:text-[#C7D4DB]">
            {pageContent.introduction}
          </p>

        <div className="p-4 rounded-2xl border border-[var(--grey-200)] dark:border-[var(--color-border)] bg-[var(--white)] dark:bg-[var(--navy-600)] text-xs text-[var(--navy-400)] dark:text-[#C7D4DB] space-y-1 shadow-xs">
          <div className="font-semibold text-[var(--navy-900)] dark:text-[var(--white)]">
            Standard Response Time: Within 1 Business Day
          </div>
          <div>Need immediate clarification? Reach us at {siteConfig.contact.email}</div>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--orange-600)] hover:bg-[var(--orange-700)] text-white text-sm font-bold shadow-xs transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--navy-800)] dark:border-[var(--color-border)] hover:bg-[var(--navy-50)] dark:hover:bg-[var(--navy-800)] text-[var(--navy-800)] dark:text-[var(--white)] text-sm font-semibold transition-colors"
          >
            <span>Explore Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
