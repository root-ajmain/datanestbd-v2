export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'partnership' | 'development' | 'whatsapp';
}

export const generalFaqs: FaqItem[] = [
  {
    category: 'partnership',
    question: 'How is DataNest BD affiliated with WhatChimp?',
    answer:
      'DataNest BD is an independently verified Silver Agency Partner of WhatChimp in Dhaka, Bangladesh (partner since March 2026). You can verify our active credential directly at partner.whatchimp.com/credential/datanest-bd/. We utilize WhatChimp platform technology to implement official WhatsApp solutions for clients.',
  },
  {
    category: 'whatsapp',
    question: 'What is the difference between unofficial WhatsApp tools and the Official Business API?',
    answer:
      'Unofficial tools simulate web sessions on Android phones or emulators, which directly violates Meta terms of service and results in sudden phone number bans. The Official WhatsApp Business Platform connects directly to Meta cloud infrastructure, supporting multi-agent collaboration, verified business profiles, and authorized message templates.',
  },
  {
    category: 'development',
    question: 'How do you ensure high performance and SEO for websites?',
    answer:
      'We use Next.js App Router with server-rendered React components, reduced-motion support, semantic HTML, modern image optimization, and structured JSON-LD data. We test performance on representative devices and networks; technical SEO does not guarantee search rankings.',
  },
  {
    category: 'general',
    question: 'Where is DataNest BD located, and do you work with international clients?',
    answer:
      'We are headquartered in Dhaka, Bangladesh (operating on GMT+6 time) and work with businesses locally across Bangladesh as well as international clients requiring technical engineering and automation support.',
  },
  {
    category: 'development',
    question: 'How are leads stored when visitors submit an inquiry?',
    answer:
      'Inquiries submitted through our forms are durably validated on the server with Zod, saved into a persistent database with transaction guarantees, and queued in an outbox for reliable team notifications with idempotent retry protection.',
  },
];
