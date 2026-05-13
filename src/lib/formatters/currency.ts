const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2, minimumFractionDigits: 2 });
const kpi = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0, minimumFractionDigits: 0 });
const compact = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', notation: 'compact', maximumFractionDigits: 1 });

export const formatCurrencyTable = (value?: number | null) => (typeof value === 'number' ? money.format(value) : 'No disponible');
export const formatCurrencyKpi = (value?: number | null) => (typeof value === 'number' ? kpi.format(value) : 'No disponible');
export const formatCurrencyCompact = (value?: number | null) => (typeof value === 'number' ? compact.format(value) : 'No disponible');
