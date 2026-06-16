import { useEffect } from 'react';
import { FAQ_ITEMS } from '../data/content';

const SCRIPT_ID = 'vault-faq-structured-data';

export function FaqStructuredData() {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
