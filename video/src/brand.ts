// Mirrors the live site's design tokens 1:1 (app/globals.css) so rendered
// videos sit flush with the page they're embedded in. Keep in sync by hand —
// this project has no build-time link back to the Next.js app's CSS.
export const colors = {
  navy900: '#050a14', // deepest surface — matches the page background exactly
  navy800: '#0b1830', // base dark surface (hero, nav, cards)
  navy600: '#17305c', // elevated card surface on dark sections
  navy400: '#8fa6d9', // secondary / muted text
  white: '#ffffff',
  brand: '#2f8fff',
  brandHover: '#6ab2ff',
  brandActive: '#0a62e0',
  accent: '#ff8a3d',
} as const;

export const fonts = {
  // Self-hosted, same files as lib/fonts.ts — no network font requests at render time.
  display: 'DN Orbitron',
  body: 'DN Open Sans',
} as const;

export const FPS = 30;
