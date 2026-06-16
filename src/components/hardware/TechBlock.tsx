import { TECH_ITEMS } from '../../data/content';

export function TechBlock() {
  return (
    <div className="tech-block">
      <div className="tech-title">WHAT&apos;S INSIDE</div>
      <p className="tech-sub">
        Enterprise-grade hardware and software — the same infrastructure used in high-volume retail,
        built for nightlife.
      </p>
      <div className="tech-list">
        {TECH_ITEMS.map((item) => (
          <div key={item.title} className={`tech-item${item.variant === 'pk' ? ' pk' : ''}`}>
            <div className={`tech-icon${item.variant === 'pk' ? ' pk' : ''}`}>{item.icon}</div>
            <div>
              <div className={`tech-item-tag${item.variant === 'pk' ? ' pk' : ''}`}>{item.tag}</div>
              <div className="tech-item-title">{item.title}</div>
              <div className="tech-item-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
