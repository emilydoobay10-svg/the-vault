import { useState, type FormEvent } from 'react';
import { VENUE_TYPES } from '../../data/content';
import { FormFeedback } from '../ui/FormFeedback';

type ApplyFormProps = {
  showHeader?: boolean;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ApplyForm({ showHeader = true }: ApplyFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(form);
    const payload = {
      venueName: String(formData.get('venueName') ?? ''),
      contactName: String(formData.get('contactName') ?? ''),
      email: String(formData.get('email') ?? ''),
      venueType: String(formData.get('venueType') ?? ''),
    };

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        setErrorMessage(
          'Submission failed. The server did not respond correctly. Please try again.',
        );
        setStatus('error');
        return;
      }

      let body: unknown;
      try {
        body = await response.json();
      } catch {
        setErrorMessage(
          'Submission failed. The server returned an invalid response. Please try again.',
        );
        setStatus('error');
        return;
      }

      const data = body as { ok?: boolean; error?: string };

      if (response.ok && data.ok === true) {
        setStatus('success');
        form.reset();
        return;
      }

      setErrorMessage(data.error ?? 'Submission failed. Please try again.');
      setStatus('error');
    } catch {
      setErrorMessage('Network error. Check your connection and try again.');
      setStatus('error');
    }
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
