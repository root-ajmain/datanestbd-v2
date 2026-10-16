import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { projects } from '@/content/projects';
import { AppShell } from '@/components/shell/AppShell';
import { SplitButton } from '@/components/ui/SplitButton';
import { AnimatedWorkflow } from '@/components/design-system/AnimatedWorkflow';
import { projectWorkflows } from '@/lib/project-workflows';
import { Reveal } from '@/components/design-system/Reveal';
import { HostedSiteShowcase } from '@/components/sections/HostedSiteShowcase';

const pageContent = getPageContent('/work');
export const metadata = getPageMetadata('/work');

export default function WorkPage() {
  return (
    <AppShell>
      <div className="space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--red-700)] dark:text-[var(--orange-500)]">
            Live sites & system architecture
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)]">
            {pageContent.heading}
          </h1>
          <p className="text-base sm:text-lg text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-2xl leading-relaxed">
            {pageContent.introduction}
          </p>
        </section>

        <HostedSiteShowcase />

        <Reveal>
          <section className="work-architecture-heading" aria-labelledby="architecture-title">
            <div>
              <span className="eyebrow">From live builds to system thinking</span>
              <h2 id="architecture-title">The systems behind the surface.</h2>
            </div>
            <p>Alongside the published sites, these reference architectures show how we think through workflows before implementation.</p>
          </section>
        </Reveal>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((proj, idx) => (
            <Reveal key={proj.id} delay={Math.min(idx, 3) * 0.08}>
            <div
              className="glass-card rounded-3xl p-6 md:p-8 space-y-6 hover:border-white/80 dark:hover:border-white/30 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--red-700)] dark:text-[var(--orange-500)]">
                    {proj.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--navy-900)] dark:text-[var(--white)] mt-1">
                    {proj.title}
                  </h2>
                </div>
                {proj.isSampleArchitecture && (
                  <span className="text-xs px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 text-[var(--navy-400)] dark:text-[#C7D4DB] self-start sm:self-auto font-medium">
                    Sample Workflow Architecture
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5">
                  {projectWorkflows[proj.id] && (
                    <AnimatedWorkflow headline={proj.title} steps={projectWorkflows[proj.id]} />
                  )}
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--navy-900)] dark:text-[var(--white)] mb-1">
                      Business Problem
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--navy-400)] dark:text-[#C7D4DB]">
                      {proj.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--navy-900)] dark:text-[var(--white)] mb-1">
                      Solution Architecture
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--navy-400)] dark:text-[#C7D4DB]">
                      {proj.scope}
                    </p>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--navy-900)] dark:text-[var(--white)] mb-2">
                      Key Technical Components
                    </h3>
                    <ul className="aligned-list grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {proj.architecture.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-[var(--navy-800)] dark:text-[#C7D4DB]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--red-700)] dark:text-[var(--orange-500)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--navy-400)] dark:text-[#C7D4DB]">
                <span className="italic">{proj.attributionLimitations}</span>
                <Link
                  href={`/work/${proj.slug}`}
                  className="glass-btn hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Detailed Specification</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <section className="glass-card p-8 rounded-3xl text-center space-y-4 shadow-md">
            <h2 className="text-2xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
              Need a similar system for your business?
            </h2>
            <p className="text-sm text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-lg mx-auto">
              Discuss your requirements with our engineering team in Dhaka. We review workflows and provide candid technical feedback.
            </p>
            <div className="pt-2 flex justify-center">
              <SplitButton href="/contact" variant="primary">
                Discuss your project
              </SplitButton>
            </div>
          </section>
        </Reveal>
      </div>
    </AppShell>
  );
}
