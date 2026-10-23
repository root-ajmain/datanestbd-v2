import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import { MessageSquare, ArrowRight, AlertCircle, Video } from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';
import { Display } from '@/components/design-system/Heading';
import { Badge } from '@/components/design-system/Badge';
import { PricingGrid } from '@/components/design-system/PricingGrid';
import { IncludedShowcase } from '@/components/design-system/IncludedShowcase';
import { PlatformFeatureGrid } from '@/components/design-system/PlatformFeatureGrid';
import { Reveal } from '@/components/design-system/Reveal';
import { siteConfig } from '@/content/site';
import { WhatsAppLink } from '@/components/analytics/WhatsAppLink';
import { TrackViewContent } from '@/components/analytics/TrackViewContent';

const pageContent = getPageContent('/pricing');
export const metadata = getPageMetadata('/pricing');

export default function PricingPage() {
  return (
    <AppShell>
      <TrackViewContent contentName="WhatsApp API pricing" />
      <div className="ds-root space-y-14 py-6">
        {/* Header */}
        <section className="space-y-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge>Official Meta WhatsApp Cloud API</Badge>
            <Badge>WhatChimp Silver Agency Partner</Badge>
          </div>

          <Display variant="eyebrow" className="text-[var(--brand-hover)]">
            WhatsApp Official API
          </Display>
          <Reveal>
            <Display variant="h1" className="mx-auto max-w-3xl text-[var(--ds-text-primary)]">
              {pageContent.heading}
            </Display>
          </Reveal>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
            {pageContent.introduction}
          </p>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            <div className="ds-card flex items-start gap-2.5 rounded-2xl p-4 text-left text-xs">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-hover)]" />
              <div>
                <span className="font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                  Zero Demos or Trial Versions:
                </span>{' '}
                <span className="text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
                  We do not provide demo or trial accounts. All setups are production-ready official Meta WABA accounts.
                </span>
              </div>
            </div>
            <div className="ds-card flex items-start gap-2.5 rounded-2xl p-4 text-left text-xs">
              <Video className="mt-0.5 h-4 w-4 shrink-0 text-[#93D4D8]" />
              <div>
                <span className="font-bold text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]">
                  100% Online Consultations:
                </span>{' '}
                <span className="text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
                  No physical office visits. Onboarding and support run via Google Meet &amp; Zoom.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <Reveal>
          <PlatformFeatureGrid />
        </Reveal>

        {/* Pricing Grid */}
        <section>
          <Reveal>
            <PricingGrid />
          </Reveal>
        </section>

        {/* Included-in-every-plan showcase */}
        <Reveal>
          <IncludedShowcase />
        </Reveal>

        {/* Fast Action WhatsApp Banner */}
        <section className="ds-gradient-brand rounded-3xl p-8 text-center sm:p-10">
          <Badge className="border-white/40 bg-white/10 text-white">
            Direct WhatsApp Onboarding · Fast Turnaround
          </Badge>
          <Display variant="h2" className="mx-auto mt-4 max-w-xl text-white">
            Ready to deploy your official WhatsApp Business API?
          </Display>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white font-[family-name:var(--font-body)]">
            Pick any plan above, or talk to us first — our partner team replies on WhatsApp directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppLink
              location="pricing-banner"
              href={`${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent('Hello DataNest BD, I am ready to onboard for the WhatsApp Official API.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[var(--brand)] transition-colors hover:bg-white/90 font-[family-name:var(--font-body)]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Connect on WhatsApp Now</span>
              <ArrowRight className="h-4 w-4" />
            </WhatsAppLink>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
