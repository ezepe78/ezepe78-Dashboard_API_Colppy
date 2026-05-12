import * as XLSX from 'xlsx';
import { AppError } from '@/lib/errors/app-error';

export function parseWorkbook(buffer: Buffer | ArrayBuffer) {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
    const sheets: Record<string, unknown[]> = {};

    for (const name of workbook.SheetNames) {
      const ws = workbook.Sheets[name];
      sheets[name] = XLSX.utils.sheet_to_json(ws, { defval: null, raw: true });
    }

    if (workbook.SheetNames.length === 0) {
      throw new AppError('El archivo recibido no contiene hojas.', 'EMPTY_WORKBOOK', 422);
    }

    return { sheetNames: workbook.SheetNames, sheets };
  } catch (error) {
    throw new AppError('No se pudo parsear el archivo Excel/XML binario.', 'PARSER_ERROR', 422, {
      reason: error instanceof Error ? error.message : 'unknown',
    });
  }
}
