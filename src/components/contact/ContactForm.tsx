import { useCallback, useState, type FormEvent } from 'react';
import { HONEYPOT_FIELD, TURNSTILE_REQUIRED } from '../../lib/formSecurity';
import { submitForm, type SubmitStatus } from '../../lib/submitForm';
import { FormFeedback } from '../ui/FormFeedback';
import { FormProtectionFields } from '../ui/FormProtectionFields';

export function ContactForm() {
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
      '/api/contact',
      {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        subject: String(formData.get('subject') ?? ''),
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
    <section className="section contact-form-section" id="contact-form">
      <h2 className="section-title">SEND A MESSAGE</h2>
      <p className="section-body">
        Questions about compliance, hardware, or partnering with The Vault? Drop us a line and we will
        respond within one business day.
      </p>
      <form className="apply-form contact-form" onSubmit={handleSubmit} noValidate>
        <FormFeedback
          status={status}
          errorMessage={errorMessage}
          successMessage="Message sent. Our team will respond within one business day."
        />
        <label className="field-label" htmlFor="contact-name">
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          className="field"
          type="text"
          placeholder="Full name"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          className="field"
          type="email"
          placeholder="you@venue.com"
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          className="field"
          type="text"
          placeholder="Partnership question, compliance, etc."
          required
          disabled={isDisabled}
        />
        <label className="field-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="field field-textarea"
          placeholder="How can we help?"
          rows={5}
          required
          disabled={isDisabled}
        />
        <FormProtectionFields
          disabled={isDisabled}
          onTurnstileTokenChange={handleTurnstileTokenChange}
        />
        <button type="submit" className="submit-btn" disabled={!canSubmit}>
          {status === 'loading' ? 'SENDING...' : status === 'success' ? 'MESSAGE SENT' : 'SEND MESSAGE'}
        </button>
      </form>
    </section>
  );
}
