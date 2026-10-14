'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/content/services';

export function ServiceAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {services.map((svc, index) => {
        const isOpen = openIndex === index;
        const panelId = `service-panel-${svc.id}`;
        const headerId = `service-header-${svc.id}`;
        const numStr = String(index + 1).padStart(2, '0');

        return (
          <div
            key={svc.id}
            className={`glass-card rounded-3xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-white/90 dark:border-white/30 shadow-md ring-1 ring-[var(--orange-500)]/20'
                : 'hover:border-white/80 dark:hover:border-white/20'
            }`}
          >
            {/* Header Accordion Button */}
            <button
              id={headerId}
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange-600)] transition-colors cursor-pointer"
            >
              <div className="flex items-start md:items-center gap-4 min-w-0 pr-4">
                {/* 12px: brand red here would be under the 4.5:1 AA floor. */}
                <span className="tabular-nums font-mono text-xs font-bold text-[var(--red-700)] dark:text-white mt-1 md:mt-0">
                  {numStr}.
                </span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
                    {svc.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-[var(--navy-400)] dark:text-[#C7D4DB] line-clamp-1">
                    {svc.shortOutcome}
                  </p>
                </div>
              </div>

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--grey-200)] dark:border-[var(--color-border)] transition-transform duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-[var(--navy-800)] dark:bg-[var(--navy-800)] text-[var(--white)]'
                    : 'text-[var(--navy-800)] dark:text-[var(--color-text-secondary)]'
                }`}
              >
                <ChevronDown className="h-5 w-5" />
              </div>
            </button>

            {/* Collapsible Content Panel */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`transition-all duration-300 ease-in-out px-6 ${
                isOpen ? 'max-h-[800px] pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className="pt-2 border-t border-[var(--grey-200)] dark:border-[var(--color-border)]">
                <p className="text-sm leading-relaxed text-[var(--navy-800)] dark:text-[#C7D4DB] mt-4">
                  {svc.summary}
                </p>

                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--navy-900)] dark:text-[var(--white)] mb-3">
                    Deliverables & Technical Boundaries
                  </h4>
                  <ul className="aligned-list grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {svc.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-[var(--navy-800)] dark:text-[#C7D4DB]">
                        <CheckCircle2 className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--grey-200)] dark:border-[var(--color-border)]">
                  <span className="text-xs text-[var(--navy-400)] dark:text-[var(--color-text-secondary)] font-mono">
                    {svc.groupLabel}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="glass-btn hover:scale-105 active:scale-95"
                    >
                      <span>Explore {svc.title} Scope & Specifications</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
