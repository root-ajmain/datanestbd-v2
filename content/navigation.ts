export interface NavItem {
  id: string;
  label: string;
  href: string;
  iconName?: string;
}

export const homeSections: NavItem[] = [
  { id: 'overview', label: 'Overview', href: '/#overview', iconName: 'Home' },
  { id: 'services', label: 'Services', href: '/#services', iconName: 'Grid' },
  { id: 'whatsapp', label: 'WhatsApp API', href: '/#whatsapp', iconName: 'MessageSquare' },
  { id: 'work', label: 'Selected Work', href: '/#work', iconName: 'Layers' },
  { id: 'process', label: 'Process', href: '/#process', iconName: 'CheckCircle' },
  { id: 'technology', label: 'Technology', href: '/#technology', iconName: 'Cpu' },
  { id: 'about', label: 'About Agency', href: '/#about', iconName: 'Building' },
  { id: 'faq', label: 'FAQ', href: '/#faq', iconName: 'HelpCircle' },
  { id: 'contact', label: 'Inquiry', href: '/#contact', iconName: 'Send' },
];

export const primaryLinks: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'whatsapp-pricing', label: 'WhatsApp Official API', href: '/pricing' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'work', label: 'Portfolio', href: '/work' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'WhatsApp Contact', href: '/contact' },
];

export const legalLinks: NavItem[] = [
  { id: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
  { id: 'terms', label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { id: 'refund', label: 'Refund Policy', href: '/refund-policy' },
];
