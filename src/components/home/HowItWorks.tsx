import { HOW_IT_WORKS_STEPS } from '../../data/content';
import { Eyebrow } from '../ui/Eyebrow';

export function HowItWorks() {
  return (
    <section className="section-alt" id="hiw">
      <Eyebrow>How It Works</Eyebrow>
      <div className="section-title">THE MODEL</div>
      <p className="section-body">
        The Vault places age-verified vapour vending machines inside 19+ licensed venues across Metro
        Vancouver. We own the hardware. We hold the regulatory filings. We handle restocking, signage,
        and tax remittance. Venues provide the floor space and the 19+ environment.
      </p>
      <div className="hiw-steps">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <div key={step.number} className="hiw-step">
            <div className={`step-num ${step.variant}`}>{step.number}</div>
            <div className="step-body">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="venue-callout">
        <div className="callout-label">Bottom Line</div>
        <div className="callout-text">
          Your venue does <span>nothing</span> except collect a revenue share.
        </div>
      </div>
    </section>
  );
}
