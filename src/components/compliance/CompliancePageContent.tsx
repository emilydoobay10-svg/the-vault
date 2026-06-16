import { COMPLIANCE_REGIMES } from '../../data/content';
import { Eyebrow } from '../ui/Eyebrow';
import { Footer } from '../layout/Footer';
import { CompliancePill } from './CompliancePill';

function RegimeText({ text }: { text: string }) {
  const parts = text.split('**');

  return (
    <p className="regime-text">
      {parts.map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
      )}
    </p>
  );
}

export function CompliancePageContent() {
  return (
    <>
      <header className="page-header">
        <Eyebrow variant="purple">Compliance Framework</Eyebrow>
        <div className="page-title">
          THREE LEVELS.
          <br />
          ONE STANDARD.
        </div>
        <p className="page-sub">
          Every Vault terminal operates under a layered compliance framework — federal, provincial, and
          municipal. We hold every filing. Your venue holds zero regulatory burden.
        </p>
      </header>

      <div className="regime-list">
        {COMPLIANCE_REGIMES.map((regime) => (
          <article key={regime.number} className="regime">
            <div className="regime-top">
              <div className="regime-num">{regime.number}</div>
              <div>
                <div className="regime-level">{regime.level}</div>
                <div className="regime-name">
                  {regime.name.split(' — ')[0]}
                  {regime.name.includes(' — ') && (
                    <>
                      {' '}
                      — <em>{regime.name.split(' — ')[1]}</em>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="regime-body">
              <div className="regime-act">{regime.act}</div>
              <RegimeText text={regime.text} />
              <div className="regime-pills">
                {regime.pills.map((pill) => (
                  <CompliancePill key={pill.label} variant={pill.variant} label={pill.label} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="indemnity-block">
        <div className="indemnity-label">Venue Protection</div>
        <div className="indemnity-title">ZERO REGULATORY LIABILITY</div>
        <p className="indemnity-text">
          The Vault Vending Inc. holds all regulatory filings, retail authorizations, and compliance
          obligations. Your venue provides floor space in a <strong>19+ licensed environment</strong> —
          nothing else. All enforcement contact, reporting, and remediation sits with us.
        </p>
      </section>

      <section className="disclaimer">
        <p className="disclaimer-text">
          The Vault terminals sell vapour products restricted to adults 19 years of age and older in
          British Columbia. Products comply with the Tobacco and Vapour Products Control Act, E-Substances
          Regulation, and applicable municipal bylaws.
        </p>
      </section>

      <Footer />
    </>
  );
}
