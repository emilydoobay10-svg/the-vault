import { createElement } from 'react';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ContactEmail } from './_lib/emails/ContactEmail';
import { enforceFormSecurity } from './_lib/formSecurity';
import { logFormEvent } from './_lib/logger';
import { getSafeEmailErrorMessage, sendFormEmail } from './_lib/sendEmail';
import { apiError, isValidEmail, sanitizeText } from './_lib/validation';

const ENDPOINT = 'contact';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const security = await enforceFormSecurity(req, ENDPOINT);
  if (!security.allowed) {
    if ('spam' in security && security.spam) {
      return res.status(200).json({ ok: true });
    }
    return res.status(security.status).json({ ok: false, error: security.error });
  }

  try {
    const body = security.body;

    const name = sanitizeText(body.name, 200);
    const email = sanitizeText(body.email, 320);
    const subject = sanitizeText(body.subject, 200);
    const message = sanitizeText(body.message, 5000);

    if (!name || !email || !subject || !message) {
      const err = apiError('Please complete all required fields.');
      logFormEvent('warn', ENDPOINT, 'validation_failed', {
        clientIp: security.clientIp,
        reason: 'missing_fields',
      });
      return res.status(err.status).json({ ok: false, error: err.message });
    }

    if (!isValidEmail(email)) {
      const err = apiError('Please enter a valid email address.');
      logFormEvent('warn', ENDPOINT, 'validation_failed', {
        clientIp: security.clientIp,
        reason: 'invalid_email',
      });
      return res.status(err.status).json({ ok: false, error: err.message });
    }

    await sendFormEmail(
      `Contact — ${subject}`,
      createElement(ContactEmail, { name, email, subject, message }),
    );

    logFormEvent('info', ENDPOINT, 'submission_sent', { clientIp: security.clientIp });
    return res.status(200).json({ ok: true });
  } catch (error) {
    logFormEvent('error', ENDPOINT, 'submission_failed', {
      clientIp: security.clientIp,
      error: error instanceof Error ? error.message : 'unknown_error',
    });
    return res.status(500).json({
      ok: false,
      error: getSafeEmailErrorMessage(error),
    });
  }
}
