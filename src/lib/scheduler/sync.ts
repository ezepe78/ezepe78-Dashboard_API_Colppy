import { readDashboardCache, writeDashboardCache } from '@/lib/cache/file-cache';
import { fetchExternalModel } from '@/lib/api/colppy-client';
import { parseWorkbook } from '@/lib/excel/parser';
import { normalizeModelo1 } from '@/lib/normalizers/modelo1';
import { normalizeModelo2 } from '@/lib/normalizers/modelo2';
import { normalizeModelo3 } from '@/lib/normalizers/modelo3';
import { CachedDashboardData, EndpointStatus } from '@/types/dashboard';

export async function runSync() {
  const current = (await readDashboardCache()) ?? { metadata: { endpointStatus: {} as Record<'modelo1'|'modelo2'|'modelo3', EndpointStatus>, warnings: [] } } as CachedDashboardData;
  const endpointStatus = {} as Record<'modelo1'|'modelo2'|'modelo3', EndpointStatus>;
  const warnings: string[] = [];

  const next: CachedDashboardData = { ...current, metadata: { ...current.metadata, lastAttemptAt: new Date().toISOString(), endpointStatus, warnings } };

  try {
    const m1 = await fetchExternalModel('modelo1');
    next.modelo1 = normalizeModelo1(parseWorkbook(m1.buffer).sheets);
    endpointStatus.modelo1 = { endpoint: m1.endpoint, ok: true, durationMs: m1.durationMs, respondedAt: m1.respondedAt };
  } catch (error) {
    warnings.push('Fallo modelo1.');
    endpointStatus.modelo1 = { endpoint: 'modelo1', ok: false, durationMs: 0, respondedAt: new Date().toISOString(), error: error instanceof Error ? error.message : 'unknown' };
  }

  try {
    const m2 = await fetchExternalModel('modelo2');
    next.modelo2 = normalizeModelo2(parseWorkbook(m2.buffer).sheets);
    endpointStatus.modelo2 = { endpoint: m2.endpoint, ok: true, durationMs: m2.durationMs, respondedAt: m2.respondedAt };
  } catch (error) {
    warnings.push('Fallo modelo2.');
    endpointStatus.modelo2 = { endpoint: 'modelo2', ok: false, durationMs: 0, respondedAt: new Date().toISOString(), error: error instanceof Error ? error.message : 'unknown' };
  }

  try {
    const m3 = await fetchExternalModel('modelo3');
    next.modelo3 = normalizeModelo3(parseWorkbook(m3.buffer).sheets);
    endpointStatus.modelo3 = { endpoint: m3.endpoint, ok: true, durationMs: m3.durationMs, respondedAt: m3.respondedAt };
  } catch (error) {
    warnings.push('Fallo modelo3.');
    endpointStatus.modelo3 = { endpoint: 'modelo3', ok: false, durationMs: 0, respondedAt: new Date().toISOString(), error: error instanceof Error ? error.message : 'unknown' };
  }

  const anySuccess = endpointStatus.modelo1?.ok || endpointStatus.modelo2?.ok || endpointStatus.modelo3?.ok;
  if (anySuccess) {
    next.metadata.lastSuccessAt = new Date().toISOString();
    next.metadata.lastAttemptOk = true;
    await writeDashboardCache(next);
    return { ok: true, data: next, usedCache: false };
  }

  const fallback = await readDashboardCache();
  if (fallback) {
    fallback.metadata.lastAttemptAt = new Date().toISOString();
    fallback.metadata.lastAttemptOk = false;
    fallback.metadata.warnings = ['Se muestran datos de la última versión válida en caché.', ...warnings];
    fallback.metadata.endpointStatus = endpointStatus;
    await writeDashboardCache(fallback);
    return { ok: false, data: fallback, usedCache: true };
  }

  next.metadata.lastAttemptOk = false;
  await writeDashboardCache(next);
  return { ok: false, data: next, usedCache: false };
}
