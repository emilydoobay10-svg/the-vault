import { PAGE_META, type PageKey } from './pages';
import { usePageMeta } from './usePageMeta';

type PageSeoProps = {
  page: PageKey;
};

export function PageSeo({ page }: PageSeoProps) {
  usePageMeta(PAGE_META[page]);
  return null;
}
