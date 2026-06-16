import { useState, type FormEvent } from 'react';
import { VENUE_TYPES } from '../../data/content';

type ApplyFormProps = {
  showHeader?: boolean;
};

export function ApplyForm({ showHeader = true }: ApplyFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="apply-section" id="apply">
      {showHeader && (
        <>
          <div className="apply-title">DOES YOUR VENUE QUALIFY?</div>
          <p className="apply-sub">19+ licensed venues in BC only. We respond within one business day.</p>
        </>
      )}
      <form className="apply-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="venue-name">
          Venue Name
        </label>
        <input
          id="venue-name"
          className="field"
          type="text"
          placeholder="Club Noir, Vancouver"
          required
        />
        <label className="field-label" htmlFor="contact-name">
          Your Name
        </label>
        <input id="contact-name" className="field" type="text" placeholder="Full name" required />
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input id="email" className="field" type="email" placeholder="you@venue.com" required />
        <label className="field-label" htmlFor="venue-type">
          Venue Type
        </label>
        <select id="venue-type" className="field" defaultValue={VENUE_TYPES[0]} required>
          {VENUE_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <button type="submit" className="submit-btn">
          {submitted ? 'APPLICATION RECEIVED' : 'CHECK ELIGIBILITY'}
        </button>
      </form>
    </section>
  );
}
