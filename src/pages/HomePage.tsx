import { BadgeStrip } from '../components/ui/BadgeStrip';
import { ApplyForm } from '../components/home/ApplyForm';
import { CompliancePreview } from '../components/home/CompliancePreview';
import { Features } from '../components/home/Features';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { RevenueCalculator } from '../components/home/RevenueCalculator';
import { Footer } from '../components/layout/Footer';
import { Ticker } from '../components/ui/Ticker';

export function HomePage() {
  return (
    <>
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
    </>
  );
}
