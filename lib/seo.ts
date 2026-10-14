import { siteConfig } from '@/content/site';

// Escapes '<' so a string value containing "</script>" can never break out
// of the inline JSON-LD <script> tag it's serialized into (the standard
// mitigation Next.js/Vercel recommend for dangerouslySetInnerHTML + JSON).
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getOrganizationJsonLd() {
  const origin = siteConfig.canonicalOrigin;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: origin,
    logo: `${origin}/images/datanest-logo-mark.png`,
    description: siteConfig.descriptor,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      contactType: 'customer support',
      availableLanguage: ['English', 'Bengali'],
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.partner.credentialUrl,
    ].filter(Boolean),
  };
}

export function getWebsiteJsonLd() {
  const origin = siteConfig.canonicalOrigin;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: siteConfig.name,
    description: siteConfig.descriptor,
    publisher: {
      '@id': `${origin}/#organization`,
    },
    inLanguage: 'en',
  };
}

export function getServiceJsonLd(service: {
  title: string;
  shortOutcome: string;
  slug: string;
}) {
  const origin = siteConfig.canonicalOrigin;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    description: service.shortOutcome,
    provider: {
      '@id': `${origin}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    url: `${origin}/services/${service.slug}`,
  };
}

export function getBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
