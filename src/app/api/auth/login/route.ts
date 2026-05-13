import { NextResponse } from 'next/server';
import { SESSION_COOKIE, createSessionToken, isPasswordValid } from '@/lib/auth/access-password';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isPasswordValid(password)) {
    return NextResponse.json({ message: 'Contraseña inválida.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}
