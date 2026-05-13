import { AppError } from '@/lib/errors/app-error';

const endpoints = {
  modelo1: 'http://powerbi.tecnonegocios.com.ar:8000/api/dashboard_data',
  modelo2: 'http://powerbi.tecnonegocios.com.ar:8000/api/dashboard_presupuestovsreal',
  modelo3: 'http://powerbi.tecnonegocios.com.ar:8000/api/dashboard_cashflow',
} as const;

export async function fetchExternalModel(model: keyof typeof endpoints) {
  const user = process.env.COLPPY_API_USERNAME;
  const pass = process.env.COLPPY_API_PASSWORD;

  if (!user || !pass) {
    throw new AppError('Faltan credenciales de integración.', 'MISSING_CREDENTIALS', 500);
  }

  const start = Date.now();
  const response = await fetch(endpoints[model], {
    headers: {
      Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`,
    },
    cache: 'no-store',
  });

  const durationMs = Date.now() - start;

  if (!response.ok) {
    throw new AppError('Error al consultar endpoint externo.', 'EXTERNAL_ENDPOINT_ERROR', response.status, {
      endpoint: endpoints[model],
      status: response.status,
    });
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength === 0) {
    throw new AppError('La respuesta del endpoint está vacía.', 'EMPTY_RESPONSE', 422, { endpoint: endpoints[model] });
  }

  return { endpoint: endpoints[model], durationMs, respondedAt: new Date().toISOString(), buffer: Buffer.from(arrayBuffer) };
}
