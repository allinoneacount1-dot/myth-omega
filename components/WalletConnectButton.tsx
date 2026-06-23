'use client';

import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
} from 'wagmi';
import { injected } from 'wagmi/connectors';

function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

interface WalletConnectButtonProps {
  onClick?: () => void;
  connected?: boolean;
}

export function WalletConnectButton({ onClick, connected }: WalletConnectButtonProps) {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    if (onClick && isConnected) {
      onClick();
    } else if (!isConnected) {
      setShowMenu(!showMenu);
    }
  };

  if (isConnecting) {
    return (
      <button className="label animate-pulse border border-gold/40 px-5 py-2.5 text-gold/50">
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    const displayBalance = balance
      ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
      : null;

    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="label flex items-center gap-2 border border-gold/40 px-5 py-2.5 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {truncateAddress(address)}
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 border border-rule bg-void-deep p-5 shadow-2xl">
            <p className="label text-ivory/50">Connected Wallet</p>
            <p className="mt-2 font-mono text-xs text-ivory/80 break-all">{address}</p>
            {displayBalance && (
              <p className="mt-3 label text-gold">{displayBalance}</p>
            )}
            <div className="mt-4 border-t border-rule pt-4">
              <p className="label text-ivory/40">Switch Wallet</p>
              <div className="mt-3 space-y-2">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => { connect({ connector }); setShowMenu(false); }}
                    className="label w-full border border-rule py-2 text-ivory/70 transition-all hover:border-gold hover:text-gold"
                  >
                    {connector.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => { disconnect(); setShowMenu(false); }}
              className="label mt-4 w-full border border-ember/40 py-3 text-ember transition-all hover:bg-ember/10"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="label border border-gold/40 px-5 py-2.5 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10"
      >
        Connect Wallet
      </button>
      {showMenu && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 border border-rule bg-void-deep p-4 shadow-2xl">
          <p className="label text-ivory/50">Choose Wallet</p>
          <div className="mt-4 space-y-2">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => { connect({ connector }); setShowMenu(false); }}
                className="label w-full border border-rule py-3 text-ivory/70 transition-all hover:border-gold hover:text-gold"
              >
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
