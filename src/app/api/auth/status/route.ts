import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: isSessionTokenValid(token) });
}
