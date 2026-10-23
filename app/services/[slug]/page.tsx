import { getPageContent, getPageMetadata } from '@/lib/page-metadata';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CheckCircle2,
  ShieldAlert,
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Server,
  Inbox,
  UserCheck,
  Database,
  Globe,
  FormInput,
  ShieldCheck,
  KeyRound,
  LayoutDashboard,
  FileSearch,
  Bot,
  Eye,
  Megaphone,
  Target,
  BarChart3,
  Clapperboard,
  Scissors,
} from 'lucide-react';
import { services } from '@/content/services';
import { siteConfig } from '@/content/site';
import { getServiceJsonLd, getBreadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { AppShell } from '@/components/shell/AppShell';
import { SplitButton } from '@/components/ui/SplitButton';
import { LeadForm } from '@/components/forms/LeadForm';
import { IncludedShowcase } from '@/components/design-system/IncludedShowcase';
import { AnimatedWorkflow, type WorkflowStep } from '@/components/design-system/AnimatedWorkflow';
import { ThreePrioritiesLoop } from '@/components/design-system/ThreePrioritiesLoop';
import { Reveal } from '@/components/design-system/Reveal';
import type { LucideIcon } from 'lucide-react';

// Pages here are Server Components; only plain data or already-rendered
// elements can cross into the Client Component below, not bare component
// references — so every icon is instantiated up front via this helper.
function stepIcon(Icon: LucideIcon) {
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}

const serviceWorkflows: Record<string, WorkflowStep[]> = {
  'whatsapp-api': [
    { label: 'Customer Message', icon: stepIcon(MessageCircle) },
    { label: 'Meta Cloud API', icon: stepIcon(Server) },
    { label: 'Shared Inbox', icon: stepIcon(Inbox) },
    { label: 'Agent Reply', icon: stepIcon(UserCheck) },
    { label: 'CRM Sync', icon: stepIcon(Database) },
  ],
  'web-development': [
    { label: 'Visitor Request', icon: stepIcon(Globe) },
    { label: 'Next.js Render', icon: stepIcon(Server) },
    { label: 'Form Submit', icon: stepIcon(FormInput) },
    { label: 'Server Validation', icon: stepIcon(ShieldCheck) },
    { label: 'Database Write', icon: stepIcon(Database) },
  ],
  'saas-development': [
    { label: 'User Sign-In', icon: stepIcon(KeyRound) },
    { label: 'Tenant Resolve', icon: stepIcon(Server) },
    { label: 'Role Check', icon: stepIcon(ShieldCheck) },
    { label: 'Data Query', icon: stepIcon(Database) },
    { label: 'Dashboard Render', icon: stepIcon(LayoutDashboard) },
  ],
  'ai-automation': [
    { label: 'Input Captured', icon: stepIcon(FileSearch) },
    { label: 'Grounded Retrieval', icon: stepIcon(Database) },
    { label: 'AI Agent', icon: stepIcon(Bot) },
    { label: 'Confidence Check', icon: stepIcon(Eye) },
    { label: 'Human Review', icon: stepIcon(UserCheck) },
  ],
  'landing-pages': [
    { label: 'Ad Click', icon: stepIcon(Megaphone) },
    { label: 'Fast Render', icon: stepIcon(Server) },
    { label: 'Form Submit', icon: stepIcon(FormInput) },
    { label: 'Lead Captured', icon: stepIcon(Target) },
  ],
  'digital-marketing': [
    { label: 'Audience Targeting', icon: stepIcon(Target) },
    { label: 'Ad Delivery', icon: stepIcon(Megaphone) },
    { label: 'Conversion Event', icon: stepIcon(ShieldCheck) },
    { label: 'Reporting', icon: stepIcon(BarChart3) },
  ],
  'meta-ecosystem': [
    { label: 'Asset Audit', icon: stepIcon(FileSearch) },
    { label: 'Permission Setup', icon: stepIcon(ShieldCheck) },
    { label: 'Domain Verification', icon: stepIcon(Globe) },
    { label: 'Submission Ready', icon: stepIcon(CheckCircle2) },
  ],
  'marketing-motion-videos': [
    { label: 'Brief & Script', icon: stepIcon(FileSearch) },
    { label: 'Storyboard', icon: stepIcon(Clapperboard) },
    { label: 'Edit & Motion Design', icon: stepIcon(Scissors) },
    { label: 'Platform Export', icon: stepIcon(Megaphone) },
  ],
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return getPageMetadata(`/services/${service.slug}`);
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const pageContent = getPageContent(`/services/${service.slug}`);

  const serviceJsonLd = getServiceJsonLd(service);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', item: siteConfig.canonicalOrigin },
    { name: 'Services', item: `${siteConfig.canonicalOrigin}/services` },
    { name: service.title, item: `${siteConfig.canonicalOrigin}/services/${service.slug}` },
  ]);

  return (
    <AppShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd) }}
      />

      <div className="space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--navy-400)] dark:text-[#C7D4DB]">
          <Link href="/services" className="hover:text-[var(--navy-900)] dark:hover:text-[var(--white)] inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            <span>All Services</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--navy-900)] dark:text-[var(--white)] font-medium truncate">{service.title}</span>
        </nav>

        {/* Hero Header */}
        <section className="space-y-4">
          <span className="text-xs font-mono font-bold text-[var(--red-700)] dark:text-[var(--orange-500)] uppercase tracking-wider">
            {service.groupLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)] leading-[1.15]">
            {pageContent.heading}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--navy-800)] dark:text-[#C7D4DB] max-w-2xl font-medium">
            {pageContent.introduction}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <SplitButton href={`#inquiry`} variant="primary">
              {service.ctaText}
            </SplitButton>
            <SplitButton href="/contact" variant="outline">
              Request Custom Scope
            </SplitButton>
          </div>
        </section>

        {/* Live workflow visual, not a static screenshot — the WhatsApp API
            page gets the purpose-built inbox-to-tasks story instead of the
            generic step diagram every other service uses. */}
        <Reveal>
        {service.id === 'whatsapp-api' ? (
          <section className="glass-card overflow-hidden rounded-3xl p-2 sm:p-4">
            <ThreePrioritiesLoop />
          </section>
        ) : (
          serviceWorkflows[service.id] && (
            <AnimatedWorkflow headline={`How ${service.title} moves end to end`} steps={serviceWorkflows[service.id]} />
          )
        )}
        </Reveal>

        {/* Overview Summary */}
        <Reveal>
        <section className="glass-card p-8 rounded-3xl space-y-4 shadow-md">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Service Architecture & Scope
          </h2>
          <p className="text-sm leading-relaxed text-[var(--navy-800)] dark:text-[#C7D4DB]">
            {service.summary}
          </p>
          <p className="text-sm leading-relaxed">
            <Link href="/pricing" className="text-[var(--color-link)] underline">Compare pricing and scope</Link>
            {' · '}<Link href="/work" className="text-[var(--color-link)] underline">Review reference architectures</Link>
          </p>
        </section>
        </Reveal>

        {/* Deliverables */}
        <Reveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            What We Deliver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.deliverables.map((item, idx) => (
              <Reveal key={idx} variant="scale" delay={Math.min(idx, 5) * 0.05}>
              <div
                className="glass-card p-4 rounded-2xl flex items-start gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-[var(--red-700)] dark:text-[var(--orange-500)] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-[var(--navy-800)] dark:text-[var(--white)] font-medium">
                  {item}
                </span>
              </div>
              </Reveal>
            ))}
          </div>
        </section>
        </Reveal>

        {/* Implementation Process */}
        <Reveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Implementation Process
          </h2>
          <div className="space-y-3">
            {service.process.map((p, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl space-y-1"
              >
                <h3 className="text-sm font-bold text-[var(--navy-900)] dark:text-[var(--white)] font-mono">
                  {p.step}
                </h3>
                <p className="text-xs text-[var(--navy-400)] dark:text-[#C7D4DB] leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        </Reveal>

        {/* Technical Boundaries & Exclusions */}
        <Reveal>
        <section className="p-6 rounded-3xl border border-[var(--red-700)] bg-[var(--red-50)] dark:bg-[var(--navy-800)] space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--red-700)] dark:text-[var(--orange-500)]">
            <ShieldAlert className="h-5 w-5 shrink-0 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
            <span>Technical Boundaries & Policy Notice</span>
          </div>
          <p className="text-xs text-[var(--navy-900)] dark:text-[var(--white)]">
            To protect your business and ensure clear accountability, DataNest BD establishes explicit operational boundaries:
          </p>
          <ul className="space-y-2 text-xs text-[var(--navy-800)] dark:text-[#C7D4DB]">
            {service.boundaries.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[var(--red-700)] dark:text-[var(--orange-500)] font-bold">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>
        </Reveal>

        {/* FAQs */}
        <Reveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl space-y-1 shadow-xs"
              >
                <h3 className="text-sm font-bold text-[var(--navy-900)] dark:text-[var(--white)] flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-[var(--navy-800)] dark:text-[#C7D4DB] leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
        </Reveal>

        {/* What's included with every DataNest BD engagement — the WhatsApp API
            page already covers this in full on /pricing, so it's skipped here. */}
        {service.id !== 'whatsapp-api' && <IncludedShowcase />}

        {/* Contextual Lead Form */}
        <section id="inquiry" className="pt-6">
          <LeadForm
            initialServiceId={service.id}
            title={`Discuss your ${service.title} requirements`}
            subtitle="Let our team know your business requirements. We review your inquiry and schedule a scoping call within 1 business day."
          />
        </section>
      </div>
    </AppShell>
  );
}
