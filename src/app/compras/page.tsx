import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { SESSION_COOKIE, isSessionTokenValid } from '@/lib/auth/access-password';
import { ModuleEmpty } from '@/components/dashboard/module-empty';

export default async function Page() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) redirect('/login');

  return (
    <AppShell>
      <ModuleEmpty title="Compras" description="Módulo en implementación incremental." />
    </AppShell>
  );
}
