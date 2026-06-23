import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MYTH — The Culture Engine',
  description: 'Build worlds that outlive you. The first Culture Engine for persistent digital civilizations.',
};

export const viewport: Viewport = {
  themeColor: '#05070B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-void text-ivory antialiased">
        {children}
      </body>
    </html>
  );
}