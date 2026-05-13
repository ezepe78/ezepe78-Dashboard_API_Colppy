import { NextResponse } from 'next/server';
import { readDashboardCache } from '@/lib/cache/file-cache';

export async function GET() {
  const cache = await readDashboardCache();
  if (!cache) {
    return NextResponse.json({ ok: false, message: 'No hay datos disponibles todavía. Ejecutá una sincronización.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data: cache });
}
