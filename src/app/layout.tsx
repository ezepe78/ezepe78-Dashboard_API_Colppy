import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Control Ejecutivo PyME', description: 'Dashboard ejecutivo' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="es-AR"><body>{children}</body></html>; }
