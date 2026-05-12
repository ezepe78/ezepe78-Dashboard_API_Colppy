export const formatDateAR = (value?: string | Date | null) => {
  if (!value) return 'No disponible';
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return 'No disponible';
  return new Intl.DateTimeFormat('es-AR').format(dt);
};
