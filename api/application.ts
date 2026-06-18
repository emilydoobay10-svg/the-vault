import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ApplicationEmail } from '../emails/ApplicationEmail';
import { sendFormEmail } from '../lib/sendEmail';
import { apiError, isValidEmail, sanitizeText } from '../lib/validation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[api/application] request received', {
    method: req.method,
    url: req.url,
    hasBody: Boolean(req.body),
    contentType: req.headers['content-type'],
  });

  if (req.method !== 'POST') {
    console.log('[api/application] rejected non-POST request');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('[api/application] parsed body keys', Object.keys(body ?? {}));

    const venueName = sanitizeText(body?.venueName, 200);
    const contactName = sanitizeText(body?.contactName, 200);
    const email = sanitizeText(body?.email, 320);
    const venueType = sanitizeText(body?.venueType, 100);

    if (!venueName || !contactName || !email || !venueType) {
      console.log('[api/application] validation failed: missing fields');
      const err = apiError('Please complete all required fields.');
      return res.status(err.status).json({ error: err.message });
    }

    if (!isValidEmail(email)) {
      console.log('[api/application] validation failed: invalid email');
      const err = apiError('Please enter a valid email address.');
      return res.status(err.status).json({ error: err.message });
    }

    console.log('[api/application] sending email via Resend');
    await sendFormEmail(
      `Partner Application — ${venueName}`,
      ApplicationEmail({ venueName, contactName, email, venueType }),
    );

    console.log('[api/application] email sent successfully');
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[api/application] submission failed:', error);
    return res.status(500).json({
      error: 'Unable to send your application right now. Please try again shortly.',
    });
  }
}
