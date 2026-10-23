import { z } from 'zod';

export const leadSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  contactMethod: z.enum(['whatsapp', 'email'], {
    message: 'Please choose either WhatsApp or Email',
  }),
  contactValue: z
    .string()
    .trim()
    .min(3, { message: 'Please provide valid contact information' })
    .max(150, { message: 'Contact details too long' }),
  serviceId: z
    .string()
    .trim()
    .min(1, { message: 'Please select a service' }),
  planId: z.string().trim().max(100).optional(),
  context: z
    .string()
    .trim()
    .max(2000, { message: 'Context cannot exceed 2000 characters' })
    .optional(),
  inquiryAcknowledged: z.literal(true, {
    message: 'You must acknowledge that DataNest BD may contact you regarding this inquiry',
  }),
  marketingOptIn: z.boolean().optional().default(false),
  idempotencyKey: z
    .string()
    .trim()
    .min(10, { message: 'Idempotency key required' })
    .max(128),
  sourcePage: z.string().trim().max(256).optional().default('/'),
  // Matches the eventID the browser sends to the Meta Pixel's Lead event, so a
  // later server-side Conversions API call for this lead can deduplicate against it.
  pixelEventId: z.string().trim().max(64).optional(),
  utmSource: z.string().trim().max(128).optional(),
  utmMedium: z.string().trim().max(128).optional(),
  utmCampaign: z.string().trim().max(128).optional(),
}).refine(
  (data) => {
    if (data.contactMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(data.contactValue);
    }
    if (data.contactMethod === 'whatsapp') {
      // Validate phone number: at least 7 digits, optional leading +
      const phoneDigits = data.contactValue.replace(/\D/g, '');
      return phoneDigits.length >= 7 && phoneDigits.length <= 15;
    }
    return true;
  },
  {
    message: 'Please enter a valid email address or phone number for WhatsApp',
    path: ['contactValue'],
  }
);

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

// Lead record stored for a contact/inquiry form submission
export interface LeadRecord {
  id: string;
  submissionKey: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  contactMethod: 'whatsapp' | 'email';
  contactValue: string;
  serviceId: string;
  planId?: string;
  context?: string;
  inquiryAcknowledged: boolean;
  marketingOptIn: boolean;
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  pixelEventId?: string;
  processingStatus: 'received' | 'in_review' | 'contacted' | 'archived';
}
