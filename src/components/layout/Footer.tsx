import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { to: '/hardware', label: 'Hardware' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/compliance', label: 'Compliance' },
  { to: '/faq', label: 'FAQ' },
  { to: '/apply', label: 'Apply Now' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Footer() {
  return (
    <footer>
      <div className="footer-logo">THE VAULT VENDING</div>
      <nav className="footer-links" aria-label="Footer navigation">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="footer-note">© 2026 The Vault Vending Inc. · British Columbia, Canada</div>
      <div className="footer-note" style={{ color: '#444' }}>
        19+ Only · Licensed Hospitality Venues
      </div>
    </footer>
  );
}
