import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React, { Suspense } from 'react';
import { Mail, MapPin, ShieldCheck, ExternalLink, MessageSquare, Video, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { AppShell } from '@/components/shell/AppShell';
import { ContactLeadForm } from '@/components/forms/ContactLeadForm';
import { Reveal } from '@/components/design-system/Reveal';

const pageContent = getPageContent('/contact');
export const metadata = getPageMetadata('/contact');

export default function ContactPage() {
  const directWhatsAppUrl = `https://wa.me/8801886123456?text=${encodeURIComponent(
    'Hello DataNest BD, I would like to schedule an online consultation via Google Meet or Zoom.'
  )}`;

  return (
    <AppShell>
      <div className="contact-layout">
        {/* Header */}
        <section className="contact-intro space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#93D4D8]/10 text-[#336269] dark:text-[#93D4D8] border border-[#93D4D8]/20">
            <span className="h-2 w-2 rounded-full bg-[#93D4D8] animate-pulse" />
            <span>Direct WhatsApp & Online Video Consulting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--navy-900)] dark:text-white">
            {pageContent.heading}
          </h1>
          <p className="text-base sm:text-lg text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-2xl leading-relaxed">
            {pageContent.introduction}
          </p>

          {/* Online Consultancy Notice */}
          <div className="p-4 rounded-2xl bg-[#93D4D8]/10 border border-[#93D4D8]/20 flex items-start gap-3 text-xs sm:text-sm">
            <Video className="h-5 w-5 text-[#93D4D8] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[var(--navy-900)] dark:text-white">
                No Physical Office Visits:
              </span>{' '}
              <span className="text-[var(--navy-800)] dark:text-[#C7D4DB]">
                To provide focused, uninterrupted engineering delivery, we do not host in-person office visits. Client meetings, discovery calls, and technical walkthroughs are held over Google Meet & Zoom as per client priority.
              </span>
            </div>
          </div>
        </section>

        {/* Contact Info Strip */}
        <div className="contact-channels grid grid-cols-1 gap-4 text-xs text-[var(--navy-400)] dark:text-[#C7D4DB]">
          {/* WhatsApp Direct */}
          <Reveal variant="scale">
          <div className="glass-card p-5 rounded-3xl space-y-3 shadow-md border-[#93D4D8]/30">
            <div className="flex items-center gap-2 font-bold text-[var(--navy-900)] dark:text-white text-sm">
              <MessageSquare className="h-5 w-5 text-[#93D4D8]" />
              <span>Direct WhatsApp</span>
            </div>
            <p className="text-sm font-extrabold text-[var(--navy-900)] dark:text-white">
              +880 1886-123456
            </p>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn glass-btn-accent text-xs py-2 px-3.5 rounded-xl inline-flex items-center gap-1.5"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          </Reveal>

          {/* Email */}
          <Reveal variant="scale" delay={0.06}>
          <div className="glass-card p-5 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center gap-2 font-bold text-[var(--navy-900)] dark:text-white text-sm">
              <Mail className="h-5 w-5 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
              <span>Corporate Email</span>
            </div>
            <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex min-h-11 items-center break-all font-medium text-[var(--color-link)] underline underline-offset-4">
              {siteConfig.contact.email}
            </a>
            <p className="text-[11px] text-[var(--navy-400)] dark:text-[#C7D4DB]">
              Response within 24 hours
            </p>
          </div>
          </Reveal>

          {/* WhatChimp Credential */}
          <Reveal variant="scale" delay={0.12}>
          <div className="glass-card p-5 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center gap-2 font-bold text-[var(--navy-900)] dark:text-white text-sm">
              <ShieldCheck className="h-5 w-5 text-orange-500" />
              <span>Partner Credential</span>
            </div>
            <p className="font-medium text-[var(--navy-900)] dark:text-white">
              Verified WhatChimp Silver Partner
            </p>
            <a
              href={siteConfig.partner.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn text-[11px] px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5"
            >
              <span>Verify Credential</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          </Reveal>
        </div>

        {/* Lead Form */}
        <section className="contact-form">
          <Suspense fallback={null}>
            <ContactLeadForm />
          </Suspense>
        </section>
      </div>
    </AppShell>
  );
}
