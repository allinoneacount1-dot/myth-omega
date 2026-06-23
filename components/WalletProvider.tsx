'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { useState, useEffect, type ReactNode } from 'react';

const projectId = 'myth-omega-wallet';
const metadata = {
  name: 'MYTH OMEGA',
  description: 'The Culture Engine — Build worlds that outlive you',
  url: 'https://myth-omega.vercel.app',
  icons: ['/favicon.svg'],
};

const config = createConfig({
  chains: [mainnet, polygon, arbitrum, base],
  connectors: [
    injected(),
    walletConnect({ projectId, metadata, showQrModal: true }),
    coinbaseWallet({ appName: 'MYTH OMEGA', appIcon: '/favicon.svg' }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export function WagmiWalletProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
