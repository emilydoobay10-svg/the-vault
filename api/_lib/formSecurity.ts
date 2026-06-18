import type { VercelRequest } from '@vercel/node';
import { logFormEvent } from './logger';
import { checkRateLimit, getClientIp } from './rateLimit';
import { isTurnstileConfigured, verifyTurnstileToken } from './turnstile';
import { HONEYPOT_FIELD, isHoneypotTripped, parseJsonBody } from './validation';

export type FormSecurityResult =
  | { allowed: true; body: Record<string, unknown>; clientIp: string }
  | { allowed: false; status: number; error: string; reason: string }
  | { allowed: false; spam: true; clientIp: string };

export async function enforceFormSecurity(
  req: VercelRequest,
  endpoint: string,
): Promise<FormSecurityResult> {
  const clientIp = getClientIp(req);

  let body: Record<string, unknown>;
  try {
    body = parseJsonBody(req);
  } catch {
    logFormEvent('warn', endpoint, 'invalid_json_body', { clientIp });
    return {
      allowed: false,
      status: 400,
      error: 'Invalid request. Please refresh and try again.',
      reason: 'invalid_json',
    };
  }

  if (isHoneypotTripped(body[HONEYPOT_FIELD])) {
    logFormEvent('info', endpoint, 'honeypot_triggered', { clientIp });
    return { allowed: false, spam: true, clientIp };
  }

  if (!checkRateLimit(endpoint, clientIp)) {
    logFormEvent('warn', endpoint, 'rate_limited', { clientIp });
    return {
      allowed: false,
      status: 429,
      error: 'Too many submissions. Please wait a few minutes and try again.',
      reason: 'rate_limited',
    };
  }

  if (isTurnstileConfigured()) {
    const turnstile = await verifyTurnstileToken(body.turnstileToken, clientIp);
    if (!turnstile.ok) {
      logFormEvent('warn', endpoint, 'turnstile_failed', {
        clientIp,
        reason: turnstile.reason,
      });
      return {
        allowed: false,
        status: 400,
        error: 'Security verification failed. Please complete the check and try again.',
        reason: 'turnstile_failed',
      };
    }
  }

  logFormEvent('info', endpoint, 'security_passed', { clientIp });
  return { allowed: true, body, clientIp };
}
