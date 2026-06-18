const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true };
  }

  if (typeof token !== 'string' || !token.trim()) {
    return { ok: false, reason: 'missing_token' };
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
    remoteip: remoteIp,
  });

  let response: Response;
  try {
    response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch {
    return { ok: false, reason: 'verify_unreachable' };
  }

  if (!response.ok) {
    return { ok: false, reason: 'verify_http_error' };
  }

  let result: TurnstileVerifyResponse;
  try {
    result = (await response.json()) as TurnstileVerifyResponse;
  } catch {
    return { ok: false, reason: 'verify_invalid_response' };
  }

  if (!result.success) {
    return {
      ok: false,
      reason: result['error-codes']?.join(',') ?? 'verification_failed',
    };
  }

  return { ok: true };
}
