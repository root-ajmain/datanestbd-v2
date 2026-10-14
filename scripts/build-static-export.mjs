// Builds the Hostinger frontend bundle: a static export of every page except
// /api/leads (which only runs on the Vercel backend — see .env.example).
// Usage: node scripts/build-static-export.mjs [apiBaseUrl]
import { execSync } from 'node:child_process';
import { existsSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const apiDir = join(root, 'app', 'api');
const apiDirBak = join(root, 'app', '_api.static-export-backup');
const apiBaseUrl = process.argv[2] || 'https://api.datanestbd.com';
const outDirName = '.next-static-export';
const outDir = join(root, outDirName);

if (existsSync(apiDirBak)) {
  throw new Error(`${apiDirBak} already exists from a previous interrupted run — resolve manually before retrying.`);
}

renameSync(apiDir, apiDirBak);
try {
  rmSync(outDir, { recursive: true, force: true });
  execSync('node node_modules/next/dist/bin/next build', {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      STATIC_EXPORT: '1',
      NEXT_BUILD_DIR: outDirName,
      NEXT_PUBLIC_API_BASE_URL: apiBaseUrl,
    },
  });
} finally {
  renameSync(apiDirBak, apiDir);
}

writeStaticHtaccess(join(outDir, '.htaccess'), apiBaseUrl);
console.log(`\nStatic export ready in ./${outDirName} — upload its contents to your Hostinger document root.`);

function writeStaticHtaccess(path, apiOrigin) {
  // Reproduces next.config.ts's redirects()/headers(), which output: 'export'
  // cannot run itself (there is no Next.js server on Hostinger shared hosting).
  // Destinations carry a trailing slash to match the trailingSlash:true
  // export output (every route is path/index.html) and avoid a second
  // Apache directory-slash redirect hop.
  const redirectPairs = [
    ['/services/facebook-business', '/services/meta-ecosystem/'],
    ['/services/whatsapp', '/services/whatsapp-api/'],
    ['/services/web', '/services/web-development/'],
    ['/services/saas', '/services/saas-development/'],
    ['/services/ai', '/services/ai-automation/'],
    ['/case-studies', '/work/'],
    ['/work/flowgent-multiagent-waba', '/work/whatchimp-multiagent-waba/'],
    ['/architecture', '/'],
    ['/inquiry', '/contact/'],
    ['/privacy', '/privacy-policy/'],
    ['/terms', '/terms-and-conditions/'],
    ['/refund', '/refund-policy/'],
  ];

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://agency-api.whatchimp.com",
    "font-src 'self' data:",
    `connect-src 'self' ${apiOrigin}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  const lines = [
    'RewriteEngine On',
    '',
    // next.config.ts sets trailingSlash:true for this build, so every route
    // exports as path/index.html (e.g. work/index.html, not work.html sitting
    // next to a colliding work/ directory). Apache's default DirectoryIndex
    // serves that without any rewrite — do not reintroduce a `$1.html`
    // rewrite here, it collides with the dynamic-route subdirectories
    // (work/, services/) and serves a directory listing instead of the page.
    ...redirectPairs.map(
      ([from, to]) => `Redirect 301 ${from} ${to}`
    ),
    '',
    '<IfModule mod_headers.c>',
    `  Header always set Content-Security-Policy "${csp}"`,
    '  Header always set X-Frame-Options "DENY"',
    '  Header always set X-Content-Type-Options "nosniff"',
    '  Header always set Referrer-Policy "strict-origin-when-cross-origin"',
    '  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"',
    '  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"',
    '</IfModule>',
    '',
    'ErrorDocument 404 /404.html',
    '',
  ];
  writeFileSync(path, lines.join('\n'));
}
