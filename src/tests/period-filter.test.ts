import { describe, expect, it } from 'vitest';
import { currentMonthRange, filterByDateRange, inRange } from '@/lib/filters/period';

describe('period filters', () => {
  it('detecta fecha dentro de rango', () => {
    const range = currentMonthRange(new Date('2026-05-12'));
    expect(inRange('2026-05-10', range)).toBe(true);
    expect(inRange('2026-04-30', range)).toBe(false);
  });

  it('filtra colecciones por campos de fecha', () => {
    const range = currentMonthRange(new Date('2026-05-12'));
    const rows = [{ fechaFactura: '2026-05-01' }, { fechaFactura: '2026-04-01' }];
    expect(filterByDateRange(rows, ['fechaFactura'], range)).toHaveLength(1);
  });
});
