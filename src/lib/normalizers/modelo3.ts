export const normalizeModelo3=(sheets:Record<string,Record<string,unknown>[]>)=>({cobros:sheets['Cobros Factura']??[],fondosPagos:sheets['Fondos Pagos']??[],raw:sheets});
