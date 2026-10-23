'use client';

import React from 'react';
import { trackWhatsAppClick } from '@/lib/analytics';

interface WhatsAppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Identifies which WhatsApp CTA was clicked, e.g. 'contact-direct'. Sent as the Meta Pixel Contact event's content_name. */
  location: string;
}

/** Drop-in replacement for <a> on any WhatsApp CTA — fires a Pixel Contact event on click, then follows the link normally. */
export function WhatsAppLink({ location, onClick, children, ...rest }: WhatsAppLinkProps) {
  return (
    <a
      {...rest}
      onClick={(event) => {
        trackWhatsAppClick(location);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
