'use client';

import { useState } from 'react';
import { formatDateAR } from '@/lib/formatters/dates';

export function DataStatus({ metadata }: { metadata?: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function syncNow() {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/sync', { method: 'POST' });
    const data = await res.json();
    setMessage(res.ok ? 'Actualización completada.' : data.message ?? 'Actualización con advertencias.');
    setLoading(false);
  }

  return (
    <section className="rounded-xl border bg-white p-6 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Estado de datos</h3>
      <p className="text-sm text-slate-500">La frecuencia de actualización se configura técnicamente mediante variables de entorno.</p>
      <div className="mt-4 grid gap-2 text-sm">
        <p>Último intento: {formatDateAR(metadata?.lastAttemptAt)}</p>
        <p>Última actualización exitosa: {formatDateAR(metadata?.lastSuccessAt)}</p>
        <p>Estado último intento: {metadata?.lastAttemptOk ? 'Exitoso' : 'Con errores'}</p>
      </div>
      <button onClick={syncNow} disabled={loading} className="mt-4 rounded border px-3 py-2 text-sm">
        {loading ? 'Actualizando…' : 'Actualizar datos'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </section>
  );
}
