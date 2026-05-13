import './globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Control Ejecutivo PyME',
  description: 'Dashboard ejecutivo para PyME',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
