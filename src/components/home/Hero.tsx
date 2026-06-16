import { useNavigate } from 'react-router-dom';
import { MachineMini } from '../ui/MachineMini';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export function Hero() {
  const navigate = useNavigate();
  const scrollToHiw = useScrollToSection('hiw');

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
          <button type="button" className="btn-outline" onClick={scrollToHiw}>
            How It Works
          </button>
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
