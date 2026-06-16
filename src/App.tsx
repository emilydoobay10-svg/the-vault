import { Navigate, Route, Routes } from 'react-router-dom';
import { Nav } from './components/layout/Nav';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CompliancePage } from './pages/CompliancePage';
import { HardwarePage } from './pages/HardwarePage';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
