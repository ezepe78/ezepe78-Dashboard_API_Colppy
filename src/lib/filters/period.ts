export type PeriodRange = { from: Date; to: Date };

export function currentMonthRange(now = new Date()): PeriodRange {
  return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999) };
}

export function currentQuarterRange(now = new Date()): PeriodRange {
  const quarter = Math.floor(now.getMonth() / 3);
  const startMonth = quarter * 3;
  return { from: new Date(now.getFullYear(), startMonth, 1), to: new Date(now.getFullYear(), startMonth + 3, 0, 23, 59, 59, 999) };
}

export function currentYearRange(now = new Date()): PeriodRange {
  return { from: new Date(now.getFullYear(), 0, 1), to: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999) };
}

export function lastDaysRange(days: number, now = new Date()): PeriodRange {
  const from = new Date(now);
  from.setDate(from.getDate() - days + 1);
  return { from, to: now };
}

export function inRange(dateValue: unknown, range: PeriodRange) {
  if (!dateValue) return false;
  const dt = new Date(String(dateValue));
  if (Number.isNaN(dt.getTime())) return false;
  return dt >= range.from && dt <= range.to;
}

export function filterByDateRange<T extends Record<string, unknown>>(rows: T[], dateFields: string[], range: PeriodRange) {
  return rows.filter((row) => dateFields.some((f) => inRange(row[f], range)));
}
