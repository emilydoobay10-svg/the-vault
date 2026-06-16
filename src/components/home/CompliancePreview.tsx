import { HOME_COMPLIANCE_ITEMS } from '../../data/content';
import { Eyebrow } from '../ui/Eyebrow';

export function CompliancePreview() {
  return (
    <section className="section">
      <Eyebrow variant="purple">Operating Compliance</Eyebrow>
      <div className="section-title">FULLY COMPLIANT</div>
      <p className="section-body">
        Every Vault terminal operates under full BC regulatory compliance. We file everything before a
        single machine goes live.
      </p>
      <div className="comp-list">
        {HOME_COMPLIANCE_ITEMS.map((item) => (
          <div key={item.title} className="comp-item">
            <div className="comp-dot" />
            <div>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
