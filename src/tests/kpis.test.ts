import { describe, expect, it } from 'vitest';
import { buildResumenKpis } from '@/lib/kpis/resumen';

describe('resumen kpis', () => {
  it('calcula ventas/compras/resultado', () => {
    const data = {
      modelo1: {
        facturasVenta: [{ fechafactura: '2026-05-10', totalfactura: 1000 }],
        facturasCompra: [{ fechafactura: '2026-05-11', totalfactura: 300 }],
      },
      modelo3: {
        'Cobros Factura': [{ fechacobro: '2026-05-10', totalcobrado: 600 }],
      },
    };

    const kpis = buildResumenKpis(data, { from: new Date('2026-05-01'), to: new Date('2026-05-31') });
    expect(kpis.totalVentas).toBe(1000);
    expect(kpis.totalCompras).toBe(300);
    expect(kpis.resultado).toBe(700);
  });
});
