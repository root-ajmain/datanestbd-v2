export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  descriptor: string;
  canonicalOrigin: string;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  contact: {
    email: string;
    whatsappNumber: string;
    whatsappUrl: string;
    supportNote: string;
    meetingPlatforms: string[];
  };
  partner: {
    name: string;
    tier: string;
    since: string;
    credentialUrl: string;
  };
  social: {
    linkedin?: string;
    facebook?: string;
    github?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'DataNest BD',
  legalName: 'DataNest BD Ltd.',
  tagline: 'Build. Automate. Grow 10X Faster.',
  descriptor:
    'Dhaka-based technology & automation agency specializing in Official WhatsApp Business API, conversion-focused web engineering, full-stack SaaS, and custom AI workflows.',
  canonicalOrigin: process.env.NEXT_PUBLIC_SITE_URL || 'https://datanestbd.com',
  location: {
    city: 'Dhaka',
    country: 'Bangladesh',
    timezone: 'Asia/Dhaka',
  },
  contact: {
    email: 'info@datanestbd.com',
    whatsappNumber: '+8801886123456',
    whatsappUrl: 'https://wa.me/8801886123456',
    supportNote: 'No physical office visits. 100% online consultancy via Google Meet & Zoom.',
    meetingPlatforms: ['Google Meet', 'Zoom'],
  },
  partner: {
    name: 'WhatChimp',
    tier: 'Silver Partner',
    since: 'March 2026',
    credentialUrl: 'https://partner.whatchimp.com/credential/datanest-bd/',
  },
  social: {
    linkedin: 'https://linkedin.com/company/datanest-bd',
    facebook: 'https://facebook.com/datanestbd',
  },
};
