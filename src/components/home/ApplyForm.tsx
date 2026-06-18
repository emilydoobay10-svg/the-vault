import { useCallback, useState, type FormEvent } from 'react';
import { VENUE_TYPES } from '../../data/content';
import { HONEYPOT_FIELD, TURNSTILE_REQUIRED } from '../../lib/formSecurity';
import { submitForm, type SubmitStatus } from '../../lib/submitForm';
import { FormFeedback } from '../ui/FormFeedback';
import { FormProtectionFields } from '../ui/FormProtectionFields';

type ApplyFormProps = {
  showHeader?: boolean;
};

const SUBMIT_ERROR_MESSAGE = 'Submission failed. Please try again.';

function toSubmitErrorMessage(value: unknown): string {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || SUBMIT_ERROR_MESSAGE;
  }
  return SUBMIT_ERROR_MESSAGE;
}

export function ApplyForm({ showHeader = true }: ApplyFormProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleTurnstileTokenChange = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (TURNSTILE_REQUIRED && !turnstileToken) {
      setErrorMessage('Please complete the security check before submitting.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const formData = new FormData(form);
      const result = await submitForm(
        '/api/application',
        {
          venueName: String(formData.get('venueName') ?? ''),
          contactName: String(formData.get('contactName') ?? ''),
          email: String(formData.get('email') ?? ''),
          venueType: String(formData.get('venueType') ?? ''),
          [HONEYPOT_FIELD]: String(formData.get(HONEYPOT_FIELD) ?? ''),
        },
        { turnstileToken },
      );

      if (result.ok) {
        setStatus('success');
        form.reset();
        setTurnstileToken(null);
        return;
      }

      setErrorMessage(toSubmitErrorMessage(result.error));
      setStatus('error');
    } catch {
      setErrorMessage(SUBMIT_ERROR_MESSAGE);
      setStatus('error');
    }
  };

  const isDisabled = status === 'loading' || status === 'success';
  const canSubmit = !isDisabled && (!TURNSTILE_REQUIRED || Boolean(turnstileToken));

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
        <FormProtectionFields
          disabled={isDisabled}
          onTurnstileTokenChange={handleTurnstileTokenChange}
        />
        <button type="submit" className="submit-btn" disabled={!canSubmit}>
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
