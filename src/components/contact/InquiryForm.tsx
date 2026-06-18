import { useCallback, useState, type FormEvent } from 'react';
import { HONEYPOT_FIELD, TURNSTILE_REQUIRED } from '../../lib/formSecurity';
import { submitForm, type SubmitStatus } from '../../lib/submitForm';
import { FormFeedback } from '../ui/FormFeedback';
import { FormProtectionFields } from '../ui/FormProtectionFields';

export function InquiryForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleTurnstileTokenChange = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (TURNSTILE_REQUIRED && !turnstileToken) {
      setErrorMessage('Please complete the security check before submitting.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const result = await submitForm(
      '/api/inquiry',
      {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        message: String(formData.get('message') ?? ''),
        [HONEYPOT_FIELD]: String(formData.get(HONEYPOT_FIELD) ?? ''),
      },
      { turnstileToken },
    );

    if (result.ok) {
      setStatus('success');
      event.currentTarget.reset();
      setTurnstileToken(null);
      return;
    }

    setErrorMessage(result.error);
    setStatus('error');
  };

  const isDisabled = status === 'loading' || status === 'success';
  const canSubmit = !isDisabled && (!TURNSTILE_REQUIRED || Boolean(turnstileToken));

  return (
    <section className="section inquiry-section" id="inquiry">
      <h2 className="cta-title">STILL HAVE QUESTIONS?</h2>
      <p className="cta-sub">Submit your question below — we respond within one business day.</p>
      <form className="apply-form inquiry-form" onSubmit={handleSubmit} noValidate>
        <FormFeedback
          status={status}
          errorMessage={errorMessage}
          successMessage="Inquiry received. Our team will respond within one business day."
        />
        <label className="field-label" htmlFor="inquiry-name">
          Your Name
        </label>
        <input
          id="inquiry-name"
          name="name"
          className="field"
          type="text"
          placeholder="Full name"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="inquiry-email">
          Email
        </label>
        <input
          id="inquiry-email"
          name="email"
          className="field"
          type="email"
          placeholder="you@venue.com"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="inquiry-message">
          Your Question
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          className="field field-textarea"
          placeholder="What would you like to know?"
          rows={4}
          required
          disabled={isDisabled}
        />
        <FormProtectionFields
          disabled={isDisabled}
          onTurnstileTokenChange={handleTurnstileTokenChange}
        />
        <button type="submit" className="submit-btn" disabled={!canSubmit}>
          {status === 'loading' ? 'SUBMITTING...' : status === 'success' ? 'INQUIRY RECEIVED' : 'SUBMIT INQUIRY'}
        </button>
      </form>
    </section>
  );
}
