import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';
import { DataStatus } from '@/components/dashboard/data-status';

async function getDashboard() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/dashboard`, { cache: 'no-store' });
    return await res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) redirect('/login');
  const dashboard = await getDashboard();

  return (
    <AppShell>
      <section className="mb-4 rounded-xl border bg-white p-6 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Resumen Ejecutivo</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Base lista para filtros globales y KPIs del período.</p>
      </section>
      <DataStatus metadata={dashboard?.data?.metadata} />
    </AppShell>
  );
}
