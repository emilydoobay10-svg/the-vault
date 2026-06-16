import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useScrollToApply, useScrollToSectionFromNav } from '../../hooks/useScrollToSection';

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToApply = useScrollToApply();
  const scrollToModel = useScrollToSectionFromNav('hiw');

  return (
    <nav>
      <div className="nav-logo" onClick={() => navigate('/')} role="button" tabIndex={0} onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') navigate('/');
      }}>
        THE VAULT VENDING
      </div>
      <div className="nav-links">
        <NavLink to="/hardware" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Hardware
        </NavLink>
        <button
          type="button"
          className={`nav-text-link${location.pathname === '/' ? ' active' : ''}`}
          onClick={scrollToModel}
        >
          How It Works
        </button>
        <NavLink to="/compliance" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Compliance
        </NavLink>
        <button type="button" className="nav-btn" onClick={scrollToApply}>
          Apply Now
        </button>
      </div>
    </nav>
  );
}
