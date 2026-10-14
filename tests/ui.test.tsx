import './dom-setup.mjs';
import React from 'react';
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { LeadForm } from '../components/forms/LeadForm';
import { ThemeProvider, useTheme } from '../components/shell/ThemeProvider';
import { GlobalNavbar } from '../components/shell/GlobalNavbar';
import { MobileBottomTabs } from '../components/shell/MobileBottomTabs';
import { SubpageHeaderBar } from '../components/shell/SubpageHeaderBar';

const originalFetch = globalThis.fetch;
afterEach(() => { cleanup(); globalThis.fetch = originalFetch; localStorage.clear(); document.body.style.overflow = ''; });
const submit = () => fireEvent.submit(screen.getByRole('button', { name: 'Save inquiry & continue' }).closest('form')!);
function fill(name = 'Test Business') {
  fireEvent.change(screen.getByLabelText('Your name or business name *'), { target: { value: name } });
  fireEvent.change(screen.getByLabelText('WhatsApp number *'), { target: { value: '+8801700000000' } });
  fireEvent.click(screen.getByRole('checkbox'));
}

test('invalid fields are labelled, announced and focused without sending a request', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('Should not submit'); };
  render(<LeadForm />);
  submit();
  assert.match(screen.getByRole('alert').textContent!, /highlighted fields/);
  const name = screen.getByLabelText('Your name or business name *');
  await waitFor(() => assert.equal(document.activeElement, name));
  assert.equal(name.getAttribute('aria-invalid'), 'true');
  assert.equal(calls, 0);
});

test('successful inquiries have an explicit WhatsApp handoff and a fresh key for the next inquiry', async () => {
  const bodies: Array<Record<string, string>> = [];
  globalThis.fetch = async (_url, options) => {
    bodies.push(JSON.parse(options!.body as string));
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  };
  render(<LeadForm />);
  fill(); submit();
  await screen.findByRole('heading', { name: 'Your inquiry has been saved' });
  const link = screen.getByRole('link', { name: /Continue in WhatsApp/ });
  assert.match(link.getAttribute('href')!, /wa\.me/);
  assert.match(decodeURIComponent(link.getAttribute('href')!), /Test Business/);
  fireEvent.click(screen.getByRole('button', { name: 'Submit another inquiry' }));
  assert.equal((screen.getByLabelText('Your name or business name *') as HTMLInputElement).value, '');
  fill('Second Business'); submit();
  await screen.findByRole('heading', { name: 'Your inquiry has been saved' });
  assert.equal(bodies.length, 2);
  assert.notEqual(bodies[0].idempotencyKey, bodies[1].idempotencyKey);
  assert.equal(bodies[1].name, 'Second Business');
});

for (const status of [400, 429, 500]) {
  test(`HTTP ${status} retains form values and offers recovery instead of success`, async () => {
    globalThis.fetch = async () => new Response(JSON.stringify({ error: 'Failed', ...(status === 400 ? { fieldErrors: { contactValue: ['Check your WhatsApp number.'] } } : {}) }), { status });
    render(<LeadForm />); fill(); submit();
    await screen.findByRole('alert');
    assert.equal(screen.queryByRole('heading', { name: 'Your inquiry has been saved' }), null);
    assert.equal((screen.getByLabelText('Your name or business name *') as HTMLInputElement).value, 'Test Business');
    assert.ok(screen.getByRole('link', { name: /Continue directly in WhatsApp/ }));
    if (status === 400) assert.equal(screen.getByLabelText('WhatsApp number *').getAttribute('aria-invalid'), 'true');
  });
}

test('network failures can be retried with the same key, preventing duplicate saved leads', async () => {
  const keys: string[] = [];
  globalThis.fetch = async (_url, options) => {
    keys.push(JSON.parse(options!.body as string).idempotencyKey);
    if (keys.length === 1) throw new Error('Network unavailable');
    return new Response(JSON.stringify({ success: true }));
  };
  render(<LeadForm />); fill(); submit();
  await screen.findByRole('alert'); submit();
  await screen.findByRole('heading', { name: 'Your inquiry has been saved' });
  assert.equal(keys.length, 2);
  assert.equal(keys[0], keys[1]);
});

test('double submission sends only one request', async () => {
  let calls = 0;
  let resolve!: (response: Response) => void;
  globalThis.fetch = () => { calls++; return new Promise<Response>((done) => { resolve = done; }); };
  render(<LeadForm />); fill();
  const form = screen.getByRole('button', { name: 'Save inquiry & continue' }).closest('form')!;
  fireEvent.submit(form); fireEvent.submit(form);
  assert.equal(calls, 1);
  await act(async () => resolve(new Response(JSON.stringify({ success: true }))));
});

function PreferenceProbe() {
  const { theme, resolvedTheme, reduceMotion, setTheme, setReduceMotion } = useTheme();
  return <><output data-testid="preferences">{theme}/{resolvedTheme}/{String(reduceMotion)}</output><button onClick={() => setTheme('light')}>Light</button><button onClick={() => setReduceMotion(true)}>Reduce motion</button></>;
}

test('server hydration restores saved preferences and responds to cross-tab changes', async () => {
  localStorage.setItem('datanest-theme', 'dark');
  localStorage.setItem('datanest-reduced-motion', 'true');
  const tree = <ThemeProvider><PreferenceProbe /></ThemeProvider>;
  const container = document.createElement('div'); document.body.appendChild(container);
  container.innerHTML = renderToString(tree);
  let root!: ReturnType<typeof hydrateRoot>;
  await act(async () => { root = hydrateRoot(container, tree); });
  assert.equal(screen.getByTestId('preferences').textContent, 'dark/light/true');
  assert.equal(document.documentElement.dataset.theme, 'light');
  assert.ok(document.documentElement.classList.contains('reduced-motion'));
  await act(async () => {
    localStorage.setItem('datanest-theme', 'light');
    localStorage.setItem('datanest-reduced-motion', 'false');
    window.dispatchEvent(new Event('storage'));
  });
  // The marketing palette stays light while motion preferences remain user-controlled.
  assert.equal(screen.getByTestId('preferences').textContent, 'light/light/false');
  assert.equal(document.documentElement.classList.contains('reduced-motion'), false);
  fireEvent.click(screen.getByRole('button', { name: 'Light' }));
  await act(async () => {
    localStorage.removeItem('datanest-theme');
    window.dispatchEvent(new Event('storage'));
  });
  assert.equal(screen.getByTestId('preferences').textContent, 'system/light/false');
  await act(async () => root.unmount()); container.remove();
});

test('global navbar marks the current page and links Contact to the contact route', () => {
  render(<PathnameContext.Provider value="/pricing"><ThemeProvider><GlobalNavbar /></ThemeProvider></PathnameContext.Provider>);
  assert.equal(
    screen.getByRole('link', { name: /WhatsApp Business API & Pricing/ }).getAttribute('aria-current'),
    'page'
  );
  assert.equal(screen.getByRole('link', { name: 'Contact' }).getAttribute('href'), '/contact');
});

test('bottom navigation marks nested service routes and home links have a predictable destination', () => {
  render(<PathnameContext.Provider value="/services/web-development"><MobileBottomTabs /><SubpageHeaderBar /></PathnameContext.Provider>);
  assert.equal(screen.getByRole('link', { name: 'Services' }).getAttribute('aria-current'), 'page');
  assert.equal(screen.getByRole('link', { name: 'Back to home' }).getAttribute('href'), '/');
});
