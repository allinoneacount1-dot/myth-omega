import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageReveal } from '@/components/PageReveal';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorCapture } from '@/components/ErrorCapture';
import { WagmiWalletProvider } from '@/components/WalletProvider';
import { ChatBot } from '@/components/ChatBot';

export const metadata: Metadata = {
  title: 'MYTH — Dashboard',
  description: 'The Culture Engine. Build worlds that outlive you.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
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
        <WagmiWalletProvider>
          <ErrorBoundary>
            <PageReveal>
              <SmoothScroll>
                <ScrollProgress />
                {children}
                <ErrorCapture />
                <ChatBot />
              </SmoothScroll>
            </PageReveal>
          </ErrorBoundary>
        </WagmiWalletProvider>
      </body>
    </html>
  );
}
