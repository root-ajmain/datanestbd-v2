import type {NextConfig} from 'next';

// STATIC_EXPORT=1 produces the Hostinger frontend bundle (static HTML in
// `out/`): no Node server, so `/api/leads` is served from Vercel instead
// (see .env.example — NEXT_PUBLIC_API_BASE_URL). `output: 'export'` doesn't
// support headers()/redirects()/the default image loader, so those are
// skipped here; the 301s are reproduced for Hostinger via generated
// .htaccess rules instead (scripts/build-static-export).
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  // Keep verification builds separate from a running local preview when requested.
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agency-api.whatchimp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: isStaticExport ? 'export' : 'standalone',
  // Without this, `next export` writes top-level routes as flat files
  // (e.g. `work.html`) that sit next to a same-named directory holding
  // their dynamic sub-routes (`work/whatchimp-multiagent-waba.html`).
  // That file/directory collision makes static hosts (Apache/Hostinger
  // included) serve a directory listing or 403 for `/work` and
  // `/services` instead of the page. trailingSlash forces every route to
  // render as `path/index.html`, which nests without colliding.
  trailingSlash: isStaticExport,
  transpilePackages: ['motion'],
  ...(isStaticExport ? {} : { headers, redirects }),
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    } else if (dev) {
      // The file-backed lead store writes to data/leads.json on every submission.
      // Without this, the dev watcher treats each write as a source change and
      // invalidates the build, 404-ing whichever request happens to land mid-recompile.
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules/**', '**/data/**'],
      };
    }
    return config;
  },
};

export default nextConfig;

async function headers() {
    // No third-party scripts, styles, analytics, or iframes are loaded
    // anywhere on the site — the only external resource is the WhatChimp
    // partner badge image — so the CSP can stay tight instead of carrying
    // broad allowances "just in case". 'unsafe-eval' is only added outside
    // production: Next dev mode's webpack React Refresh runtime evaluates
    // code as a string for fast HMR, which a strict script-src blocks
    // outright (confirmed: it silently kills all client-side JS in dev,
    // including every Framer Motion animation). Production builds don't
    // use eval() for the app bundle, so it's dropped there.
    const isDev = process.env.NODE_ENV !== 'production';
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://agency-api.whatchimp.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.datanestbd.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
}

async function redirects() {
    return [
      {
        source: '/services/facebook-business',
        destination: '/services/meta-ecosystem',
        permanent: true,
      },
      {
        source: '/services/whatsapp',
        destination: '/services/whatsapp-api',
        permanent: true,
      },
      {
        source: '/services/web',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/services/saas',
        destination: '/services/saas-development',
        permanent: true,
      },
      {
        source: '/services/ai',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/work/flowgent-multiagent-waba',
        destination: '/work/whatchimp-multiagent-waba',
        permanent: true,
      },
      {
        source: '/architecture',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inquiry',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/refund',
        destination: '/refund-policy',
        permanent: true,
      },
    ];
}
