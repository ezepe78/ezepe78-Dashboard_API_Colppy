const ars=new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS'});
export const formatCurrencyKpi=(n?:number|null)=> n==null? 'No disponible':ars.format(Math.round(n));
export const formatCurrencyTable=(n?:number|null)=> n==null? 'No disponible':new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',minimumFractionDigits:2}).format(n);
export const formatCurrencyCompact=(n?:number|null)=> n==null?'No disponible':new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',notation:'compact'}).format(n);
