import React from 'react';
import { getPageMetadata } from '@/lib/page-metadata';
import { AppShell } from '@/components/shell/AppShell';
import { GrowthExperience } from '@/components/sections/GrowthExperience';
import { LeadForm } from '@/components/forms/LeadForm';
import { generalFaqs } from '@/content/faqs';

export const metadata = getPageMetadata('/');
export default function HomePage() {
  return <AppShell>
    <GrowthExperience />
    <section className="home-faq" id="faq">
      <div><span className="eyebrow">A little clarity</span><h2>Good questions.<br />Straight answers.</h2><p>Know what comes next before you take the first step.</p></div>
      <div>{generalFaqs.map((faq, index) => <details key={faq.question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
    </section>
    <section id="contact" className="home-contact"><LeadForm title="Your next chapter starts with a conversation." subtitle="Tell us where work gets stuck. Together, we’ll find the right place to start." /></section>
  </AppShell>;
}
