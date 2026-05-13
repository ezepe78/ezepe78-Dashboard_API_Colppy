import { NextResponse } from 'next/server';
import { runSync } from '@/lib/scheduler/sync';

export async function GET() {
  if (process.env.SYNC_ENABLED === 'false') {
    return NextResponse.json({ ok: false, message: 'Sincronización deshabilitada por configuración.' }, { status: 202 });
  }

  const result = await runSync();
  return NextResponse.json({ ok: result.ok, usedCache: result.usedCache, at: new Date().toISOString() }, { status: result.ok ? 200 : 207 });
}
