import localFont from 'next/font/local';

/**
 * Self-hosted font stack — no Google Fonts CDN requests.
 * Each file below is a woff2 pulled once from Google's static CDN, subset to
 * latin + latin-ext, and committed under /public/fonts. See design-system docs
 * in app/design-system/page.tsx for the usage rules these faces must follow.
 */

// WORDMARK — Michroma 400. Logo wordmark only, never body text.
export const michroma = localFont({
  src: [
    { path: '../public/fonts/michroma-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/michroma-latin-ext.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-wordmark-face',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
});

// DISPLAY — Orbitron variable (covers 500/700/900). H1, H2, stat numbers, eyebrows.
export const orbitron = localFont({
  src: [{ path: '../public/fonts/orbitron-variable-latin.woff2', weight: '500 900', style: 'normal' }],
  variable: '--font-display-face',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
});

// BODY — Open Sans variable (covers 400/600/700). Everything else.
export const openSans = localFont({
  src: [
    { path: '../public/fonts/opensans-variable-latin.woff2', weight: '300 800', style: 'normal' },
    { path: '../public/fonts/opensans-variable-latin-ext.woff2', weight: '300 800', style: 'normal' },
  ],
  variable: '--font-body-face',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  preload: true,
});

export const fontVariables = `${michroma.variable} ${orbitron.variable} ${openSans.variable}`;
