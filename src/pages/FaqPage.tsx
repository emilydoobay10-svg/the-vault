import { Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../data/content';
import { Footer } from '../components/layout/Footer';
import { Eyebrow } from '../components/ui/Eyebrow';
import { FaqStructuredData } from '../seo/FaqStructuredData';
import { PageSeo } from '../seo/PageSeo';

export function FaqPage() {
  return (
    <main>
      <PageSeo page="faq" />
      <FaqStructuredData />
      <header className="page-header">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="page-title">
          QUESTIONS FROM
          <br />
          <em>BC VENUE OWNERS</em>
        </h1>
        <p className="page-sub">
          Common questions about age-verified vape vending, compliance, and partnering with The Vault
          in British Columbia.
        </p>
      </header>
      <section className="faq-list" aria-label="Frequently asked questions">
        {FAQ_ITEMS.map((item) => (
          <article key={item.question} className="faq-item">
            <h2 className="faq-question">{item.question}</h2>
            <p className="faq-answer">{item.answer}</p>
          </article>
        ))}
      </section>
      <section className="section hw-cta">
        <h2 className="cta-title">STILL HAVE QUESTIONS?</h2>
        <p className="cta-sub">Reach out or submit an application — we respond within one business day.</p>
        <div className="hero-btns" style={{ justifyContent: 'center' }}>
          <Link to="/contact" className="btn-outline">
            Contact Us
          </Link>
          <Link to="/apply" className="btn-pink">
            Apply Now
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
