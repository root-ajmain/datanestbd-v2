/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/content/site';

/**
 * Official verified WhatChimp badge component supporting Light and Dark modes
 * directly as provided by WhatChimp API.
 */
export function OfficialWhatChimpBadge({
  height = 56,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  return (
    <a
      href="https://partner.whatchimp.com/credential/datanest-bd/"
      target="_blank"
      rel="noopener noreferrer"
      title="DataNest BD is an official WhatChimp partner. Click to see their partner credential, checked live by WhatChimp."
      className={`inline-block transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange-600)] rounded-xl ${className}`}
    >
      {/* Light theme badge */}
      <img
        src="https://agency-api.whatchimp.com/api/partners/datanest-bd/badge.svg"
        alt="DataNest BD is a WhatChimp partner"
        title="DataNest BD is an official WhatChimp partner. Click to see their partner credential, checked live by WhatChimp."
        height={height}
        style={{ height: `${height}px` }}
        className="block dark:hidden w-auto object-contain max-h-[64px]"
        referrerPolicy="no-referrer"
      />
      {/* Dark theme badge */}
      <img
        src="https://agency-api.whatchimp.com/api/partners/datanest-bd/badge.svg?style=dark"
        alt="DataNest BD is a WhatChimp partner"
        title="DataNest BD is an official WhatChimp partner. Click to see their partner credential, checked live by WhatChimp."
        height={height}
        style={{ height: `${height}px` }}
        className="hidden dark:block w-auto object-contain max-h-[64px]"
        referrerPolicy="no-referrer"
      />
    </a>
  );
}

export function WhatChimpProofBadge({
  className = '',
  glass = false,
}: {
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${
        glass
          ? 'border border-white/60 dark:border-white/10 bg-white/65 dark:bg-white/[0.04] backdrop-blur-md p-3 sm:p-3.5 shadow-xs'
          : 'border border-[var(--grey-200)] dark:border-[var(--color-border)] bg-[var(--white)] dark:bg-[var(--navy-600)] p-4 shadow-xs'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2.5">
        {/* Official Verified Badge */}
        <OfficialWhatChimpBadge height={48} />

        <div className="flex flex-col justify-center text-right sm:text-left">
          <div className="flex items-center justify-end sm:justify-start gap-1.5 text-xs text-[var(--navy-400)] dark:text-[#C7D4DB]">
            <ShieldCheck className="h-4 w-4 text-[var(--red-700)] dark:text-[var(--orange-500)] shrink-0" />
            <span className="font-semibold text-[var(--navy-900)] dark:text-[var(--white)]">Live Verified</span>
          </div>
          <div className="text-[11px] text-[var(--navy-400)] dark:text-[#C7D4DB]">
            Official Partner · March 2026
          </div>
        </div>
      </div>

      <div className={`mt-2.5 pt-2.5 border-t ${
        glass
          ? 'border-white/40 dark:border-white/10'
          : 'border-[var(--grey-200)] dark:border-[var(--color-border)]'
      } flex items-center justify-between text-xs`}>
        <span className="text-[var(--navy-400)] dark:text-[#C7D4DB] text-[11px]">Dhaka, BD</span>
        <a
          href="https://partner.whatchimp.com/credential/datanest-bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn text-[11px] py-1 px-2.5 rounded-lg inline-flex items-center gap-1 hover:scale-105 active:scale-95"
          title="Verify DataNest BD credential on WhatChimp official partner directory"
        >
          <span>Verify Credential</span>
          <ExternalLink className="h-3 w-3 text-[var(--red-700)] dark:text-[var(--orange-500)]" />
        </a>
      </div>
    </div>
  );
}

export function DataNestLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/datanest-logo-mark.png"
        alt=""
        width={36}
        height={36}
        className="shrink-0 object-contain"
        style={{ width: 36, height: 36 }}
      />
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight tracking-tight text-[var(--navy-900)] dark:text-[var(--white)]">
          DataNest<span className="text-[var(--red-700)] dark:text-[var(--orange-500)]">.BD</span>
        </span>
        <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--navy-400)] dark:text-[#C7D4DB]">
          Official Partner
        </span>
      </div>
    </div>
  );
}
