import type { Metadata } from 'next';
import './globals.css';
import './premium.css';
import { ThemeProvider } from '@/components/shell/ThemeProvider';
import { ScrollProgress } from '@/components/shell/ScrollProgress';
import { LoadingScreen } from '@/components/shell/LoadingScreen';
import { siteConfig } from '@/content/site';
import { getOrganizationJsonLd, getWebsiteJsonLd, jsonLdString } from '@/lib/seo';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalOrigin),
  title: {
    template: '%s | DataNest BD',
    default: 'DataNest BD | WhatsApp API, AI & Web Development',
  },
  description: siteConfig.descriptor,
  applicationName: siteConfig.name,
  authors: [{ name: 'DataNest BD Team' }],
  creator: 'DataNest BD',
  publisher: 'DataNest BD',
  openGraph: {
    title: 'DataNest BD | WhatsApp API, AI & Web Development',
    description: siteConfig.descriptor,
    url: siteConfig.canonicalOrigin,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataNest BD | WhatsApp API, AI & Web Development',
    description: siteConfig.descriptor,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <a href="#main-content" className="skip-to-content sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <ThemeProvider>
          <LoadingScreen />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
