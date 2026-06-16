import { HardwarePageContent } from '../components/hardware/HardwarePageContent';
import { PageSeo } from '../seo/PageSeo';

export function HardwarePage() {
  return (
    <main>
      <PageSeo page="hardware" />
      <HardwarePageContent />
    </main>
  );
}
