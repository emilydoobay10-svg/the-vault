import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendInquiryEmail } from '../lib/emails/sendInquiryEmail';
import { getSafeEmailErrorMessage } from '../lib/sendEmail';
import { apiError, isValidEmail, sanitizeText } from '../lib/validation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const name = sanitizeText(body?.name, 200);
    const email = sanitizeText(body?.email, 320);
    const message = sanitizeText(body?.message, 5000);

    if (!name || !email || !message) {
      const err = apiError('Please complete all required fields.');
      return res.status(err.status).json({ ok: false, error: err.message });
    }

    if (!isValidEmail(email)) {
      const err = apiError('Please enter a valid email address.');
      return res.status(err.status).json({ ok: false, error: err.message });
    }

    await sendInquiryEmail({ name, email, message });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[api/inquiry] submission failed:', error);
    return res.status(500).json({
      ok: false,
      error: getSafeEmailErrorMessage(error),
    });
  }
}
