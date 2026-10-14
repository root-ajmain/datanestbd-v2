import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { projects } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { AppShell } from '@/components/shell/AppShell';
import { LeadForm } from '@/components/forms/LeadForm';
import { AnimatedWorkflow } from '@/components/design-system/AnimatedWorkflow';
import { projectWorkflows } from '@/lib/project-workflows';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return getPageMetadata(`/work/${project.slug}`);
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const pageContent = getPageContent(`/work/${project.slug}`);

  return (
    <AppShell>
      <div className="space-y-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--navy-400)] dark:text-[#C7D4DB]">
          <Link href="/work" className="hover:text-[var(--navy-900)] dark:hover:text-[var(--white)] inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            <span>All Architectures</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--navy-900)] dark:text-[var(--white)] font-medium truncate">{project.title}</span>
        </nav>

        <section className="space-y-4">
          <span className="text-xs font-mono font-bold text-[var(--red-700)] dark:text-[var(--orange-500)] uppercase">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)] leading-[1.15]">
            {pageContent.heading}
          </h1>
          <p className="text-sm font-medium text-[var(--navy-400)] dark:text-[#C7D4DB] italic">
            {pageContent.introduction}
          </p>
        </section>

        {projectWorkflows[project.id] && (
          <AnimatedWorkflow headline={`How ${project.title} moves end to end`} steps={projectWorkflows[project.id]} />
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl space-y-3 shadow-md">
            <h2 className="text-base font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
              Operational Problem & Context
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--navy-400)] dark:text-[#C7D4DB]">
              {project.problem}
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 shadow-md">
            <h2 className="text-base font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
              Engineered Solution
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[var(--navy-400)] dark:text-[#C7D4DB]">
              {project.scope}
            </p>
          </div>
        </section>

        <section className="glass-card p-8 rounded-3xl space-y-4 shadow-md">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Architectural Layers & Components
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.architecture.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--navy-800)] dark:text-[var(--white)]">
                <CheckCircle2 className="h-5 w-5 text-[var(--red-700)] dark:text-[var(--orange-500)] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card p-8 rounded-3xl space-y-4 shadow-md">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Outcomes & Impact
          </h2>
          <ul className="space-y-2">
            {project.outcomesExpected.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--navy-800)] dark:text-[#C7D4DB]">
                <span className="font-bold text-[var(--red-700)] dark:text-[var(--orange-500)]">·</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-6">
          <LeadForm
            title="Discuss implementing a similar architecture"
            subtitle="Let our team know your business requirements. We review your inquiry and schedule a scoping call within 1 business day."
          />
        </section>
      </div>
    </AppShell>
  );
}
