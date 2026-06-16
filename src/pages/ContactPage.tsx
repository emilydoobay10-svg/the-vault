import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Eyebrow } from '../components/ui/Eyebrow';
import { PageSeo } from '../seo/PageSeo';

export function ContactPage() {
  return (
    <main>
      <PageSeo page="contact" />
      <header className="page-header">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="page-title">
          TALK TO
          <br />
          <em>THE VAULT</em>
        </h1>
        <p className="page-sub">
          Questions about age-verified vape vending for your licensed BC hospitality venue? Submit an
          application or review our FAQ — our team responds within one business day.
        </p>
      </header>
      <section className="section contact-grid">
        <article className="contact-card">
          <h2 className="contact-card-title">Venue Applications</h2>
          <p className="contact-card-text">
            Ready to deploy a free 19+ verified terminal? Start with our partner application for
            nightclubs, bars, lounges, casinos, and hotels across British Columbia.
          </p>
          <Link to="/apply" className="btn-pink">
            Apply Now
          </Link>
        </article>
        <article className="contact-card">
          <h2 className="contact-card-title">Common Questions</h2>
          <p className="contact-card-text">
            Learn how compliance, age verification, cashless payments, and revenue share work before
            you apply.
          </p>
          <Link to="/faq" className="btn-outline">
            Read FAQ
          </Link>
        </article>
        <article className="contact-card">
          <h2 className="contact-card-title">Service Area</h2>
          <p className="contact-card-text">
            The Vault Vending Inc. serves licensed 19+ hospitality venues in British Columbia,
            launching in Metro Vancouver (YVR) in 2026.
          </p>
          <p className="contact-card-meta">British Columbia, Canada · 19+ Licensed Venues Only</p>
        </article>
      </section>
      <Footer />
    </main>
  );
}
