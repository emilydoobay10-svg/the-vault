import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site';

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
};

function pageUrl(path: string): string {
  if (path === '/') return SITE_URL;
  return `${SITE_URL}${path}`;
}

export const PAGE_META = {
  home: {
    path: '/',
    title: `${SITE_NAME} — Age-Verified Vape Vending for BC Nightlife`,
    description:
      'Free 19+ verified vape vending machines for licensed BC bars, nightclubs, lounges, and hotels. ID scanning, cashless Nayax payments, and full TVPA compliance — zero cost to your venue.',
    keywords:
      'vape vending machine BC, vape vending British Columbia, nightclub vending machines, age verified vending machines, 19+ vending solutions, smart vending machines for bars and clubs',
  },
  hardware: {
    path: '/hardware',
    title: `Hardware — Smart Vape Vending Machines | ${SITE_NAME}`,
    description:
      'Wall-mount and freestanding vape vending units built for BC nightlife. PDF417 ID verification, Nayax cashless payments, and live telemetry in every machine.',
    keywords:
      'cashless vending machines, smart vending machines for bars and clubs, age verified vending machines, vape vending machines Canada',
  },
  howItWorks: {
    path: '/how-it-works',
    title: `How It Works — Zero-Cost Vape Vending for Venues | ${SITE_NAME}`,
    description:
      'We own the hardware, hold every regulatory filing, and handle operations. Licensed 19+ venues in British Columbia collect a monthly revenue share with no upfront cost.',
    keywords:
      'hospitality vending solutions, premium vending solutions, 19+ vending solutions, vape vending British Columbia',
  },
  compliance: {
    path: '/compliance',
    title: `Compliance — TVPA & 19+ Vending Standards | ${SITE_NAME}`,
    description:
      'Federal, provincial, and municipal compliance for vape vending in BC. TVPA, BCER Notice of Intent, and city business licences — all managed by The Vault, not your venue.',
    keywords:
      'age verified vending machines, vape vending machine BC, TVPA compliant vending, 19+ vending solutions',
  },
  faq: {
    path: '/faq',
    title: `FAQ — Vape Vending for BC Venues | ${SITE_NAME}`,
    description:
      'Answers for nightclub owners, bar operators, and hospitality managers about age-verified vape vending, compliance, revenue share, and deployment in British Columbia.',
    keywords:
      'vape vending machine BC, nightclub vending machines, hospitality vending solutions, vape vending machines Canada',
  },
  apply: {
    path: '/apply',
    title: `Apply Now — Partner With ${SITE_NAME}`,
    description:
      'Apply for a free age-verified vape vending terminal at your licensed 19+ BC venue. Nightclubs, bars, lounges, casinos, hotels, and event spaces welcome.',
    keywords:
      'vape vending British Columbia, smart vending machines for bars and clubs, premium vending solutions, 19+ vending solutions',
  },
  contact: {
    path: '/contact',
    title: `Contact — ${SITE_NAME} British Columbia`,
    description:
      'Get in touch with The Vault Vending about age-verified vape terminals for your licensed BC hospitality venue. Response within one business day.',
    keywords:
      'vape vending machine BC, hospitality vending solutions, premium vending solutions, British Columbia vending',
  },
} as const satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof PAGE_META;

export function getCanonicalUrl(path: string): string {
  return pageUrl(path);
}

export function getOgImage(meta: PageMeta): string {
  return meta.ogImage ?? DEFAULT_OG_IMAGE;
}
