// Thin client-side wrapper around the Meta Pixel global, used by every
// WhatsApp CTA and the lead form so event names/params stay consistent.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

export function newEventId(): string {
  return crypto.randomUUID();
}

/** Fire on any WhatsApp button/link click, e.g. trackWhatsAppClick('pricing-growth'). */
export function trackWhatsAppClick(location: string) {
  fbq('track', 'Contact', { content_name: location }, { eventID: newEventId() });
}

export function trackViewContent(contentName: string) {
  fbq('track', 'ViewContent', { content_name: contentName });
}

export function trackLead(params: { contentName: string; value?: number; eventId: string }) {
  fbq(
    'track',
    'Lead',
    { content_name: params.contentName, value: params.value, currency: 'BDT' },
    { eventID: params.eventId }
  );
}
