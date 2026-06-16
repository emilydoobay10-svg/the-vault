import { Link } from 'react-router-dom';
import { HowItWorks } from '../components/home/HowItWorks';
import { Features } from '../components/home/Features';
import { Footer } from '../components/layout/Footer';
import { Eyebrow } from '../components/ui/Eyebrow';
import { PageSeo } from '../seo/PageSeo';

export function HowItWorksPage() {
  return (
    <main>
      <PageSeo page="howItWorks" />
      <header className="page-header">
        <Eyebrow>How It Works</Eyebrow>
        <h1 className="page-title">
          SMART VAPE VENDING
          <br />
          <em>FOR BC HOSPITALITY</em>
        </h1>
        <p className="page-sub">
          Nightclub owners, bar operators, and hotel managers partner with The Vault for age-verified,
          cashless vape vending — with zero hardware cost and zero regulatory burden on your venue.
        </p>
      </header>
      <HowItWorks />
      <Features />
      <section className="section hw-cta">
        <h2 className="cta-title">READY TO PARTNER?</h2>
        <p className="cta-sub">
          Free terminals for licensed 19+ venues across British Columbia. Revenue share from day one.
        </p>
        <Link to="/apply" className="btn-pink">
          Apply Now
        </Link>
      </section>
      <Footer />
    </main>
  );
}
