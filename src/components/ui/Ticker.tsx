import { TICKER_ITEMS } from '../../data/content';

export function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
