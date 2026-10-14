import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  href?: string | null;
}

/**
 * Michroma wordmark is used in exactly one place: here. Never drop below
 * 20px (the .ds-wordmark class enforces the floor) and never reuse Michroma
 * elsewhere in the UI.
 */
export function Logo({ className = '', iconSize = 36, href = '/' }: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="brand-glyph" style={{ width: iconSize, height: iconSize }} aria-hidden="true">
        <Layers size={iconSize * 0.54} strokeWidth={1.8} />
      </span>
      {/*
        No red text here: at 20px/regular-weight Michroma this would sit at
        4.45:1, under the 4.5:1 AA floor for body-scale text (red only
        clears AA at >=24px regular or >=19px bold). The red dot after the
        wordmark carries the brand mark instead — an icon/UI element, which
        is exempt.

        The dot is grouped in its own inner flex with just the text, not the
        outer row — centering it against the full row (which includes the
        taller logo icon) pushed it up near the text's cap-height instead of
        its vertical middle.
      */}
      <span className="inline-flex items-center gap-2">
        <span className="ds-wordmark text-[var(--ds-text-primary)]">DataNest.BD</span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" aria-hidden="true" />
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="DataNest BD home" className="ds-focus-ring rounded-lg">
      {content}
    </Link>
  );
}
