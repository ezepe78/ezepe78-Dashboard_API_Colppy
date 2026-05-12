'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message ?? 'No fue posible iniciar sesión.');
      setLoading(false);
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border bg-white p-6 dark:bg-slate-900">
        <h1 className="text-lg font-semibold">Control Ejecutivo PyME</h1>
        <p className="mb-4 mt-1 text-sm text-slate-500">Ingresá la contraseña global para continuar.</p>
        <input type="password" className="w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-4 w-full rounded bg-slate-900 px-3 py-2 text-white disabled:opacity-60">{loading ? 'Validando…' : 'Ingresar'}</button>
      </form>
    </main>
  );
}
