import type { VercelRequest } from '@vercel/node';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHAR_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const HONEYPOT_FIELD = 'companyWebsite';

export const ALLOWED_VENUE_TYPES = [
  'Nightclub',
  'Lounge / Bar',
  'Live Music Venue',
  'Event Space',
  'Hotel',
] as const;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function stripControlChars(value: string): string {
  return value.replace(CONTROL_CHAR_PATTERN, '');
}

export function sanitizeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = stripControlChars(value.trim());
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

export function isAllowedVenueType(value: string): boolean {
  return (ALLOWED_VENUE_TYPES as readonly string[]).includes(value);
}

export function isHoneypotTripped(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return value.trim().length > 0;
}

export function parseJsonBody(req: VercelRequest): Record<string, unknown> {
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

export type ApiError = {
  message: string;
  status: number;
};

export function apiError(message: string, status = 400): ApiError {
  return { message, status };
}
