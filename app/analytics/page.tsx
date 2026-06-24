'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function AnalyticsPage() {
  const [prices, setPrices] = useState<any[]>([]);
  const [network, setNetwork] = useState<any>(null);
  const [market, setMarket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics?type=all');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPrices(data.cryptoPrices || []);
      setNetwork(data.solanaNetwork || null);
      setMarket(data.globalMarket || null);
      setLastUpdated(data.timestamp);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); const i = setInterval(fetchData, 60000); return () => clearInterval(i); }, [fetchData]);

  const formatPrice = (p: number) => p >= 1000 ? `$${p.toLocaleString()}` : `$${p.toFixed(2)}`;
  const formatNum = (n: number) => n >= 1e9 ? `$${(n/1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : `$${n.toFixed(0)}`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Market Analytics</h1>
            <p className="mt-1 text-sm text-ivory/50">Real-time data from free public APIs</p>
          </div>
          {lastUpdated && (
            <span className="label text-ivory/30">Last sync: {new Date(lastUpdated).toLocaleTimeString()}</span>
          )}
        </div>

        {/* Ticker */}
        {!loading && prices.length > 0 && (
          <div className="flex flex-wrap gap-4 border border-rule bg-void-deep p-4">
            {prices.slice(0, 3).map((coin) => (
              <div key={coin.symbol} className="flex items-center gap-3">
                <span className="text-sm text-ivory/50">{coin.symbol}</span>
                <span className="font-mono text-lg text-ivory">{coin.price > 0 ? formatPrice(coin.price) : '—'}</span>
                <span className={`label ${coin.change24h >= 0 ? 'text-teal' : 'text-ember'}`}>
                  {coin.change24h >= 0 ? '↑' : '↓'} {Math.abs(coin.change24h).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {prices.map((coin, i) => (
            <div key={coin.symbol} className="border border-rule bg-void-deep p-5">
              <div className="flex items-center justify-between">
                <span className="label text-ivory/40">{coin.name}</span>
                <span className={`label text-xs ${coin.change24h >= 0 ? 'text-teal' : 'text-ember'}`}>
                  {coin.change24h >= 0 ? '↑' : '↓'} {Math.abs(coin.change24h).toFixed(1)}%
                </span>
              </div>
              <p className="mt-2 font-mono text-xl text-ivory">{coin.price > 0 ? formatPrice(coin.price) : '—'}</p>
              <p className="mt-1 label text-ivory/30">Vol: {coin.volume24h > 0 ? formatNum(coin.volume24h) : '—'}</p>
            </div>
          ))}
        </div>

        {/* Network + Market */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {network && (
            <div className="border border-rule bg-void-deep p-6">
              <h2 className="font-display text-lg text-ivory mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>Solana Network</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="label text-ivory/40">Slot</p><p className="font-mono text-lg text-ivory">{network.currentSlot.toLocaleString()}</p></div>
                <div><p className="label text-ivory/40">Avg TPS</p><p className="font-mono text-lg text-ivory">{network.avgTps.toLocaleString()}</p></div>
                <div><p className="label text-ivory/40">Circulating</p><p className="font-mono text-lg text-ivory">{network.circulatingSupply.toLocaleString()} SOL</p></div>
                <div><p className="label text-ivory/40">Source</p><p className="label text-teal">{network.source}</p></div>
              </div>
            </div>
          )}
          {market && (
            <div className="border border-rule bg-void-deep p-6">
              <h2 className="font-display text-lg text-ivory mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>Global Market</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="label text-ivory/40">Market Cap</p><p className="font-mono text-lg text-ivory">{formatNum(market.totalMarketCap)}</p></div>
                <div><p className="label text-ivory/40">24h Volume</p><p className="font-mono text-lg text-ivory">{formatNum(market.totalVolume)}</p></div>
                <div><p className="label text-ivory/40">BTC Dom</p><p className="font-mono text-lg text-ivory">{market.btcDominance.toFixed(1)}%</p></div>
                <div><p className="label text-ivory/40">Active Cryptos</p><p className="font-mono text-lg text-ivory">{market.activeCryptocurrencies.toLocaleString()}</p></div>
              </div>
            </div>
          )}
        </div>

        {/* Sources */}
        <div className="border border-rule/50 bg-void-deep/50 p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-teal" /><span className="label text-ivory/50">CoinGecko (free, 50/min)</span></div>
            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-teal" /><span className="label text-ivory/50">Solana RPC (public)</span></div>
            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-amber" /><span className="label text-ivory/50">Helius/Birdeye (optional)</span></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
