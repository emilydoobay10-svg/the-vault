import wallImage from '../../assets/vault-slim-wall.jpg';
import towerImage from '../../assets/vault-slim-tower.jpg';
import { HARDWARE_UNITS, type HardwareUnitId } from '../../data/content';
import { TechBlock } from './TechBlock';

const UNIT_IMAGES: Record<HardwareUnitId, string> = {
  wall: wallImage,
  tower: towerImage,
};

interface UnitPanelProps {
  unitId: HardwareUnitId;
  isActive: boolean;
}

export function UnitPanel({ unitId, isActive }: UnitPanelProps) {
  const unit = HARDWARE_UNITS[unitId];

  return (
    <div className={`unit-panel${isActive ? ' active' : ''}`} id={`panel-${unitId}`}>
      <div className="unit-split">
        <div className="unit-visual">
          <img className="unit-img" src={UNIT_IMAGES[unitId]} alt={unit.imageAlt} />
        </div>
        <div className="unit-info">
          <p className="unit-label">{unit.unitLabel}</p>
          <div className="unit-name">
            {unit.name.split('\n').map((line, index) => (
              <span key={line}>
                {line}
                {index < unit.name.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
          <p className="unit-desc">{unit.description}</p>
          <p className="specs-title">Specifications</p>
          {unit.specs.map((spec) => (
            <div key={spec.key} className="spec-row">
              <span className="spec-key">{spec.key}</span>
              <span className="spec-val">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <TechBlock />
    </div>
  );
}
