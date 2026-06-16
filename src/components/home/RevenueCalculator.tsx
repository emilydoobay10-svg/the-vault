import { useRevenueCalculator } from '../../hooks/useRevenueCalculator';
import { Eyebrow } from '../ui/Eyebrow';

export function RevenueCalculator() {
  const { values, labels, result, setGroupSize, setSpendPerPerson, setGroupsLeaving } =
    useRevenueCalculator();

  return (
    <section className="section-alt">
      <Eyebrow variant="purple">Revenue Calculator</Eyebrow>
      <div className="section-title">HOW MUCH ARE YOU LOSING?</div>
      <p className="section-body">
        Groups leave your venue to find vapes. Strategic placement keeps them on-site — and drinking.
      </p>
      <div className="calc-panel">
        <div className="calc-header">REVENUE LEAKAGE CALCULATOR</div>
        <div className="slider-row">
          <div className="slider-label">
            <span>Avg Group Size</span>
            <span className="slider-val">{labels.groupSize}</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={1}
            value={values.groupSize}
            onChange={(event) => setGroupSize(Number(event.target.value))}
          />
        </div>
        <div className="slider-row">
          <div className="slider-label">
            <span>Avg Spend / Person / Hr</span>
            <span className="slider-val">{labels.spendPerPerson}</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={values.spendPerPerson}
            onChange={(event) => setSpendPerPerson(Number(event.target.value))}
          />
        </div>
        <div className="slider-row">
          <div className="slider-label">
            <span>Groups Leaving Early / Night</span>
            <span className="slider-val">{labels.groupsLeaving}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={values.groupsLeaving}
            onChange={(event) => setGroupsLeaving(Number(event.target.value))}
          />
        </div>
        <div className="calc-output">
          <div>
            <div className="output-label">Estimated Revenue Leakage</div>
            <div className="output-sub">per night</div>
          </div>
          <div className="output-num">${result.toLocaleString()}</div>
        </div>
      </div>
    </section>
  );
}
