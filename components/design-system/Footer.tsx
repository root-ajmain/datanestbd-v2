import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { siteConfig } from '@/content/site';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'WhatsApp Business API', href: '/services/whatsapp-api' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Portfolio', href: '/work' },
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--ds-border)] bg-[var(--surface-1)]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo href={null} />
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ds-text-secondary)] font-[family-name:var(--font-body)]">
              {siteConfig.descriptor}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ds-text-muted)] font-[family-name:var(--font-body)]">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="ds-focus-ring rounded text-sm text-[var(--ds-text-secondary)] transition-colors hover:text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--ds-border)] pt-6 text-xs text-[var(--ds-text-muted)] sm:flex-row sm:items-center sm:justify-between font-[family-name:var(--font-body)]">
          <span>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</span>
          <span>Dhaka, Bangladesh · Official WhatChimp Silver Partner</span>
        </div>
      </div>
    </footer>
  );
}
