'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { GlobalNavbar } from './GlobalNavbar';
import { Footer } from './Footer';
import { SubpageHeaderBar } from './SubpageHeaderBar';
import { MobileBottomTabs } from './MobileBottomTabs';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div data-page={pathname} className="premium-site relative min-h-screen pb-[calc(6rem+env(safe-area-inset-bottom))] xl:pb-0 bg-transparent text-[var(--color-text-primary)] transition-colors duration-200">
      {/* Apple-style global navbar: transparent at the top, blurs to black on scroll. */}
      <GlobalNavbar />

      {/* Main Responsive Grid Layout */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {isHomePage ? (
          <main id="main-content" className="w-full min-w-0">
            {children}
            <Footer />
          </main>
        ) : (
          <div className="subpage-layout w-full mx-auto">
            {/* Subpages: Marketing news smooth slider & verified button + Universal Back Button */}
            <SubpageHeaderBar />

            <main id="main-content" className="w-full min-w-0">
              {children}
              <Footer />
            </main>
          </div>
        )}
      </div>

      {/* Mobile has no navbar menu — this floating icon dock is the only nav below `xl`. */}
      <MobileBottomTabs />
    </div>
  );
}
