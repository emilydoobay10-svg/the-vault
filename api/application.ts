import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ApplicationEmail } from '../emails/ApplicationEmail';
import { sendFormEmail } from '../lib/sendEmail';
import { apiError, isValidEmail, sanitizeText } from '../lib/validation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const venueName = sanitizeText(body?.venueName, 200);
    const contactName = sanitizeText(body?.contactName, 200);
    const email = sanitizeText(body?.email, 320);
    const venueType = sanitizeText(body?.venueType, 100);

    if (!venueName || !contactName || !email || !venueType) {
      const err = apiError('Please complete all required fields.');
      return res.status(err.status).json({ error: err.message });
    }

    if (!isValidEmail(email)) {
      const err = apiError('Please enter a valid email address.');
      return res.status(err.status).json({ error: err.message });
    }

    await sendFormEmail(
      `Partner Application — ${venueName}`,
      ApplicationEmail({ venueName, contactName, email, venueType }),
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Application submission failed:', error);
    return res.status(500).json({
      error: 'Unable to send your application right now. Please try again shortly.',
    });
  }
}
