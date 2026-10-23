import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/design-system/Logo';
import { legalLinks } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { services } from '@/content/services';
import { WhatsAppLink } from '@/components/analytics/WhatsAppLink';

export function Footer() {
  return <footer className="new-footer">
    <div className="footer-top"><div><Logo /><p>Good technology.<br />A little less friction.<br />A lot more possibility.</p><span>Dhaka, Bangladesh · Working together, online.</span></div><div className="footer-links"><span className="eyebrow">Explore</span>{[['Services','/services'],['API & pricing','/pricing'],['Reference work','/work'],['Our story','/about'],['Let’s talk','/contact']].map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={13} /></Link>)}</div><div className="footer-connect"><span className="eyebrow">Start a conversation</span><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}<ArrowUpRight size={17} /></a><a href={`tel:${siteConfig.contact.whatsappNumber}`}>{siteConfig.contact.phoneDisplay}<ArrowUpRight size={17} /></a><WhatsAppLink location="footer" href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat on WhatsApp<ArrowUpRight size={17} /></WhatsAppLink><p>Consultations via Google Meet & Zoom.<br />Technology built around your business.</p><a className="footer-partner" href={siteConfig.partner.credentialUrl} target="_blank" rel="noopener noreferrer"><span className="status-dot" />WhatChimp Silver Partner<ArrowUpRight size={12} /></a></div></div>
    <details className="footer-services"><summary>Explore all our services</summary><div>{services.map(service => <Link key={service.id} href={`/services/${service.slug}`}>{service.title}</Link>)}</div></details>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.legalName}</span><div>{legalLinks.map(link => <Link key={link.id} href={link.href}>{link.label}</Link>)}</div><a href="#main-content">Back to top ↑</a></div>
  </footer>;
}
