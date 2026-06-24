'use client';

import { useState, useRef, useEffect } from 'react';
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

export function WalletConnectButton() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMenu(false);
    };
    if (showMenu) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [showMenu]);

  if (isConnecting) {
    return (
      <button className="label animate-pulse border border-gold/40 px-4 py-2 text-gold/50 text-xs">
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    const displayBalance = balance
      ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
      : null;

    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="label flex items-center gap-2 border border-gold/40 px-4 py-2 text-gold text-xs transition-all duration-300 hover:border-gold hover:bg-gold/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          {truncateAddress(address)}
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full z-[9999] mt-2 w-64 border border-rule bg-void-deep shadow-2xl rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-rule p-4">
              <p className="label text-ivory/40 text-[10px]">Connected Wallet</p>
              <p className="mt-1 font-mono text-xs text-ivory/80 break-all">{address}</p>
              {displayBalance && (
                <p className="mt-2 label text-gold text-xs">{displayBalance}</p>
              )}
            </div>

            {/* Switch wallet */}
            <div className="p-4">
              <p className="label text-ivory/30 text-[10px] mb-2">Switch Wallet</p>
              <div className="space-y-1">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => { connect({ connector }); setShowMenu(false); }}
                    className="label w-full border border-rule/50 py-2 px-3 text-ivory/60 text-xs transition-all hover:border-gold/40 hover:text-gold text-left"
                  >
                    {connector.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Disconnect */}
            <div className="border-t border-rule p-4">
              <button
                onClick={() => { disconnect(); setShowMenu(false); }}
                className="label w-full border border-ember/30 py-2 text-ember/70 text-xs transition-all hover:bg-ember/10 hover:text-ember"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="label border border-gold/40 px-4 py-2 text-gold text-xs transition-all duration-300 hover:border-gold hover:bg-gold/10"
      >
        Connect Wallet
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full z-[9999] mt-2 w-56 border border-rule bg-void-deep shadow-2xl rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="label text-ivory/40 text-[10px] mb-3">Choose Wallet</p>
            <div className="space-y-1">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => { connect({ connector }); setShowMenu(false); }}
                  className="label w-full border border-rule/50 py-3 px-3 text-ivory/60 text-xs transition-all hover:border-gold/40 hover:text-gold text-left"
                >
                  {connector.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
