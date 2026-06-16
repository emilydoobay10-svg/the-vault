import { useEffect } from 'react';
import { PAGE_META } from './pages';
import { BUSINESS, SITE_NAME, SITE_URL } from './site';

const SCRIPT_ID = 'vault-structured-data';

function buildStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BUSINESS.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.svg`,
      description: BUSINESS.description,
      areaServed: BUSINESS.areaServed.map((name) => ({
        '@type': 'AdministrativeArea',
        name,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      url: SITE_URL,
      description: BUSINESS.description,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'BC',
        addressCountry: 'CA',
      },
      areaServed: {
        '@type': 'State',
        name: 'British Columbia',
      },
      priceRange: 'Free to venue partners',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: PAGE_META.home.description,
      inLanguage: 'en-CA',
    },
  ];
}

export function StructuredData() {
  useEffect(() => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(buildStructuredData());

    return () => {
      script?.remove();
    };
  }, []);

  return null;
}
