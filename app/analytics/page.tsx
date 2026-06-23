'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
}

interface SolanaNetwork {
  currentSlot: number;
  avgTps: number;
  circulatingSupply: number;
  totalSupply: number;
  source: string;
}

interface GlobalMarket {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  marketCapChange24h: number;
  activeCryptocurrencies: number;
  markets: number;
}

function formatNumber(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatPrice(p: number): string {
  if (p >= 1000) return `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (p >= 1) return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(4)}`;
  return `$${p.toFixed(6)}`;
}

function formatLargeNumber(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
}

function ChangeIndicator({ value }: { value: number }) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  return (
    <span className={`label ${isPositive ? 'text-teal' : isNegative ? 'text-ember' : 'text-ivory/40'}`}>
      {isPositive ? '↑' : isNegative ? '↓' : '→'} {Math.abs(value).toFixed(2)}%
    </span>
  );
}

export default function AnalyticsPage() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [network, setNetwork] = useState<SolanaNetwork | null>(null);
  const [market, setMarket] = useState<GlobalMarket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/analytics?type=all');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPrices(data.cryptoPrices || []);
      setNetwork(data.solanaNetwork || null);
      setMarket(data.globalMarket || null);
      setLastUpdated(data.timestamp);
      setError('');
    } catch {
      setError('Real-time data temporarily unavailable. Using cached values.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 60_000); // Refresh every 60s
    return () => clearInterval(interval);
  }, [fetchData]);

  // Find SOL price for MYTH ecosystem context
  const solPrice = prices.find((p) => p.symbol === 'SOL');

  return (
    <main className="bg-void text-ivory min-h-screen">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-sm pt-40 text-center">
        <Reveal>
          <span className="label text-gold">Real-Time Intelligence</span>
          <h1 className="headline-hero mt-6 text-ivory">Market Analytics</h1>
          <p className="mx-auto mt-6 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl" style={{ fontFamily: 'var(--font-display), serif' }}>
            Live crypto prices, Solana network stats, and global market data — powered by free public APIs.
          </p>
          {lastUpdated && (
            <p className="mt-4 label text-ivory/30">
              Last updated: {new Date(lastUpdated).toLocaleString()}
              {refreshing && <span className="ml-2 text-gold">● refreshing...</span>}
            </p>
          )}
        </Reveal>
      </section>

      {loading && (
        <div className="section-md text-center">
          <div className="inline-flex items-center gap-3">
            <MythMark size={24} stroke="#D8B36A" />
            <span className="label text-ivory/50">Loading real-time data...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="section-sm text-center">
          <p className="text-ember/70 text-sm">{error}</p>
        </div>
      )}

      {!loading && (
        <>
          {/* ─── Crypto Prices ─────────────────────────────── */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">Crypto Prices</span>
                <span className="h-px flex-1 bg-rule" />
                <span className="label text-ivory/30">Live • CoinGecko</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {prices.map((coin, i) => (
                <Reveal key={coin.symbol} delay={i * 0.08}>
                  <div className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{coin.name}</h3>
                        <p className="label text-ivory/40">{coin.symbol}</p>
                      </div>
                      <ChangeIndicator value={coin.change24h} />
                    </div>
                    <p className="mt-4 font-mono text-2xl text-ivory">
                      {coin.price > 0 ? formatPrice(coin.price) : '—'}
                    </p>
                    {coin.price > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-rule pt-3">
                        <div>
                          <p className="label text-ivory/30">7d Change</p>
                          <ChangeIndicator value={coin.change7d} />
                        </div>
                        <div>
                          <p className="label text-ivory/30">Volume 24h</p>
                          <p className="font-mono text-sm text-ivory/70">{formatNumber(coin.volume24h)}</p>
                        </div>
                      </div>
                    )}
                    {coin.price === 0 && (
                      <p className="mt-4 label text-amber/50 text-xs">API rate limit reached — data will refresh automatically</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <SectionDivider variant="glyph" />

          {/* ─── Solana Network ────────────────────────────── */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">Solana Network</span>
                <span className="h-px flex-1 bg-rule" />
                <span className="label text-ivory/30">Live • Public RPC</span>
              </div>
            </Reveal>
            {network && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">Current Slot</p>
                    <p className="mt-2 font-mono text-xl text-ivory">{formatLargeNumber(network.currentSlot)}</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">Avg TPS</p>
                    <p className="mt-2 font-mono text-xl text-ivory">{network.avgTps.toLocaleString()}</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">SOL Price</p>
                    <p className="mt-2 font-mono text-xl text-ivory">{solPrice?.price ? formatPrice(solPrice.price) : '—'}</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">Circulating Supply</p>
                    <p className="mt-2 font-mono text-xl text-ivory">{formatLargeNumber(network.circulatingSupply)} SOL</p>
                  </div>
                </Reveal>
              </div>
            )}
          </section>

          <SectionDivider variant="wave" />

          {/* ─── Global Market ─────────────────────────────── */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">Global Market</span>
                <span className="h-px flex-1 bg-rule" />
                <span className="label text-ivory/30">Live • CoinGecko</span>
              </div>
            </Reveal>
            {market && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">Total Market Cap</p>
                    <p className="mt-2 font-mono text-lg text-ivory">{formatNumber(market.totalMarketCap)}</p>
                    <div className="mt-1">
                      <ChangeIndicator value={market.marketCapChange24h} />
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">24h Volume</p>
                    <p className="mt-2 font-mono text-lg text-ivory">{formatNumber(market.totalVolume)}</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">BTC Dominance</p>
                    <p className="mt-2 font-mono text-lg text-ivory">{market.btcDominance.toFixed(1)}%</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">ETH Dominance</p>
                    <p className="mt-2 font-mono text-lg text-ivory">{market.ethDominance.toFixed(1)}%</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">Active Cryptos</p>
                    <p className="mt-2 font-mono text-lg text-ivory">{formatLargeNumber(market.activeCryptocurrencies)}</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border border-rule bg-void-deep p-6 text-center">
                    <p className="label text-ivory/40">Markets</p>
                    <p className="mt-2 font-mono text-lg text-ivory">{formatLargeNumber(market.markets)}</p>
                  </div>
                </Reveal>
              </div>
            )}
          </section>

          <SectionDivider variant="particles" flip />

          {/* ─── Data Sources ──────────────────────────────── */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="border border-rule/50 bg-void-deep/50 p-6">
                <h3 className="label text-gold/70 mb-4">Data Sources (All Free)</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-teal" />
                    <div>
                      <p className="text-sm text-ivory/80">CoinGecko API</p>
                      <p className="label text-ivory/40">Crypto prices, market data • 50 req/min free</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-teal" />
                    <div>
                      <p className="text-sm text-ivory/80">Solana Public RPC</p>
                      <p className="label text-ivory/40">Network stats, slot, supply • No key required</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber" />
                    <div>
                      <p className="text-sm text-ivory/80">Helius API (optional)</p>
                      <p className="label text-ivory/40">Token metadata, holders • 100k req/day free tier</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber" />
                    <div>
                      <p className="text-sm text-ivory/80">Birdeye API (optional)</p>
                      <p className="label text-ivory/40">Solana token data • 100 req/min free tier</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-ivory/30" style={{ lineHeight: '1.7' }}>
                  All data is fetched server-side with 30-second caching to respect rate limits. Auto-refreshes every 60 seconds.
                  Set HELIUS_API_KEY environment variable for enhanced token data.
                </p>
              </div>
            </Reveal>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">Shape the Culture</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/70 md:text-lg" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
            Every canon entry you author, every vote you cast, every agent you hire — the index moves.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/forge" className="label inline-flex items-center gap-3 border border-gold px-8 py-4 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
              Enter the Forge<span aria-hidden="true">→</span>
            </a>
            <a href="/marketplace" className="label inline-flex items-center gap-3 border border-rule px-8 py-4 text-ivory/60 transition-all duration-700 hover:border-gold/40 hover:text-gold">
              Hire an Agent<span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <MythMark size={40} stroke="#F7F4EE" />
            <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>MYTH</span>
          </div>
          <p className="mt-6 max-w-md text-sm text-ivory/55" style={{ lineHeight: '1.7' }}>
            The first Culture Engine. Infrastructure for civilizations that intend to be remembered.
          </p>
          <p className="mt-8 label text-ivory/30">© 2026 MYTH Foundation</p>
        </div>
      </footer>
    </main>
  );
}
