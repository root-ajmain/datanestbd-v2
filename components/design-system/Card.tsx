import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

/**
 * Sits on --surface-1 with a --border hairline. On hover the border goes
 * --brand-65 with a soft --brand-12 glow and a small translateY lift
 * (see .ds-card in globals.css) — never a scale transform, so nothing
 * inside shifts baseline.
 */
export function Card({ children, className = '', highlighted = false }: CardProps) {
  return (
    <div
      className={`ds-card rounded-2xl p-6 ${
        highlighted ? 'border-[var(--brand-65)] shadow-[0_0_0_1px_var(--brand-12),0_8px_32px_-12px_var(--brand-45)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
