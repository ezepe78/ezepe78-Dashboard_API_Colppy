import { mapRows, pickSheet } from './shared';

const sheets = ['Centros de Costo', 'Cuentas Diario', 'Movimientos Diario', 'Arbol Contable'];

export function normalizeModelo2(input: Record<string, unknown[]>) {
  return Object.fromEntries(sheets.map((name) => [name, mapRows(pickSheet(input, name, true))]));
}
