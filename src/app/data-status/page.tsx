import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';

const checks = [
  { label: 'Sesión protegida', status: 'ok', detail: 'Cookie httpOnly firmada con HMAC SHA-256.' },
  { label: 'API de autenticación', status: 'ok', detail: 'Rutas /api/auth/login, /logout y /status disponibles.' },
  { label: 'Sincronización Colppy', status: 'ok', detail: 'Endpoint /api/data/sync integrado con Basic Auth y consulta de 3 modelos.' },
  { label: 'Caché de datos', status: 'ok', detail: 'Caché temporal en servidor con TTL configurable vía CACHE_TTL_MINUTES.' },
] as const;

export default async function DataStatusPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) redirect('/login');

  return (
    <AppShell>
      <section className="rounded-xl border bg-white p-6 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Estado de datos</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Tablero técnico para seguir el avance del plan de implementación.
        </p>

        <ul className="mt-6 space-y-3">
          {checks.map((check) => (
            <li key={check.label} className="rounded-lg border p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{check.label}</span>
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${
                    check.status === 'ok'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                  }`}
                >
                  {check.status === 'ok' ? 'Completado' : 'Pendiente'}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{check.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
