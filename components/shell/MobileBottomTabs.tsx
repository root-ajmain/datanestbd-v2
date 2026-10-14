'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Home, MessageSquare, Layers, Briefcase, Users, PhoneCall, type LucideIcon } from 'lucide-react';

interface DockItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Mirrors the desktop menu 1:1: Home, WhatsApp Business API & Pricing,
// Services, Portfolio, About us, Contact.
const items: DockItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Pricing', href: '/pricing', icon: MessageSquare },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'Work', href: '/work', icon: Briefcase },
  { label: 'About', href: '/about', icon: Users },
  { label: 'Contact', href: '/contact', icon: PhoneCall },
];

/**
 * Mobile has no navbar menu at all — this floating neomorphic dock is the
 * only navigation below the `xl` breakpoint, matching exactly where
 * GlobalNavbar's link row disappears so there's never a dead zone.
 */
export function MobileBottomTabs() {
  const pathname = usePathname();
  return (
    <motion.nav
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      aria-label="Primary navigation"
      className="ds-root fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-0 xl:hidden"
    >
      <div className="ds-neomorphic mx-auto flex max-w-md items-center justify-between gap-0.5 rounded-[28px] border border-[var(--ds-border)] px-1.5 py-2">
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
          const isContact = href === '/contact';
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`ds-focus-ring flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-medium transition-colors font-[family-name:var(--font-body)] ${
                /* Label text never goes red at 10px — that's well under the
                   24px/19px-bold floor for AA-compliant red text. Only the
                   icon (a UI element, exempt from the text contrast rule)
                   carries the brand color for the active/contact state. */
                isContact || active ? 'text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-muted)]'
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isContact
                    ? 'bg-[var(--brand)] text-[var(--ds-text-on-brand)]'
                    : active
                      ? 'ds-neomorphic-pressed text-[var(--brand)]'
                      : 'text-[var(--ds-text-muted)]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
