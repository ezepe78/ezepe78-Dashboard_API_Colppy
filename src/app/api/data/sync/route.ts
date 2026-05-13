import { NextResponse } from 'next/server';
import { getColppyBasicAuthHeader, colppyConfig } from '@/lib/config/colppy';
import { getCache, getCacheMeta, setCache } from '@/lib/data/cache';

type SyncPayload = {
  dashboardData: unknown;
  presupuestoVsReal: unknown;
  cashflow: unknown;
  syncedAt: string;
};

const CACHE_KEY = 'colppy-sync-payload';

async function fetchJson(path: string, authHeader: string) {
  const response = await fetch(`${colppyConfig.baseUrl}/${path}`, {
    headers: { Authorization: authHeader },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} consultando ${path}`);
  }

  return response.json();
}

export async function GET() {
  const cached = getCache<SyncPayload>(CACHE_KEY);
  const meta = getCacheMeta(CACHE_KEY);
  if (cached) {
    return NextResponse.json({ source: 'cache', ...cached, cacheExpiresAt: meta?.expiresAt ?? null });
  }

  const authHeader = getColppyBasicAuthHeader();
  if (!authHeader) {
    return NextResponse.json({ error: 'Faltan credenciales COLPPY_API_USERNAME/COLPPY_API_PASSWORD.' }, { status: 500 });
  }

  try {
    const [dashboardData, presupuestoVsReal, cashflow] = await Promise.all([
      fetchJson('dashboard_data', authHeader),
      fetchJson('dashboard_presupuestovsreal', authHeader),
      fetchJson('dashboard_cashflow', authHeader),
    ]);

    const payload: SyncPayload = {
      dashboardData,
      presupuestoVsReal,
      cashflow,
      syncedAt: new Date().toISOString(),
    };

    setCache(CACHE_KEY, payload);
    const updatedMeta = getCacheMeta(CACHE_KEY);

    return NextResponse.json({ source: 'upstream', ...payload, cacheExpiresAt: updatedMeta?.expiresAt ?? null });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No fue posible sincronizar Colppy.' },
      { status: 502 },
    );
  }
}
