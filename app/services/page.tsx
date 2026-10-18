import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services, serviceGroups } from '@/content/services';
import { AppShell } from '@/components/shell/AppShell';
import { SplitButton } from '@/components/ui/SplitButton';
import { LeadForm } from '@/components/forms/LeadForm';
import { KineticServicesReel } from '@/components/design-system/KineticServicesReel';
import { Reveal } from '@/components/design-system/Reveal';
import { ServiceSignalMap } from '@/components/sections/ServiceSignalMap';

const pageContent = getPageContent('/services');
export const metadata = getPageMetadata('/services');

export default function ServicesPage() {
  return (
    <AppShell>
      <div className="space-y-16">
        {/* Header */}
        <section className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--red-700)] dark:text-[var(--orange-500)]">
            Service Catalog & Engineering Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)]">
            {pageContent.heading}
          </h1>
          <p className="text-base sm:text-lg text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-2xl leading-relaxed">
            {pageContent.introduction}
          </p>
        </section>

        {/* One word, four services, one message */}
        <section className="kinetic-reel-section glass-card overflow-hidden rounded-3xl p-2 sm:p-4">
          <div style={{ aspectRatio: '16 / 9' }}>
            <KineticServicesReel className="h-full w-full" />
          </div>
        </section>

        <ServiceSignalMap />

        {/* Grouped Services */}
        {serviceGroups.map((group) => {
          const groupServices = services.filter((s) => group.serviceIds.includes(s.id));
          return (
            <section key={group.id} id={group.id} className="scroll-mt-24 space-y-6">
              <div className="pb-3 border-b border-[var(--grey-200)] dark:border-[var(--color-border)]">
                <span className="text-xs font-mono font-bold text-[var(--red-700)] dark:text-[var(--orange-500)]">
                  Category
                </span>
                <h2 className="text-2xl font-bold text-[var(--navy-900)] dark:text-[var(--white)] mt-1">
                  {group.title}
                </h2>
                <p className="text-xs text-[var(--navy-400)] dark:text-[#C7D4DB] mt-1">
                  {group.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {groupServices.map((svc, idx) => (
                  <Reveal key={svc.id} delay={Math.min(idx, 3) * 0.08}>
                  <div
                    className="glass-card p-6 md:p-8 rounded-3xl space-y-5 hover:border-white/80 dark:hover:border-white/30 transition-all shadow-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-[var(--red-700)] dark:text-[var(--orange-500)]">
                          {svc.id}
                        </span>
                        <h3 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)] mt-1">
                          {svc.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-2xl">
                          {svc.summary}
                        </p>
                      </div>

                      <SplitButton href={`/services/${svc.slug}`} variant="outline" className="shrink-0">
                        View Specification
                      </SplitButton>
                    </div>

                    <div className="pt-3 border-t border-black/10 dark:border-white/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--navy-900)] dark:text-[var(--white)] mb-2.5">
                        Key Deliverables
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {svc.deliverables.slice(0, 4).map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-[var(--navy-800)] dark:text-[#C7D4DB]">
                            <CheckCircle2 className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10 text-xs">
                      <span className="font-semibold text-[var(--navy-900)] dark:text-[var(--white)]">
                        Outcome: {svc.shortOutcome}
                      </span>
                      <Link
                        href={`/contact?service=${svc.id}&intent=${svc.ctaIntent}`}
                        className="glass-btn hover:scale-105 active:scale-95"
                      >
                        <span>{svc.ctaText}</span>
                        <ArrowRight className="h-3 w-3 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                      </Link>
                    </div>
                  </div>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

        {/* Lead Form */}
        <Reveal>
          <section className="pt-8">
            <LeadForm
              title="Have a specific project in mind?"
              subtitle="Select the service you are interested in and our team will get back to you with architectural guidance."
            />
          </section>
        </Reveal>
      </div>
    </AppShell>
  );
}
