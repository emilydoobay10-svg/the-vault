import type { VercelRequest } from '@vercel/node';
import { enforceFormSecurity } from './formSecurity';
import {
  isAllowedVenueType,
  isHoneypotTripped,
  isValidEmail,
  sanitizeText,
  stripControlChars,
} from './validation';
import { checkRateLimit, getClientIp } from './rateLimit';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function makeRequest(body: Record<string, unknown>): VercelRequest {
  return {
    body,
    headers: { 'x-forwarded-for': '203.0.113.10' },
    socket: { remoteAddress: '203.0.113.10' },
  } as VercelRequest;
}

async function run(): Promise<void> {
  assert(sanitizeText('  hello  ', 10) === 'hello', 'sanitizeText trims');
  assert(sanitizeText('a'.repeat(11), 10) === null, 'sanitizeText enforces max length');
  assert(
    sanitizeText(stripControlChars('hi\u0007there'), 20) === 'hithere',
    'control chars are stripped',
  );
  assert(isValidEmail('user@example.com'), 'valid email accepted');
  assert(!isValidEmail('not-an-email'), 'invalid email rejected');
  assert(isAllowedVenueType('Nightclub'), 'allowed venue type accepted');
  assert(!isAllowedVenueType('Casino'), 'unknown venue type rejected');
  assert(!isHoneypotTripped(''), 'empty honeypot is clean');
  assert(isHoneypotTripped('https://spam.test'), 'filled honeypot trips');

  const honeypotResult = await enforceFormSecurity(
    makeRequest({ companyWebsite: 'spam', name: 'Bot' }),
    'test-honeypot',
  );
  assert('spam' in honeypotResult && honeypotResult.spam === true, 'honeypot blocks silently');

  const validResult = await enforceFormSecurity(
    makeRequest({ companyWebsite: '', name: 'Real User' }),
    'test-valid',
  );
  assert(validResult.allowed === true, 'clean request passes security');

  const ip = getClientIp(makeRequest({}));
  assert(ip === '203.0.113.10', 'client IP extracted from x-forwarded-for');

  const endpoint = `test-rate-${Date.now()}`;
  const ipForRate = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
  for (let i = 0; i < 5; i += 1) {
    assert(checkRateLimit(endpoint, ipForRate), `request ${i + 1} allowed`);
  }
  assert(!checkRateLimit(endpoint, ipForRate), 'sixth request is rate limited');

  console.log('All form security checks passed.');
}

void run().catch((error) => {
  console.error(error);
  process.exit(1);
});
