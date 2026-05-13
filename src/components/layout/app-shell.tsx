import Link from 'next/link';
import { appConfig } from '@/lib/config/env';
import { ThemeToggle } from './theme-toggle';

const modules = [
  { label: 'Resumen Ejecutivo', href: '/' },
  { label: 'Ventas', href: '/ventas' },
  { label: 'Compras', href: '/compras' },
  { label: 'Finanzas', href: '/finanzas' },
  { label: 'Contabilidad', href: '/contabilidad' },
  { label: 'Estado de datos', href: '/estado-datos' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur dark:bg-slate-900/80">
        <div>
          <h1 className="text-base font-semibold">{appConfig.appName}</h1>
          <p className="text-xs text-slate-500">{appConfig.companyName} · Empresa {appConfig.companyId}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <form action="/api/auth/logout" method="post">
            <button className="rounded border px-2 py-1 text-sm">Cerrar sesión</button>
          </form>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-[220px,1fr]">
        <aside className="hidden rounded-xl border bg-white p-3 dark:bg-slate-900 lg:block">
          <nav className="space-y-2">
            {modules.map((m) => (
              <Link className="block rounded px-2 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800" href={m.href} key={m.label}>
                {m.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
