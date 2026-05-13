import { formatCurrencyKpi } from '@/lib/formatters/currency';

export function ResumenKpis({ kpis }: { kpis: { totalVentas: number; totalCompras: number; totalCobrado: number; resultado: number; estadoGeneral: string } }) {
  const items = [
    ['Ventas del período', formatCurrencyKpi(kpis.totalVentas)],
    ['Compras del período', formatCurrencyKpi(kpis.totalCompras)],
    ['Cobranzas', formatCurrencyKpi(kpis.totalCobrado)],
    ['Resultado estimado', formatCurrencyKpi(kpis.resultado)],
    ['Estado general', kpis.estadoGeneral],
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map(([label, value]) => (
        <article key={label} className="rounded-xl border bg-white p-4 dark:bg-slate-900">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-semibold">{value}</p>
        </article>
      ))}
    </section>
  );
}
