import { mapRows, pickSheet } from './shared';

const sheets = ['facturasCompra', 'facturasCompraDetalladas', 'facturasVenta', 'facturasVentaDetalladas', 'clientes', 'articulos', 'proveedores', 'arbolContable', 'Remitos'];

export function normalizeModelo1(input: Record<string, unknown[]>) {
  const critical = new Set(['facturasVenta', 'facturasCompra', 'clientes', 'proveedores']);
  return Object.fromEntries(sheets.map((name) => [name, mapRows(pickSheet(input, name, critical.has(name)))]));
}
