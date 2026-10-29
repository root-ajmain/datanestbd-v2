'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface WorkflowStep {
  label: string;
  // A pre-rendered element (e.g. <MessageCircle />), not a component
  // reference — these pages are Server Components, and only plain data or
  // already-constructed React elements can cross into a Client Component
  // as props. A bare component type is a function and gets rejected.
  icon: React.ReactNode;
}

interface AnimatedWorkflowProps {
  headline: string;
  steps: WorkflowStep[];
  className?: string;
}

/**
 * Replaces a static photo with a titled, continuously-animated workflow
 * diagram — nodes pulse in sequence and a packet travels the connecting
 * line, suggesting live data flow rather than a frozen stock photo.
 */
export function AnimatedWorkflow({ headline, steps, className = '' }: AnimatedWorkflowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`ds-glass relative rounded-2xl p-6 sm:p-8 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--brand-12), transparent 70%)' }}
      />

      <p className="relative text-sm font-bold leading-snug text-[var(--ds-text-primary)] font-[family-name:var(--font-body)] sm:text-base">
        {headline}
      </p>

      <div className="workflow-steps relative mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-10 sm:flex sm:items-center sm:justify-between sm:gap-1">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <React.Fragment key={step.label}>
              <div className="workflow-step flex min-w-0 flex-col items-center gap-2 text-center">
                <motion.span
                  animate={{
                    boxShadow: [
                      '0 0 0 0 var(--brand-12)',
                      '0 0 0 8px var(--brand-12)',
                      '0 0 0 0 var(--brand-12)',
                    ],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * (2.4 / steps.length),
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--brand-35)] bg-[var(--brand-12)] text-[var(--brand-hover)] sm:h-12 sm:w-12"
                >
                  {step.icon}
                </motion.span>
                <span className="max-w-[5.5rem] text-[11px] font-semibold leading-tight text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)] sm:text-xs">
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div className="workflow-connector relative mb-6 hidden h-px flex-1 overflow-hidden bg-[var(--ds-border)] sm:block">
                  <motion.span
                    animate={{ x: ['-100%', '220%'] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: idx * (2.4 / steps.length),
                    }}
                    className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent"
                    aria-hidden="true"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}
