import { AppError } from '@/lib/errors/app-error';

function norm(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '').replace(/[._:-]/g, '');
}

const DATE_KEYS = new Set([
  'fechafactura', 'fechapago', 'fechacobro', 'fechacontable', 'fechacontabilizado',
  'fechavalidez', 'fechavto', 'recordinsertts', 'recordupdatets', 'fechafe',
]);

const MONEY_KEYS = new Set([
  'totalfactura', 'netogravado', 'netonogravado', 'totaliva', 'percepcioniva', 'percepcioniibb',
  'totalaplicado', 'importe', 'totalcobro', 'totalcobrado', 'saldo', 'debito', 'credito', 'balance', 'balanceinicial',
]);

export function pickSheet(sheets: Record<string, unknown[]>, expectedName: string, critical = false) {
  const found = Object.keys(sheets).find((k) => norm(k) === norm(expectedName));
  if (!found && critical) {
    throw new AppError(`Falta hoja crítica: ${expectedName}`, 'MISSING_SHEET', 422, { sheet: expectedName });
  }
  return found ? sheets[found] : [];
}

export function mapRows(rows: unknown[]) {
  return (rows as Record<string, unknown>[]).map((row) => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row ?? {})) {
      const key = canonicalKey(k);
      out[key] = normalizeValue(v, key);
    }
    return out;
  });
}

export function canonicalKey(rawKey: string) {
  const nk = norm(rawKey);
  if (nk === 'empresaid' || nk === 'idempresa' || nk === 'empresa') return 'empresa_id';
  if (nk === 'idhijo') return 'id_hijo';
  if (nk === 'banco') return 'banco';
  if (nk === 'nrodecheque' || nk === 'nrocheque') return 'nro_cheque';
  if (nk === 'fechavto' || nk === 'fechavalidez') return 'fecha_vencimiento';
  if (nk === '4') return 'campo_4';
  if (nk === '6') return 'campo_6';
  return nk;
}

export function normalizeValue(value: unknown, key?: string): unknown {
  if (value === null || value === undefined || value === '') return null;
  const k = key ?? '';
  if (typeof value === 'number') {
    if (DATE_KEYS.has(k) && value > 25569 && value < 60000) {
      const utcDays = Math.floor(value - 25569);
      return new Date(utcDays * 86400 * 1000).toISOString();
    }
    return value;
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (DATE_KEYS.has(k) && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) {
      const [d, m, y] = trimmed.split('/').map(Number);
      return new Date(Date.UTC(y, m - 1, d)).toISOString();
    }
    if (MONEY_KEYS.has(k)) {
      const maybeNum = Number(trimmed.replace(/\./g, '').replace(',', '.'));
      if (!Number.isNaN(maybeNum)) return maybeNum;
    }
    return trimmed;
  }
  return value;
}
