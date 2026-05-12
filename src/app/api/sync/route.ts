import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { runSync } from '@/lib/scheduler/sync';
import { isSessionTokenValid, SESSION_COOKIE } from '@/lib/auth/access-password';

export async function POST() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) {
    return NextResponse.json({ ok: false, message: 'No autenticado.' }, { status: 401 });
  }

  const result = await runSync();
  if (!result.ok && !result.usedCache) {
    return NextResponse.json({ ok: false, message: 'No se pudo sincronizar y no existe caché previa.', data: result.data }, { status: 503 });
  }

  return NextResponse.json({ ok: result.ok, usedCache: result.usedCache, data: result.data }, { status: result.ok ? 200 : 207 });
}
