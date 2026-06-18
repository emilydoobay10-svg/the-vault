export const HONEYPOT_FIELD = 'companyWebsite';
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? '';
export const TURNSTILE_REQUIRED = TURNSTILE_SITE_KEY.length > 0;
