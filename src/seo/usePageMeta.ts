import { useEffect } from 'react';
import { getCanonicalUrl, getOgImage, type PageMeta } from './pages';
import { SITE_NAME, SITE_URL } from './site';

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): HTMLMetaElement {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
  return element;
}

function upsertLink(rel: string, href: string): HTMLLinkElement {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
  return element;
}

export function usePageMeta(meta: PageMeta): void {
  useEffect(() => {
    const canonical = getCanonicalUrl(meta.path);
    const ogImage = getOgImage(meta);

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');

    if (meta.keywords) {
      upsertMeta('name', 'keywords', meta.keywords);
    }

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_CA');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertLink('canonical', canonical);

    return () => {
      document.title = `${SITE_NAME} — Age-Verified Vape Vending for BC Nightlife`;
      upsertMeta('name', 'description', PAGE_META_FALLBACK.description);
      upsertLink('canonical', SITE_URL);
    };
  }, [meta]);
}

const PAGE_META_FALLBACK = {
  description:
    'Free 19+ verified vape vending machines for licensed BC bars, nightclubs, lounges, and hotels. ID scanning, cashless Nayax payments, and full TVPA compliance.',
};
