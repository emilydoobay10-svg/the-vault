import { FEATURES } from '../../data/content';
import { Eyebrow } from '../ui/Eyebrow';

export function Features() {
  return (
    <section className="section">
      <Eyebrow>Features</Eyebrow>
      <div className="section-title">BUILT DIFFERENT</div>
      <div className="feat-grid">
        {FEATURES.map((feature) => (
          <div key={feature.title} className={`feat-card ${feature.variant}`}>
            <div className={`feat-icon${feature.variant === 'pu' ? ' pu' : ''}`}>{feature.icon}</div>
            <div className="feat-title">{feature.title}</div>
            <div className="feat-desc">{feature.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
