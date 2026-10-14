import fs from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const buildDir = process.env.NEXT_BUILD_DIR || '.next';
const read = file => fs.readFileSync(`${buildDir}/${file}`, 'utf8');

const pages = JSON.parse(fs.readFileSync('content/seo-pages.json', 'utf8'));
const titles = new Set();
const descriptions = new Set();
for (const page of pages) {
  const file = `server/app${page.path === '/' ? '/index' : page.path}.html`;
  let html;
  if (process.env.SEO_BASE_URL) {
    const response = await fetch(new URL(page.path, process.env.SEO_BASE_URL));
    assert.equal(response.status, 200, `${page.path}: HTTP status`);
    html = await response.text();
  } else {
    html = read(file);
  }
  const document = new JSDOM(html).window.document;
  const meta = name => document.querySelector(`meta[name="${name}"]`)?.content;
  assert.equal(document.title, page.title, `${page.path}: title`);
  assert.equal(meta('description'), page.description, `${page.path}: description`);
  assert.equal(document.querySelectorAll('h1').length, 1, `${page.path}: one H1`);
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  assert.equal(new URL(canonical).pathname, page.path, `${page.path}: canonical path`);
  assert.equal(new URL(canonical).protocol, 'https:', `${page.path}: canonical HTTPS`);
  assert.equal(document.querySelector('meta[property="og:title"]')?.content, page.title);
  assert.equal(meta('twitter:description'), page.description);
  assert.equal(meta('robots')?.includes('noindex'), !page.index, `${page.path}: indexing`);
  for (const img of document.querySelectorAll('img')) assert.ok(img.hasAttribute('alt'), `${page.path}: image alt attribute`);
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) JSON.parse(script.textContent);
  assert.ok(!titles.has(page.title), `${page.path}: duplicate title`);
  assert.ok(!descriptions.has(page.description), `${page.path}: duplicate description`);
  titles.add(page.title);
  descriptions.add(page.description);
}
const sitemap = read('server/app/sitemap.xml.body');
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.filter(p => p.index).length);
assert.ok(!sitemap.includes('/thank-you') && !sitemap.includes('/design-system'));
const robots = read('server/app/robots.txt.body');
assert.ok(!robots.includes('Disallow: /thank-you'));
const demo = new JSDOM(read('server/app/design-system.html')).window.document;
assert.ok(demo.querySelector('meta[name="robots"]')?.content.includes('noindex'));
const routes = JSON.parse(read('routes-manifest.json'));
assert.ok(routes.redirects.some(r => r.source === '/services/facebook-business' && r.destination === '/services/meta-ecosystem' && r.statusCode === 308));
console.log(`PASS: ${pages.length} rendered page metadata sets, headings, image alt attributes, JSON-LD, sitemap, robots, internal demo noindex and legacy redirect.`);
