import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'MYTH — The Culture Engine',
  description: 'Build worlds that outlive you. The first Culture Engine for persistent digital civilizations.',
  metadataBase: new URL('https://myth-omega.vercel.app'),
  openGraph: {
    title: 'MYTH — The Culture Engine',
    description: 'Build worlds that outlive you.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-ivory antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}