export function ModuleEmpty({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-xl border bg-white p-6 dark:bg-slate-900">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      <p className="mt-4 text-sm text-slate-500">No disponible por el momento. Se mostrará información real cuando haya datos normalizados para este módulo.</p>
    </section>
  );
}
