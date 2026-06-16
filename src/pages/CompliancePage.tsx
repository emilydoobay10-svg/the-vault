import { CompliancePageContent } from '../components/compliance/CompliancePageContent';
import { PageSeo } from '../seo/PageSeo';

export function CompliancePage() {
  return (
    <main>
      <PageSeo page="compliance" />
      <CompliancePageContent />
    </main>
  );
}
