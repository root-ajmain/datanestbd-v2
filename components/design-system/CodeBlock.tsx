import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

/**
 * Per the type rules, code uses Open Sans like everything else in this
 * system — Orbitron/Michroma never render below 20px, so they're excluded
 * from dense code text entirely.
 */
export function CodeBlock({ children, label, className = '' }: CodeBlockProps) {
  return (
    <div className={`ds-card rounded-xl overflow-hidden ${className}`}>
      {label && (
        <div className="flex items-center gap-2 border-b border-[var(--ds-border)] bg-[var(--surface-2)] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
            {label}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}
