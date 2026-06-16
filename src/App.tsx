import { Navigate, Route, Routes } from 'react-router-dom';
import { Nav } from './components/layout/Nav';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ApplyPage } from './pages/ApplyPage';
import { CompliancePage } from './pages/CompliancePage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HardwarePage } from './pages/HardwarePage';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { StructuredData } from './seo/StructuredData';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <StructuredData />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
