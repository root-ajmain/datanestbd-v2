// Local browser regression check. Supply PLAYWRIGHT_MODULE when using an external installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultNavigationTimeout(120000);
  page.setDefaultTimeout(120000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') console.log('Browser:', message.text()); });
  const output = 'artifacts/redesign';
  fs.mkdirSync(output, { recursive: true });
  async function ready() {
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light' && Number(document.querySelector('header')?.style.opacity) >= .99);
    await page.evaluate(() => document.fonts.ready);
  }
  try {
    if (process.env.REDESIGN_LOGO_ONLY) {
      await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
      await ready();
      const glyph = await page.locator('.premium-nav .brand-glyph').evaluate(element => ({ visible: element.getBoundingClientRect().width > 0, background: getComputedStyle(element).backgroundImage, icon: element.querySelector('svg') !== null }));
      assert.equal(glyph.visible && glyph.icon, true, 'brand glyph is visible');
      await page.screenshot({ path: `${output}/home-brand-check.png` });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: `${output}/home-brand-mobile-check.png` });
      console.log('PASS visible branded glyph at desktop and mobile', glyph);
      return;
    }
    for (const route of ['/', '/services', '/pricing', '/work', '/about', '/contact', '/services/whatsapp-api', '/privacy-policy', '/terms-and-conditions', '/refund-policy']) {
      const response = await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'domcontentloaded' });
      await ready();
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, `${route}: one heading`);
      assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'light');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (overflow) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).map(el => ({ tag: el.tagName, class: el.className, right: Math.round(el.getBoundingClientRect().right) })).slice(0, 15)));
      assert.equal(overflow, false, `${route}: desktop overflow`);
      if (['/', '/services', '/pricing', '/work', '/contact'].includes(route)) await page.screenshot({ path: `${output}/${route === '/' ? 'home' : route.slice(1)}-desktop.png` });
      console.log(`PASS ${route}`);
    }
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < 3; i++) {
      await page.locator('.story-chapter').nth(i).scrollIntoViewIfNeeded();
      await page.waitForFunction(index => document.querySelector('.story-counter')?.textContent === `0${index + 1} / 03`, i);
    }
    await page.screenshot({ path: `${output}/story-desktop.png` });
    await page.getByRole('button', { name: 'Motion on' }).click();
    assert.equal(await page.getByRole('button', { name: 'Motion off' }).getAttribute('aria-pressed'), 'true');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Motion off' }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Motion off' }).getAttribute('aria-pressed'), 'true');
    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      for (const route of ['/', '/services', '/pricing', '/work', '/about', '/contact']) {
        await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'domcontentloaded' });
        await page.locator('h1').waitFor();
        await ready();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${route}: overflow at ${width}`);
        if (width === 390) await page.screenshot({ path: `${output}/${route === '/' ? 'home' : route.slice(1)}-mobile.png` });
      }
    }
    assert.deepEqual(errors, []);
    console.log('PASS scroll chapters, motion preference persistence, 390/768px layouts, no browser errors');
  } catch (error) {
    console.log('Page errors:', errors);
    await page.screenshot({ path: `${output}/failure.png`, timeout: 15000 });
    throw error;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
