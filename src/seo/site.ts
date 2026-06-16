/** Canonical production URL — update if the live domain differs. */
export const SITE_URL = 'https://thevault.co';

export const SITE_NAME = 'The Vault Vending';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

export const BUSINESS = {
  name: 'The Vault Vending Inc.',
  legalName: 'The Vault Vending Inc.',
  region: 'British Columbia',
  country: 'CA',
  areaServed: ['British Columbia', 'Metro Vancouver', 'Canada'],
  description:
    'Premium age-verified vape vending machines for licensed 19+ nightlife and hospitality venues in British Columbia.',
} as const;
