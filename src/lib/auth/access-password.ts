import crypto from 'node:crypto';

export const SESSION_COOKIE = 'cepyme_session';

function secret() {
  return process.env.APP_ACCESS_PASSWORD ?? '';
}

export function isPasswordValid(password: string) {
  const expected = secret();
  if (!expected || !password) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function isSessionTokenValid(token?: string) {
  return Boolean(token && token.length >= 32);
}
