import { useEffect } from 'react';
import { BadgeStrip } from '../components/ui/BadgeStrip';
import { ApplyForm } from '../components/home/ApplyForm';
import { CompliancePreview } from '../components/home/CompliancePreview';
import { Features } from '../components/home/Features';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { RevenueCalculator } from '../components/home/RevenueCalculator';
import { Footer } from '../components/layout/Footer';
import { Ticker } from '../components/ui/Ticker';
import { PageSeo } from '../seo/PageSeo';

export function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'hiw' || hash === 'apply') {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <main>
      <PageSeo page="home" />
      <BadgeStrip />
      <Hero />
      <Ticker />
      <Features />
      <div className="divider" />
      <HowItWorks />
      <CompliancePreview />
      <div className="divider" />
      <RevenueCalculator />
      <ApplyForm />
      <Footer />
    </main>
  );
}
