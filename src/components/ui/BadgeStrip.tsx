import { BADGES } from '../../data/content';
import { Badge } from './Badge';

export function BadgeStrip() {
  return (
    <div className="badge-strip">
      {BADGES.map((badge) => (
        <Badge key={badge.label} variant={badge.variant} label={badge.label} />
      ))}
    </div>
  );
}
