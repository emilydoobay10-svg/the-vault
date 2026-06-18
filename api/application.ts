import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const RECIPIENT_EMAIL = 'thevaultvendr@gmail.com';
const HONEYPOT_FIELD = 'companyWebsite';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHAR_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const ALLOWED_VENUE_TYPES = [
  'Nightclub',
  'Lounge / Bar',
  'Live Music Venue',
  'Event Space',
  'Hotel',
] as const;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitBuckets = new Map<string, RateLimitEntry>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

function stripControlChars(value: string): string {
  return value.replace(CONTROL_CHAR_PATTERN, '');
}

function sanitizeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = stripControlChars(value.trim());
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

function isAllowedVenueType(value: string): boolean {
  return (ALLOWED_VENUE_TYPES as readonly string[]).includes(value);
}

function isHoneypotTripped(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return value.trim().length > 0;
}

function parseJsonBody(req: VercelRequest): Record<string, unknown> {
  const raw = req.body;

  if (raw === null || raw === undefined) {
    return {};
  }

  if (typeof raw === 'string') {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('Invalid JSON body');
    }
    return parsed as Record<string, unknown>;
  }

  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }

  throw new Error('Invalid JSON body');
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(',')[0]?.trim() ?? 'unknown';
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  return req.socket?.remoteAddress ?? 'unknown';
}

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();

  for (const [key, entry] of rateLimitBuckets) {
    if (now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
      rateLimitBuckets.delete(key);
    }
  }

  const key = `application:${clientIp}`;
  const current = rateLimitBuckets.get(key);

  if (!current || now - current.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  rateLimitBuckets.set(key, current);
  return true;
}

async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string,
): Promise<{ ok: true } | { ok: false }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true };
  }

  if (typeof token !== 'string' || !token.trim()) {
    return { ok: false };
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token.trim(),
        remoteip: remoteIp,
      }),
    });

    if (!response.ok) {
      return { ok: false };
    }

    const result = (await response.json()) as { success?: boolean };
    return result.success ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  }
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

  const clientIp = getClientIp(req);

  let body: Record<string, unknown>;
  try {
    body = parseJsonBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: 'Invalid request. Please refresh and try again.' });
  }

  if (isHoneypotTripped(body[HONEYPOT_FIELD])) {
    return res.status(200).json({ ok: true });
  }

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many submissions. Please wait a few minutes and try again.',
    });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const turnstile = await verifyTurnstileToken(body.turnstileToken, clientIp);
    if (!turnstile.ok) {
      return res.status(400).json({
        ok: false,
        error: 'Security verification failed. Please complete the check and try again.',
      });
    }
  }

  try {
    const venueName = sanitizeText(body.venueName, 200);
    const contactName = sanitizeText(body.contactName, 200);
    const email = sanitizeText(body.email, 320);
    const venueType = sanitizeText(body.venueType, 100);

    if (!venueName || !contactName || !email || !venueType) {
      return res.status(400).json({ ok: false, error: 'Please complete all required fields.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }

    if (!isAllowedVenueType(venueType)) {
      return res.status(400).json({ ok: false, error: 'Please select a valid venue type.' });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey || !apiKey.startsWith('re_')) {
      console.error('[api/application] RESEND_API_KEY is missing or invalid');
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
      console.error('[api/application] Resend error:', error);
      return res.status(500).json({
        ok: false,
        error: 'Unable to send your application right now. Please try again shortly.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[api/application] submission failed:', error);
    return res.status(500).json({
      ok: false,
      error: 'Unable to send your application right now. Please try again shortly.',
    });
  }
}
