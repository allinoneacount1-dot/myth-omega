'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';

function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function WalletConnectButton() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (isConnecting) {
    return (
      <button className="label inline-flex items-center gap-3 border border-gold/40 px-10 py-5 text-gold/50">
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <span className="label text-ivory/50">
          {truncateAddress(address)}
          {balance && ` · ${parseFloat(balance.formatted).toFixed(4)}`}
        </span>
        <button
          onClick={() => disconnect()}
          className="label border border-ember/40 px-6 py-3 text-ember transition-all hover:bg-ember/10"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="label inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
    >
      Connect Wallet
      <span aria-hidden="true">→</span>
    </button>
  );
}
