'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface SplitButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  target?: string;
  rel?: string;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function SplitButton({
  href,
  onClick,
  children,
  variant = 'primary',
  target,
  rel,
  className = '',
  ariaLabel,
  type = 'button',
  disabled = false,
}: SplitButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary' || variant === 'outline';

  const baseContainerClasses =
    'split-button group inline-flex items-center gap-2 min-h-[44px] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 select-none';

  const content = (
    <>
      {isPrimary ? (
        <>
          {/* --orange-600 now resolves to the brand red: red's luminance is much
              lower than the old orange, so the label flips to white — navy-900
              on red measures ~3.82:1, under the 4.5:1 AA floor for this size. */}
          <span className="liquid-cta flex items-center justify-center px-6 py-2.5 rounded-full bg-[var(--orange-600)] group-active:scale-[0.98] transition-colors duration-200 text-sm md:text-base font-bold text-white tracking-wide shadow-xs whitespace-nowrap">
            {children}
          </span>
          {/* Circular icon container: icon color is exempt from the text
              contrast rule, but white keeps it visually consistent with the label. */}
          <span className="liquid-cta flex items-center justify-center w-11 h-11 rounded-full bg-[var(--orange-600)] group-active:scale-[0.98] transition-all duration-200 text-white shadow-xs shrink-0">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </>
      ) : (
        /* Secondary Action: transparent, 1px --navy-800 border, --navy-800 text */
        <span className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[var(--navy-800)] dark:border-[var(--color-border-strong)] bg-transparent hover:bg-[var(--navy-50)] dark:hover:bg-[var(--navy-800)] transition-colors duration-200 text-sm font-semibold text-[var(--navy-800)] dark:text-[var(--white)] whitespace-nowrap">
          {children}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`${baseContainerClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseContainerClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {content}
    </button>
  );
}
