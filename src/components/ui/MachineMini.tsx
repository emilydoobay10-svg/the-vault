import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  colors: [string, string, string];
  round?: boolean;
};

const PRODUCTS: Product[] = [
  { id: 'g1', name: 'ELFBAR', price: '29.99', colors: ['#cc44ff', '#7722aa', '#aa33dd'] },
  { id: 'g2', name: 'L.MARY', price: '31.99', colors: ['#ffd93d', '#ff6b35', '#cc3300'] },
  { id: 'g3', name: 'GEEKBAR', price: '32.99', colors: ['#6bcb77', '#2d8a3e', '#119933'] },
  { id: 'g4', name: 'VFEEL', price: '33.99', colors: ['#ff6bb5', '#ff2d78', '#cc0044'] },
  { id: 'g5', name: 'KODAK', price: '35.99', colors: ['#4d96ff', '#0044cc', '#0066cc'] },
  { id: 'g6', name: 'SNUS', price: '34.99', colors: ['#e0e0e0', '#999', '#888'], round: true },
];

const PHASES = [
  { key: 'scan', label: 'SCAN YOUR ID', duration: 2400 },
  { key: 'verified', label: '19+ VERIFIED', duration: 1400 },
  { key: 'select', label: 'SELECT PRODUCT', duration: 2200 },
  { key: 'pay', label: 'TAP TO PAY', duration: 1600 },
  { key: 'dispense', label: 'DISPENSING...', duration: 2000 },
] as const;

type PhaseKey = (typeof PHASES)[number]['key'];

function ProductIcon({
  gradientId,
  colors,
  round,
}: {
  gradientId: string;
  colors: [string, string, string];
  round?: boolean;
}) {
  if (round) {
    return (
      <svg width="22" height="32" viewBox="0 0 36 52" aria-hidden="true">
        <ellipse cx="18" cy="10" rx="10" ry="10" fill={`url(#${gradientId})`} />
        <rect x="12" y="18" width="12" height="26" rx="3" fill={colors[2]} />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg width="22" height="32" viewBox="0 0 36 52" aria-hidden="true">
      <rect x="11" y="1" width="14" height="4" rx="2" fill={colors[0]} />
      <rect x="8" y="5" width="20" height="36" rx="5" fill={`url(#${gradientId})`} />
      <rect x="10" y="37" width="16" height="11" rx="4" fill={colors[2]} />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MachineMini() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const phase = PHASES[phaseIndex];
  const phaseKey = phase.key as PhaseKey;
  const activeProduct = PRODUCTS[selectedProduct];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPhaseIndex((current) => {
        const next = (current + 1) % PHASES.length;

        if (PHASES[next].key === 'select') {
          setSelectedProduct((product) => (product + 1) % PRODUCTS.length);
        }

        return next;
      });
    }, phase.duration);

    return () => window.clearTimeout(timer);
  }, [phaseIndex, phase.duration]);

  return (
    <div className={`machine-mini machine-mini--${phaseKey}`} aria-label="Animated Vault vending machine demo">
      <div className="machine-mini-body">
        <div className="edge-l" />
        <div className="edge-r" />
        <div className="mini-glow" />

        <div className="mini-screen">
          <div className="mini-top">
            <div className="mini-logo">
              THE <span>VAULT</span>
            </div>
            <div className="mini-sub">Premium Vending Experience</div>
            <div className="mini-status">{phase.label}</div>
          </div>

          <div className="mini-prods">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                className={`mini-prod${phaseKey === 'select' && index === selectedProduct ? ' mini-prod--active' : ''}${phaseKey === 'dispense' && index === selectedProduct ? ' mini-prod--dispensed' : ''}`}
              >
                <ProductIcon gradientId={product.id} colors={product.colors} round={product.round} />
                <div className="mini-price">${product.price}</div>
                <div className="mini-name">{product.name}</div>
              </div>
            ))}
          </div>

          <div className="mini-bot">
            <span className="mini-bot-age">19+</span>
            <span className="mini-bot-note">ID Required</span>
          </div>
        </div>

        <div className="mini-machine-bot">
          <div className="mini-v">
            <div className="mini-vt">V</div>
            <div className="mini-scan-beam" />
          </div>
          <div className="mini-id">
            ID Scan
            <span className="mini-id-pulse" />
          </div>
        </div>

        <div className="mini-dispense-slot">
          <div className="mini-dispense-item">
            <ProductIcon
              gradientId={`dispense-${activeProduct.id}`}
              colors={activeProduct.colors}
              round={activeProduct.round}
            />
          </div>
        </div>

        <div className="mini-foot">
          <div className="mini-domain">THEVAULT.CO</div>
        </div>
      </div>

      <div className="mini-age">
        <div className="mini-age-num">19+</div>
        <div className="mini-age-div" />
        <div className="mini-age-txt">
          Government ID
          <br />
          Required
        </div>
      </div>
    </div>
  );
}
