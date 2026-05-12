export const formatNumberAR = (value?: number | null) => (typeof value === 'number' ? new Intl.NumberFormat('es-AR').format(value) : 'No disponible');
