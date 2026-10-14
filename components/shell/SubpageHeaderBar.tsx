import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/content/site';

export function SubpageHeaderBar() {
  return <div className="subpage-breadcrumb"><Link href="/" aria-label="Back to home"><ArrowLeft size={14} />Back to home</Link><a href={siteConfig.partner.credentialUrl} target="_blank" rel="noopener noreferrer"><span className="status-dot" />WhatChimp partner<ArrowUpRight size={12} /></a></div>;
}
