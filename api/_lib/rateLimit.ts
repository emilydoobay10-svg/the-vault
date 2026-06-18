import type { VercelRequest } from '@vercel/node';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const buckets = new Map<string, RateLimitEntry>();

function pruneExpired(now: number): void {
  for (const [key, entry] of buckets) {
    if (now - entry.windowStart >= WINDOW_MS) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(req: VercelRequest): string {
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

export function checkRateLimit(endpoint: string, clientIp: string): boolean {
  const now = Date.now();
  pruneExpired(now);

  const key = `${endpoint}:${clientIp}`;
  const current = buckets.get(key);

  if (!current || now - current.windowStart >= WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (current.count >= MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  buckets.set(key, current);
  return true;
}
