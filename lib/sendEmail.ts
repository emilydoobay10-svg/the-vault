import { render } from '@react-email/render';
import { Resend } from 'resend';
import type { ReactElement } from 'react';

export const RECIPIENT_EMAIL = 'thevaultvendr@gmail.com';

export async function sendFormEmail(subject: string, template: ReactElement): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Email service is not configured.');
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? 'The Vault Vending <onboarding@resend.dev>';

  const resend = new Resend(apiKey);
  const html = await render(template);

  const { error } = await resend.emails.send({
    from,
    to: RECIPIENT_EMAIL,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
