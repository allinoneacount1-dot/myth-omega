import type { Metadata } from 'next';
import { Inter, Tenor_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';

const display = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MYTH — The Culture Engine',
  description: 'Build worlds that outlive you. The first Culture Engine for persistent digital civilizations.',
  metadataBase: new URL('https://myth-omega.vercel.app'),
  openGraph: {
    title: 'MYTH — The Culture Engine',
    description: 'Build worlds that outlive you.',
    type: 'website',
  },
  themeColor: '#05070B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-void text-ivory antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}