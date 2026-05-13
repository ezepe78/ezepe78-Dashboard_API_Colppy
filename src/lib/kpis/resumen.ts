import { filterByDateRange, currentMonthRange, PeriodRange } from '@/lib/filters/period';

interface AnyRow { [k: string]: unknown }

const toNum = (v: unknown) => (typeof v === 'number' ? v : Number(v ?? 0) || 0);

export function buildResumenKpis(data: any, range: PeriodRange = currentMonthRange()) {
  const ventas = (data?.modelo1?.facturasVenta ?? []) as AnyRow[];
  const compras = (data?.modelo1?.facturasCompra ?? []) as AnyRow[];
  const cobros = (data?.modelo3?.['Cobros Factura'] ?? []) as AnyRow[];

  const ventasPeriodo = filterByDateRange(ventas, ['fechafactura', 'fechapago'], range);
  const comprasPeriodo = filterByDateRange(compras, ['fechafactura', 'fechapago'], range);
  const cobrosPeriodo = filterByDateRange(cobros, ['fechacobro', 'fechacontable'], range);

  const totalVentas = ventasPeriodo.reduce((acc, row) => acc + toNum(row.totalfactura), 0);
  const totalCompras = comprasPeriodo.reduce((acc, row) => acc + toNum(row.totalfactura), 0);
  const totalCobrado = cobrosPeriodo.reduce((acc, row) => acc + toNum(row.totalcobrado || row.totalcobro), 0);
  const resultado = totalVentas - totalCompras;

  const estadoGeneral = resultado < 0 ? 'Crítico' : totalCobrado < totalVentas * 0.4 ? 'Atención' : 'Saludable';

  return { totalVentas, totalCompras, totalCobrado, resultado, estadoGeneral };
}
