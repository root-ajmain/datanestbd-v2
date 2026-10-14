'use client';

import { useSearchParams } from 'next/navigation';
import { LeadForm } from './LeadForm';

export function ContactLeadForm() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || undefined;
  const plan = searchParams.get('plan') || undefined;

  return (
    <LeadForm
      initialServiceId={service || 'whatsapp-starter'}
      initialPlanId={plan}
      title="Submit WhatsApp Inquiry"
      subtitle="Save your inquiry below, then continue in WhatsApp to review and send your prepared message."
    />
  );
}
