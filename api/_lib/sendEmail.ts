import { render } from '@react-email/render';
import { Resend } from 'resend';
import type { ReactElement } from 'react';
import { getSafeEmailErrorMessage, resolveResendConfig } from './resendConfig';

export const RECIPIENT_EMAIL = 'thevaultvendr@gmail.com';

export async function sendFormEmail(subject: string, template: ReactElement): Promise<void> {
  const { apiKey, from } = resolveResendConfig();

  console.log('[sendFormEmail] sending', {
    to: RECIPIENT_EMAIL,
    from,
    subject,
  });

  let html: string;
  try {
    html = await render(template);
  } catch (renderError) {
    console.error('[sendFormEmail] template render failed:', renderError);
    throw new Error('Failed to prepare email content.');
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: RECIPIENT_EMAIL,
    subject,
    html,
  });

  if (error) {
    console.error('[sendFormEmail] Resend API error:', error);
    throw new Error(error.message);
  }

  console.log('[sendFormEmail] sent', { id: data?.id });
}

export { getSafeEmailErrorMessage };
