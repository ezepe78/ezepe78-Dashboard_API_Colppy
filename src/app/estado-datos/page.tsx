import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';
import { DataStatus } from '@/components/dashboard/data-status';
import { readDashboardCache } from '@/lib/cache/file-cache';

export default async function EstadoDatosPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) redirect('/login');

  const dashboard = await readDashboardCache();

  return (
    <AppShell>
      <DataStatus metadata={dashboard?.metadata} />
    </AppShell>
  );
}
