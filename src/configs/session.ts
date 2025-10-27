import { CookieOptions } from 'express';

export const SESSION_SECURE_COOKIE = process.env.SESSION_SECURE_COOKIE === 'true';

const defaultMinutes = 120; // 2 hours in mins
export const SESSION_LIFETIME =
  (process.env.SESSION_LIFETIME
    ? Number(process.env.SESSION_LIFETIME)
    : defaultMinutes) * 60 * 1000;

const defaultRememberMinutes = 43200; // 30 days in mins
export const SESSION_LIFETIME_REMEMBER =
  (process.env.SESSION_LIFETIME_REMEMBER
    ? Number(process.env.SESSION_LIFETIME_REMEMBER)
    : defaultRememberMinutes) * 60 * 1000;

export const SESSION_HTTP_ONLY = process.env.SESSION_HTTP_ONLY === 'false' ? false : true;

type SameSiteOption = 'lax' | 'strict' | 'none';

export const SESSION_SAME_SITE: CookieOptions['sameSite'] =
  (['lax', 'strict', 'none'] as const).includes(
    (process.env.SESSION_SAME_SITE || '').toLowerCase() as SameSiteOption
  )
    ? ((process.env.SESSION_SAME_SITE || '').toLowerCase() as SameSiteOption)
    : 'lax';
