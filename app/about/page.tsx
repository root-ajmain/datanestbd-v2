import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Mail, Clock, CheckCircle2, MessageSquare, PhoneCall, FileText, Hammer, Rocket } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { AppShell } from '@/components/shell/AppShell';
import { SplitButton } from '@/components/ui/SplitButton';
import { WhatChimpProofBadge } from '@/components/ui/BrandBadges';
import { AnimatedWorkflow } from '@/components/design-system/AnimatedWorkflow';

const pageContent = getPageContent('/about');
export const metadata = getPageMetadata('/about');

export default function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--red-700)] dark:text-[var(--orange-500)]">
            About DataNest BD
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)]">
            {pageContent.heading}
          </h1>
          <p className="text-base sm:text-lg text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-2xl leading-relaxed">
            {pageContent.introduction}
          </p>
        </section>

        {/* How we work with you — a live process diagram, not a studio photo */}
        <AnimatedWorkflow
          headline="How a DataNest BD engagement runs, start to finish"
          steps={[
            { label: 'WhatsApp Inquiry', icon: <MessageSquare className="h-5 w-5" aria-hidden="true" /> },
            { label: 'Discovery Call', icon: <PhoneCall className="h-5 w-5" aria-hidden="true" /> },
            { label: 'Scope & Quote', icon: <FileText className="h-5 w-5" aria-hidden="true" /> },
            { label: 'Build', icon: <Hammer className="h-5 w-5" aria-hidden="true" /> },
            { label: 'Launch', icon: <Rocket className="h-5 w-5" aria-hidden="true" /> },
          ]}
        />

        {/* WhatChimp Verification Focus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Verified WhatChimp Silver Partnership
          </h2>
          <p className="text-sm leading-relaxed text-[var(--navy-800)] dark:text-[#C7D4DB]">
            In March 2026, DataNest BD achieved verified Silver Agency Partner status with WhatChimp. This partnership equips our engineering team with authorized tooling to provision Meta WhatsApp Business Accounts, configure WhatChimp workspaces, and manage high-scale conversation workflows for clients with full compliance.
          </p>
          <div className="pt-2">
            <WhatChimpProofBadge />
          </div>
        </section>

        {/* Operating Principles */}
        <section className="glass-card p-8 rounded-3xl space-y-6 shadow-md">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Our Engineering Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--navy-800)] dark:text-[#C7D4DB]">
            <div className="space-y-2">
              <h3 className="font-bold text-[var(--navy-900)] dark:text-[var(--white)] text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                <span>Legitimate Infrastructure First</span>
              </h3>
              <p>
                We never build on unauthorized emulators or web scrapers. We implement official APIs that protect brand equity and customer relationships.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-[var(--navy-900)] dark:text-[var(--white)] text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                <span>No Vanity Metrics or Fake Guarantees</span>
              </h3>
              <p>
                We state boundaries plainly. We do not promise 10× overnight conversions or guaranteed Meta account verification decisions.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-[var(--navy-900)] dark:text-[var(--white)] text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                <span>Deterministic Guardrails for AI</span>
              </h3>
              <p>
                Our AI workflows are grounded in verified organizational documents, with explicit human fallback routes for uncertain requests.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-[var(--navy-900)] dark:text-[var(--white)] text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                <span>Complete Code & Asset Ownership</span>
              </h3>
              <p>
                Upon project completion, our clients retain full ownership of custom source code, documentation, and database schemas.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Location Details */}
        <section className="glass-card p-8 rounded-3xl space-y-4 shadow-md">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Delivery Mode & Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--navy-400)] dark:text-[#C7D4DB]">
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 font-bold text-[var(--navy-900)] dark:text-[var(--white)] mb-1">
                <MapPin className="h-4 w-4 text-[#93D4D8]" />
                <span>100% Online Delivery</span>
              </div>
              <p>Dhaka, Bangladesh · No physical office visits. Consultations via Google Meet & Zoom.</p>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 font-bold text-[var(--navy-900)] dark:text-[var(--white)] mb-1">
                <Clock className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                <span>Working Hours</span>
              </div>
              <p>Sunday – Thursday · GMT+6 (Asia/Dhaka)</p>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 font-bold text-[var(--navy-900)] dark:text-[var(--white)] mb-1">
                <Mail className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                <span>WhatsApp & Email</span>
              </div>
              <p>+880 1886-123456</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline font-medium text-[var(--red-700)] dark:text-[var(--orange-500)]">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </section>

        <section className="text-center pt-4">
          <a
            href="https://wa.me/8801886123456?text=Hello%20DataNest%20BD%2C%20I%20would%20like%20to%20consult%20with%20you%20via%20Google%20Meet%2FZoom."
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn glass-btn-accent text-sm py-3 px-6 rounded-2xl inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
          >
            <span>Connect on WhatsApp</span>
          </a>
        </section>
      </div>
    </AppShell>
  );
}
