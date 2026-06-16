import { Link, useNavigate } from 'react-router-dom';
import { MachineMini } from '../ui/MachineMini';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-tag">BC&apos;s Automated Vape Concierge</p>
        <h1>
          THE ONLY <span>19+</span>
          <br />
          VERIFIED VAPE
          <br />
          <em>TERMINAL</em> IN BC
        </h1>
        <div className="hero-btns">
          <button type="button" className="btn-pink" onClick={() => navigate('/hardware')}>
            Check Out the Hardware
          </button>
          <Link to="/how-it-works" className="btn-outline">
            How It Works
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-machine-wrap">
          <MachineMini />
        </div>
      </div>
    </section>
  );
}
