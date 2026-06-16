import { ApplyForm } from '../components/home/ApplyForm';
import { Footer } from '../components/layout/Footer';
import { Eyebrow } from '../components/ui/Eyebrow';
import { PageSeo } from '../seo/PageSeo';

export function ApplyPage() {
  return (
    <main>
      <PageSeo page="apply" />
      <header className="page-header">
        <Eyebrow>Partner Application</Eyebrow>
        <h1 className="page-title">
          APPLY FOR A
          <br />
          <em>FREE TERMINAL</em>
        </h1>
        <p className="page-sub">
          Licensed 19+ venues in British Columbia — nightclubs, bars, lounges, casinos, hotels, and
          event spaces. We respond within one business day.
        </p>
      </header>
      <ApplyForm showHeader={false} />
      <Footer />
    </main>
  );
}
