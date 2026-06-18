import { isValidEmail } from './validation';

const RESEND_API_KEY_PREFIX = 're_';
const DEFAULT_FROM = 'The Vault Vending <onboarding@resend.dev>';

export type ResendConfig = {
  apiKey: string;
  from: string;
};

function looksLikeResendApiKey(value: string): boolean {
  return value.startsWith(RESEND_API_KEY_PREFIX);
}

function formatFromAddress(raw: string | undefined): string {
  const value = raw?.trim();

  if (!value) {
    return DEFAULT_FROM;
  }

  if (looksLikeResendApiKey(value)) {
    throw new Error(
      'RESEND_FROM_EMAIL is set to an API key. Put your Resend API key in RESEND_API_KEY and a verified sender email in RESEND_FROM_EMAIL.',
    );
  }

  const namedMatch = value.match(/^(.+?)\s*<([^>]+)>$/);
  if (namedMatch) {
    const name = namedMatch[1].trim();
    const email = namedMatch[2].trim();
    if (!isValidEmail(email)) {
      throw new Error('RESEND_FROM_EMAIL must contain a valid email address.');
    }
    return `${name} <${email}>`;
  }

  if (!isValidEmail(value)) {
    throw new Error(
      'RESEND_FROM_EMAIL must be a valid email address or use the format "Name <email@domain.com>".',
    );
  }

  return `The Vault Vending <${value}>`;
}

export function resolveResendConfig(): ResendConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? '';
  const fromRaw = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!looksLikeResendApiKey(apiKey)) {
    if (apiKey.includes('@')) {
      throw new Error(
        'RESEND_API_KEY appears to be an email address. Use your Resend API key (starts with re_) in RESEND_API_KEY instead.',
      );
    }
    throw new Error('RESEND_API_KEY is invalid.');
  }

  return {
    apiKey,
    from: formatFromAddress(fromRaw),
  };
}

export function getSafeEmailErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Unable to send your application right now. Please try again shortly.';
  }

  const message = error.message;

  if (message.startsWith('RESEND_') || message.includes('RESEND_FROM_EMAIL') || message.includes('RESEND_API_KEY')) {
    return 'Email delivery is temporarily unavailable. Please try again later.';
  }

  if (message.includes('Failed to prepare email')) {
    return 'Unable to prepare your application email. Please try again shortly.';
  }

  return 'Unable to send your application right now. Please try again shortly.';
}
