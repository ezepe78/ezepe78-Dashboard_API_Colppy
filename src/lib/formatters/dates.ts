export const formatDateAR=(d?:Date|string|null)=>{ if(!d) return 'No disponible'; const dt=typeof d==='string'?new Date(d):d; return new Intl.DateTimeFormat('es-AR').format(dt); };
