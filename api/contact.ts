import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ContactEmail } from '../emails/ContactEmail';
import { sendFormEmail } from '../lib/sendEmail';
import { apiError, isValidEmail, sanitizeText } from '../lib/validation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const name = sanitizeText(body?.name, 200);
    const email = sanitizeText(body?.email, 320);
    const subject = sanitizeText(body?.subject, 200);
    const message = sanitizeText(body?.message, 5000);

    if (!name || !email || !subject || !message) {
      const err = apiError('Please complete all required fields.');
      return res.status(err.status).json({ error: err.message });
    }

    if (!isValidEmail(email)) {
      const err = apiError('Please enter a valid email address.');
      return res.status(err.status).json({ error: err.message });
    }

    await sendFormEmail(
      `Contact — ${subject}`,
      ContactEmail({ name, email, subject, message }),
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return res.status(500).json({
      error: 'Unable to send your message right now. Please try again shortly.',
    });
  }
}
