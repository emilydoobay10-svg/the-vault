import { NavLink, useNavigate } from 'react-router-dom';

export function Nav() {
  const navigate = useNavigate();

  return (
    <nav aria-label="Main navigation">
      <div
        className="nav-logo"
        onClick={() => navigate('/')}
        role="button"
        tabIndex={0}
        aria-label="The Vault Vending — Home"
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') navigate('/');
        }}
      >
        THE VAULT VENDING
      </div>
      <div className="nav-links">
        <NavLink to="/hardware" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Hardware
        </NavLink>
        <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          How It Works
        </NavLink>
        <NavLink to="/compliance" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Compliance
        </NavLink>
        <NavLink to="/faq" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          FAQ
        </NavLink>
        <NavLink to="/apply" className="nav-btn">
          Apply Now
        </NavLink>
      </div>
    </nav>
  );
}
