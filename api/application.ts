import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { enforceFormSecurity } from './_lib/formSecurity';
import { logFormEvent } from './_lib/logger';
import { isAllowedVenueType, isValidEmail, sanitizeText } from './_lib/validation';

const ENDPOINT = 'application';
const RECIPIENT_EMAIL = 'thevaultvendr@gmail.com';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveResendFrom(): string {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from || from.startsWith('re_')) {
    return 'The Vault Vending <onboarding@resend.dev>';
  }
  if (from.includes('<') && from.includes('>')) {
    return from;
  }
  if (isValidEmail(from)) {
    return `The Vault Vending <${from}>`;
  }
  return 'The Vault Vending <onboarding@resend.dev>';
}

function buildApplicationEmailHtml(fields: {
  venueName: string;
  contactName: string;
  email: string;
  venueType: string;
}): string {
  const venueName = escapeHtml(fields.venueName);
  const contactName = escapeHtml(fields.contactName);
  const email = escapeHtml(fields.email);
  const venueType = escapeHtml(fields.venueType);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>New Partner Application</title>
</head>
<body style="margin:0;padding:24px 0;background:#f4f4f5;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;">
    <tr>
      <td style="background:#000000;padding:28px 32px 24px;">
        <p style="margin:0 0 12px;color:#9B30FF;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">THE VAULT VENDING</p>
        <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;">New Partner Application</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px 8px;color:#52525b;font-size:15px;line-height:1.6;">
        A licensed BC venue has submitted a partner application through the website.
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 18px;">
        <p style="margin:0 0 4px;color:#71717a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Venue Name</p>
        <p style="margin:0;color:#18181b;font-size:15px;line-height:1.6;">${venueName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 18px;">
        <p style="margin:0 0 4px;color:#71717a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Contact Name</p>
        <p style="margin:0;color:#18181b;font-size:15px;line-height:1.6;">${contactName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 18px;">
        <p style="margin:0 0 4px;color:#71717a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Email</p>
        <p style="margin:0;color:#18181b;font-size:15px;line-height:1.6;">${email}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 24px;">
        <p style="margin:0 0 4px;color:#71717a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Venue Type</p>
        <p style="margin:0;color:#18181b;font-size:15px;line-height:1.6;">${venueType}</p>
      </td>
    </tr>
    <tr>
      <td style="border-top:1px solid #e4e4e7;padding:20px 32px 28px;color:#a1a1aa;font-size:12px;line-height:1.6;text-align:center;">
        The Vault Vending Inc. · British Columbia, Canada · 19+ Licensed Venues Only
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

    const venueName = sanitizeText(body.venueName, 200);
    const contactName = sanitizeText(body.contactName, 200);
    const email = sanitizeText(body.email, 320);
    const venueType = sanitizeText(body.venueType, 100);

    if (!venueName || !contactName || !email || !venueType) {
      logFormEvent('warn', ENDPOINT, 'validation_failed', {
        clientIp: security.clientIp,
        reason: 'missing_fields',
      });
      return res.status(400).json({ ok: false, error: 'Please complete all required fields.' });
    }

    if (!isValidEmail(email)) {
      logFormEvent('warn', ENDPOINT, 'validation_failed', {
        clientIp: security.clientIp,
        reason: 'invalid_email',
      });
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    if (!isAllowedVenueType(venueType)) {
      logFormEvent('warn', ENDPOINT, 'validation_failed', {
        clientIp: security.clientIp,
        reason: 'invalid_venue_type',
      });
      return res.status(400).json({ ok: false, error: 'Please select a valid venue type.' });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey || !apiKey.startsWith('re_')) {
      logFormEvent('error', ENDPOINT, 'resend_not_configured', { clientIp: security.clientIp });
      return res.status(500).json({
        ok: false,
        error: 'Email delivery is temporarily unavailable. Please try again later.',
      });
    }

    const resend = new Resend(apiKey);
    const html = buildApplicationEmailHtml({ venueName, contactName, email, venueType });

    const { error } = await resend.emails.send({
      from: resolveResendFrom(),
      to: RECIPIENT_EMAIL,
      subject: `Partner Application — ${venueName}`,
      html,
    });

    if (error) {
      logFormEvent('error', ENDPOINT, 'resend_error', {
        clientIp: security.clientIp,
        error: error.message,
      });
      return res.status(500).json({
        ok: false,
        error: 'Unable to send your application right now. Please try again shortly.',
      });
    }

    logFormEvent('info', ENDPOINT, 'submission_sent', { clientIp: security.clientIp });
    return res.status(200).json({ ok: true });
  } catch (error) {
    logFormEvent('error', ENDPOINT, 'submission_failed', {
      clientIp: security.clientIp,
      error: error instanceof Error ? error.message : 'unknown_error',
    });
    return res.status(500).json({
      ok: false,
      error: 'Unable to send your application right now. Please try again shortly.',
    });
  }
}
