import React from 'react';

const items = ['NEXT.JS', 'TYPESCRIPT', 'META CLOUD API', 'WHATCHIMP', 'POSTGRESQL', 'TAILWIND CSS', 'VERCEL'];

/**
 * A continuously scrolling strip of the stack/partners the site is built
 * on — the content is doubled so the loop is seamless, and the whole track
 * is one flex row so item widths never need to match. Pure CSS animation
 * (no client JS), paused on hover/focus, and already covered by the global
 * prefers-reduced-motion override.
 */
export function TechMarquee() {
  return (
    <div className="ds-marquee-mask relative overflow-hidden border-y border-[var(--ds-border)] py-4">
      <div className="ds-marquee-track flex w-max items-center gap-12">
        {[...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
