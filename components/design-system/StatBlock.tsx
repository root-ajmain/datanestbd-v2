import React from 'react';
import { Display } from './Heading';

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, label, className = '' }: StatBlockProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Display variant="stat" as="span" className="text-[var(--brand)]">
        {value}
      </Display>
      <span className="text-sm font-[family-name:var(--font-body)] text-[var(--ds-text-secondary)]">{label}</span>
    </div>
  );
}
