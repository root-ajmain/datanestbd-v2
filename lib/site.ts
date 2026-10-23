// Single source of truth for contact data and tracking IDs (brief rule 5).
// content/site.ts imports the contact fields from here — never hard-code a
// wa.me link, tel: number or Pixel ID anywhere else.

export const WHATSAPP_NUMBER = '+8801804277420';
export const WHATSAPP_URL = 'https://wa.me/8801804277420';
export const PHONE_DISPLAY = '+880 1804-277420';
export const EMAIL = 'info@datanestbd.com';

export const SOCIAL = {
  linkedin: 'https://linkedin.com/company/datanest-bd',
  facebook: 'https://facebook.com/datanestbd',
};

export const META_PIXEL_ID = '1155569019851874';
