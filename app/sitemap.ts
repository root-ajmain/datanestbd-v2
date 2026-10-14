import { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteConfig.canonicalOrigin;
  const lastMod = new Date('2026-10-10T00:00:00Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${origin}/`, lastModified: lastMod, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${origin}/pricing`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${origin}/services`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${origin}/work`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/about`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${origin}/contact`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${origin}/privacy-policy`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${origin}/terms-and-conditions`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${origin}/refund-policy`, lastModified: lastMod, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${origin}/services/${s.slug}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: s.slug === 'whatsapp-api' ? 0.95 : 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${origin}/work/${p.slug}`,
    lastModified: lastMod,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
