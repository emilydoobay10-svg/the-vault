import { useState, type FormEvent } from 'react';
import { VENUE_TYPES } from '../../data/content';
import { submitForm, type SubmitStatus } from '../../lib/submitForm';
import { FormFeedback } from '../ui/FormFeedback';

type ApplyFormProps = {
  showHeader?: boolean;
};

export function ApplyForm({ showHeader = true }: ApplyFormProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const result = await submitForm('/api/application', {
      venueName: String(formData.get('venueName') ?? ''),
      contactName: String(formData.get('contactName') ?? ''),
      email: String(formData.get('email') ?? ''),
      venueType: String(formData.get('venueType') ?? ''),
    });

    if (result.ok) {
      setStatus('success');
      event.currentTarget.reset();
      return;
    }

    setErrorMessage(result.error);
    setStatus('error');
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <section className="apply-section" id="apply">
      {showHeader && (
        <>
          <div className="apply-title">DOES YOUR VENUE QUALIFY?</div>
          <p className="apply-sub">19+ licensed venues in BC only. We respond within one business day.</p>
        </>
      )}
      <form className="apply-form" onSubmit={handleSubmit} noValidate>
        <FormFeedback
          status={status}
          errorMessage={errorMessage}
          successMessage="Application received. Our team will respond within one business day."
        />
        <label className="field-label" htmlFor="venue-name">
          Venue Name
        </label>
        <input
          id="venue-name"
          name="venueName"
          className="field"
          type="text"
          placeholder="Club Noir, Vancouver"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="contact-name">
          Your Name
        </label>
        <input
          id="contact-name"
          name="contactName"
          className="field"
          type="text"
          placeholder="Full name"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="field"
          type="email"
          placeholder="you@venue.com"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="venue-type">
          Venue Type
        </label>
        <select
          id="venue-type"
          name="venueType"
          className="field"
          defaultValue={VENUE_TYPES[0]}
          required
          disabled={isDisabled}
        >
          {VENUE_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <button type="submit" className="submit-btn" disabled={isDisabled}>
          {status === 'loading'
            ? 'SUBMITTING...'
            : status === 'success'
              ? 'APPLICATION RECEIVED'
              : 'CHECK ELIGIBILITY'}
        </button>
      </form>
    </section>
  );
}
