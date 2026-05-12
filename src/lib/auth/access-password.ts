import crypto from 'node:crypto';

export const SESSION_COOKIE = 'cepyme_session';

function secret() {
  return process.env.APP_ACCESS_PASSWORD ?? '';
}

function sessionSecret() {
  return process.env.APP_SESSION_SECRET ?? secret();
}

export function isPasswordValid(password: string) {
  return Boolean(secret()) && password === secret();
}

export function createSessionToken() {
  const nonce = crypto.randomBytes(32).toString('hex');
  const signature = crypto.createHmac('sha256', sessionSecret()).update(nonce).digest('hex');
  return `${nonce}.${signature}`;
}

export function isSessionTokenValid(token?: string) {
  if (!token || !sessionSecret()) return false;

  const [nonce, signature] = token.split('.');
  if (!nonce || !signature) return false;

  const expected = crypto.createHmac('sha256', sessionSecret()).update(nonce).digest('hex');
  const receivedBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');

  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}
