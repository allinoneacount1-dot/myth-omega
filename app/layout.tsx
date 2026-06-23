import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageReveal } from '@/components/PageReveal';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'MYTH — The Culture Engine',
  description: 'Build worlds that outlive you. The first Culture Engine for persistent digital civilizations.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-void text-ivory antialiased">
        <ErrorBoundary>
          <PageReveal>
            <SmoothScroll>
              <ScrollProgress />
              {children}
            </SmoothScroll>
          </PageReveal>
        </ErrorBoundary>
      </body>
    </html>
  );
}
