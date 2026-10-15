'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { Logo } from '@/components/design-system/Logo';

const navLinkClass =
  'ds-focus-ring ds-nav-link inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium text-[var(--ds-text-secondary)] transition-colors duration-200 hover:text-[var(--ds-text-primary)] aria-[current=page]:text-[var(--ds-text-primary)] font-[family-name:var(--font-body)]';

/**
 * Floating, not docked to the viewport edge: margin on every side at every
 * breakpoint, rounded on all four corners always (not just a bottom border
 * once scrolled). Mirrors the mobile dock's floating treatment so the two
 * read as one system.
 */
export function GlobalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="premium-nav sticky top-3 z-50 mx-3 sm:top-4 sm:mx-6 lg:mx-auto lg:max-w-7xl"
    >
      <motion.div
        animate={{
          height: scrolled ? 56 : 64,
          backgroundColor: scrolled ? 'rgba(17,37,68,0.82)' : 'rgba(17,37,68,0.55)',
          boxShadow: scrolled
            ? '0 12px 35px -18px rgba(0,4,11,0.55), 0 0 0 1px rgba(130,170,255,0.22)'
            : '0 8px 24px -16px rgba(0,4,11,0.4), 0 0 0 1px rgba(130,170,255,0.16)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex items-center justify-between gap-4 rounded-2xl px-5 backdrop-blur-xl sm:px-6"
      >
        <Logo iconSize={32} />

        <div className="nav-presence" aria-label="DataNest BD is available for new projects">
          <span className="status-dot" aria-hidden="true" />
          <span>ONLINE · DHAKA</span>
        </div>

        {/* Desktop nav — mobile relies entirely on the bottom icon dock, no hamburger/menu here. */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={navLinkClass}>
            Home
          </Link>
          <Link
            href="/pricing"
            aria-current={pathname === '/pricing' ? 'page' : undefined}
            className={navLinkClass}
          >
            <span aria-label="WhatsApp Business API & Pricing">API &amp; Pricing</span>
          </Link>
          <Link
            href="/services"
            aria-current={pathname === '/services' || pathname.startsWith('/services/') ? 'page' : undefined}
            className={navLinkClass}
          >
            Services
          </Link>
          <Link href="/work" aria-current={pathname === '/work' ? 'page' : undefined} className={navLinkClass}>
            Portfolio
          </Link>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined} className={navLinkClass}>
            About us
          </Link>
        </nav>

        <Link
          href="/contact"
          className="ds-focus-ring hidden min-h-10 items-center gap-2 rounded-full bg-[var(--brand)] px-4 text-sm font-semibold text-[var(--ds-text-on-brand)] transition-colors duration-200 hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)] xl:inline-flex font-[family-name:var(--font-body)]"
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
          Contact
        </Link>
      </motion.div>
    </motion.header>
  );
}
