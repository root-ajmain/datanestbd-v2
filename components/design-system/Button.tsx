import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClass: Record<ButtonVariant, string> = {
  // Button text on red is ALWAYS white (4.71:1, passes AA). Never black on
  // red. The glossy animated gradient (red -> slate-teal, never the light
  // aqua — see .ds-gradient-brand) replaces a flat fill; hover/active still
  // darken via border + a slight brightness lift, the gradient's own motion
  // handles the rest.
  primary:
    'ds-gradient-brand text-[var(--ds-text-on-brand)] border border-transparent shadow-[0_4px_20px_-6px_var(--brand-45)] hover:shadow-[0_6px_28px_-6px_var(--brand-65)] active:brightness-90',
  secondary:
    'bg-transparent text-[var(--ds-text-primary)] border border-[var(--ds-border-strong)] hover:border-[var(--brand-65)] hover:bg-[var(--brand-12)]',
  ghost:
    'bg-transparent text-[var(--ds-text-secondary)] border border-transparent hover:text-[var(--ds-text-primary)] hover:bg-white/5',
};

const base =
  'ds-focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold font-[family-name:var(--font-body)] transition-colors duration-150 whitespace-nowrap';

interface CommonProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps =
  | (CommonProps & { href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>)
  | (CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>);

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variantClass[variant]} ${className}`;

  if (rest.href) {
    const linkProps = rest as Extract<ButtonProps, { href: string }>;
    return (
      <Link {...linkProps} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Extract<ButtonProps, { href?: undefined }>;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
