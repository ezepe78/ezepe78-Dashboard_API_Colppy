export const normalizeModelo2=(sheets:Record<string,Record<string,unknown>[]>)=>({movimientos:sheets['Movimientos Diario']??[],cuentas:sheets['Cuentas Diario']??[],raw:sheets});
