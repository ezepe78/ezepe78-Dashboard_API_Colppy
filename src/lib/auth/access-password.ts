import crypto from 'node:crypto';

export const SESSION_COOKIE = 'cepyme_session';

function secret() {
  return process.env.APP_ACCESS_PASSWORD ?? '';
}

export function isPasswordValid(password: string) {
  return Boolean(secret()) && password === secret();
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function isSessionTokenValid(token?: string) {
  return Boolean(token && token.length >= 32);
}
