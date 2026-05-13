import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';
import { DataStatus } from '@/components/dashboard/data-status';
import { readDashboardCache } from '@/lib/cache/file-cache';
import { buildResumenKpis } from '@/lib/kpis/resumen';
import { ResumenKpis } from '@/components/dashboard/resumen-kpis';

export default async function HomePage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) redirect('/login');

  const dashboard = await readDashboardCache();
  const kpis = buildResumenKpis(dashboard);

  return (
    <AppShell>
      <section className="mb-4 rounded-xl border bg-white p-6 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Resumen Ejecutivo</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Vista ejecutiva de 30 segundos con KPIs del período actual.</p>
      </section>
      <ResumenKpis kpis={kpis} />
      <div className="mt-4">
        <DataStatus metadata={dashboard?.metadata} />
      </div>
    </AppShell>
  );
}
