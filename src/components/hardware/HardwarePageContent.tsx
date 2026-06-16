import { useState } from 'react';
import { HARDWARE_UNITS, type HardwareUnitId } from '../../data/content';
import { useScrollToApply } from '../../hooks/useScrollToSection';
import { Eyebrow } from '../ui/Eyebrow';
import { Footer } from '../layout/Footer';
import { UnitPanel } from './UnitPanel';

export function HardwarePageContent() {
  const [activeUnit, setActiveUnit] = useState<HardwareUnitId>('wall');
  const scrollToApply = useScrollToApply();

  return (
    <>
      <div className="hw-header">
        <Eyebrow variant="purple">The Hardware</Eyebrow>
        <div className="hw-title">
          TWO UNITS.
          <br />
          <em>ONE SYSTEM.</em>
        </div>
        <p className="hw-sub">
          Both models run the same compliance stack, payment infrastructure, and real-time monitoring.
          Choose the format that fits your venue.
        </p>
      </div>

      <div className="toggle-bar">
        {(Object.keys(HARDWARE_UNITS) as HardwareUnitId[]).map((unitId) => (
          <button
            key={unitId}
            type="button"
            className={`toggle-btn${activeUnit === unitId ? ' active' : ''}`}
            onClick={() => setActiveUnit(unitId)}
          >
            {HARDWARE_UNITS[unitId].label}
          </button>
        ))}
      </div>

      {(Object.keys(HARDWARE_UNITS) as HardwareUnitId[]).map((unitId) => (
        <UnitPanel key={unitId} unitId={unitId} isActive={activeUnit === unitId} />
      ))}

      <section className="hw-cta">
        <div className="cta-title">READY TO DEPLOY?</div>
        <p className="cta-sub">Zero cost to your venue. Full compliance handled. Revenue share from day one.</p>
        <button type="button" className="btn-pink" onClick={scrollToApply}>
          Apply Now
        </button>
      </section>

      <Footer />
    </>
  );
}
