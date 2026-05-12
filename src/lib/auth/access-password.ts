import crypto from 'node:crypto';

export const SESSION_COOKIE = 'cepyme_session';
const TOKEN_SEPARATOR = '.';

function secret() {
  return process.env.APP_ACCESS_PASSWORD ?? '';
}

function signTokenPayload(payload: string) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

export function isPasswordValid(password: string) {
  return Boolean(secret()) && password === secret();
}

export function createSessionToken() {
  const nonce = crypto.randomBytes(32).toString('hex');
  const payload = `${Date.now().toString(16)}${TOKEN_SEPARATOR}${nonce}`;
  const signature = signTokenPayload(payload);
  return `${payload}${TOKEN_SEPARATOR}${signature}`;
}

export function isSessionTokenValid(token?: string) {
  const accessSecret = secret();
  if (!token || !accessSecret) return false;

  const [issuedAtHex, nonce, signature, ...rest] = token.split(TOKEN_SEPARATOR);
  if (rest.length > 0 || !issuedAtHex || !nonce || !signature) return false;
  if (!/^[0-9a-f]+$/i.test(issuedAtHex)) return false;
  if (!/^[0-9a-f]{64}$/i.test(nonce) || !/^[0-9a-f]{64}$/i.test(signature)) return false;

  const payload = `${issuedAtHex}${TOKEN_SEPARATOR}${nonce}`;
  const expectedSignature = signTokenPayload(payload);

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
