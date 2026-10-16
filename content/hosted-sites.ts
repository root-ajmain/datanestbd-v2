export interface HostedSite {
  id: string;
  domain: string;
  href: string;
  name: string;
  category: string;
  description: string;
  previewLabel: string;
  status: 'Custom domain';
  accent: 'blue' | 'orange' | 'mint' | 'violet';
}

/**
 * Published custom domains currently visible in the Hostinger account.
 * Temporary hostingersite.com preview addresses are intentionally excluded.
 */
export const hostedSites: HostedSite[] = [
  {
    id: 'datanest-bd',
    domain: 'datanestbd.com',
    href: 'https://datanestbd.com',
    name: 'DataNest BD',
    category: 'Technology & automation',
    description: 'The studio site connecting WhatsApp infrastructure, web engineering and AI workflows.',
    previewLabel: 'Digital systems studio',
    status: 'Custom domain',
    accent: 'blue',
  },
  {
    id: 'luminous-lifestyle',
    domain: 'luminouslifestylebd.com',
    href: 'https://luminouslifestylebd.com',
    name: 'Luminous Lifestyle',
    category: 'E-commerce storefront',
    description: 'A polished commerce experience for browsing collections and converting product interest.',
    previewLabel: 'Commerce experience',
    status: 'Custom domain',
    accent: 'orange',
  },
  {
    id: 'omnikini',
    domain: 'omnikini.com',
    href: 'https://omnikini.com',
    name: 'OmniKini',
    category: 'Fashion commerce',
    description: 'A focused fashion storefront built around a clear product discovery path.',
    previewLabel: 'Fashion storefront',
    status: 'Custom domain',
    accent: 'violet',
  },
  {
    id: 'city-overseas',
    domain: 'cityoverseasbd.com',
    href: 'https://cityoverseasbd.com',
    name: 'City Overseas',
    category: 'Business website',
    description: 'A credibility-first business presence with a direct path from information to enquiry.',
    previewLabel: 'Business presence',
    status: 'Custom domain',
    accent: 'mint',
  },
  {
    id: 'cvfelow',
    domain: 'cvfelow.com',
    href: 'https://cvfelow.com',
    name: 'CV Felow',
    category: 'Career platform',
    description: 'A practical digital product direction for helping people present their professional story.',
    previewLabel: 'Career platform',
    status: 'Custom domain',
    accent: 'blue',
  },
  {
    id: 'fabacs-texyarn',
    domain: 'fabacs-texyarn.com',
    href: 'https://fabacs-texyarn.com',
    name: 'Fabacs Texyarn',
    category: 'Textile & yarn',
    description: 'A structured industrial web presence for a textile-focused business and its buyers.',
    previewLabel: 'Industrial catalogue',
    status: 'Custom domain',
    accent: 'mint',
  },
  {
    id: 'heaven-hotel',
    domain: 'heavenhotelreservation.com',
    href: 'https://heavenhotelreservation.com',
    name: 'Heaven Hotel Reservation',
    category: 'Hospitality booking',
    description: 'A conversion-oriented hospitality interface designed to move guests toward a reservation.',
    previewLabel: 'Booking experience',
    status: 'Custom domain',
    accent: 'orange',
  },
];
