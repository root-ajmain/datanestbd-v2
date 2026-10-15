import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

/** Red transparency used as a light fill, never a solid: --brand-12 background. */
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-35)] bg-[var(--brand-12)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--ds-text-primary)] font-[family-name:var(--font-body)] backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  );
}
