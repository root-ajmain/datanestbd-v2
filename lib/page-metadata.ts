import type { Metadata } from 'next';
import pages from '@/content/seo-pages.json';
import { siteConfig } from '@/content/site';

export function getPageContent(path: string) {
  const page = pages.find((item) => item.path === path);
  if (!page) throw new Error(`Missing SEO content for ${path}`);
  return page;
}

export function getPageMetadata(path: string): Metadata {
  const page = getPageContent(path);
  const url = new URL(path, siteConfig.canonicalOrigin).toString();
  return {
    // Each editorial title includes the brand once; bypass the root template.
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: { index: page.index, follow: true },
    openGraph: {
      type: 'website', title: page.title, description: page.description,
      url, siteName: siteConfig.name, locale: 'en_BD',
    },
    twitter: { card: 'summary', title: page.title, description: page.description },
  };
}
