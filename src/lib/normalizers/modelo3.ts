import { mapRows, pickSheet } from './shared';

const sheets = ['Arbol Contable', 'Cuentas Diario', 'Clientes', 'Proveedores', 'Fondos Pagos', 'Facturas Venta', 'Facturas Compra', 'Cobros Factura'];

export function normalizeModelo3(input: Record<string, unknown[]>) {
  const critical = new Set(['Facturas Venta', 'Facturas Compra', 'Cobros Factura']);
  return Object.fromEntries(sheets.map((name) => [name, mapRows(pickSheet(input, name, critical.has(name)))]));
}
