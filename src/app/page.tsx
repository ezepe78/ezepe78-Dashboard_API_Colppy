import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';

export default async function HomePage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) redirect('/login');

  return (
    <AppShell>
      <section className="rounded-xl border bg-white p-6 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Resumen Ejecutivo</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Fundación técnica lista. En Día 2 conectaremos sincronización real con Colppy y cache segura.
        </p>
      </section>
    </AppShell>
  );
}
