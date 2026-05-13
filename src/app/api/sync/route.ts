import { NextResponse } from 'next/server';
import { runSync } from '@/lib/scheduler/sync';

export async function POST() {
  const result = await runSync();
  if (!result.ok && !result.usedCache) {
    return NextResponse.json({ ok: false, message: 'No se pudo sincronizar y no existe caché previa.', data: result.data }, { status: 503 });
  }

  return NextResponse.json({ ok: result.ok, usedCache: result.usedCache, data: result.data }, { status: result.ok ? 200 : 207 });
}
