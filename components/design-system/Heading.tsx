import React from 'react';

type DisplayVariant = 'h1' | 'h2' | 'eyebrow' | 'stat';

const variantClass: Record<DisplayVariant, string> = {
  h1: 'ds-h1',
  h2: 'ds-h2',
  eyebrow: 'ds-eyebrow',
  stat: 'ds-stat',
};

const variantTag: Record<DisplayVariant, 'h1' | 'h2' | 'p' | 'span'> = {
  h1: 'h1',
  h2: 'h2',
  eyebrow: 'span',
  stat: 'span',
};

interface DisplayProps {
  variant: DisplayVariant;
  children: React.ReactNode;
  className?: string;
  /** Exactly one word may be rendered in brand red per 60/30/10. */
  accent?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * The only way headings/eyebrows/stat numbers get set in Orbitron on this
 * site. There is no `size` prop — variants fix the floor at 20px+ so a
 * caller can't accidentally render display type at body scale.
 */
export function Display({ variant, children, className = '', accent, as }: DisplayProps) {
  const Tag = as ?? variantTag[variant];
  return (
    <Tag className={`${variantClass[variant]} ${className}`}>
      {children}
      {accent && <span className="ds-gradient-text"> {accent}</span>}
    </Tag>
  );
}
