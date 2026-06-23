'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';

interface MarketData {
  price: number;
  priceChange24h: number;
  marketCap: number;
  fullyDilutedValuation: number;
  volume24h: number;
  liquidity: number;
  circulatingSupply: number;
  totalSupply: number;
  allTimeHigh: number;
  allTimeLow: number;
}

interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

interface HolderTier {
  tier: string;
  count: number;
  share: number;
}

interface OnChainMetric {
  metric: string;
  value: string | number;
  change: number;
}

interface CivFlow {
  name: string;
  inflow: number;
  outflow: number;
  net: number;
}

function formatNumber(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatPrice(p: number): string {
  if (p < 0.01) return `$${p.toFixed(6)}`;
  if (p < 1) return `$${p.toFixed(4)}`;
  return `$${p.toFixed(2)}`;
}

function MiniChart({ data, color = '#D8B36A' }: { data: PricePoint[]; color?: string }) {
  if (data.length < 2) return null;
  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const width = 100;
  const height = 40;

  const points = prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * width;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`chartGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points.join(' ')} ${width},${height}`}
        fill={`url(#chartGrad-${color.replace('#', '')})`}
      />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({ label, value, change, prefix = '' }: { label: string; value: string | number; change?: number; prefix?: string }) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className="border border-rule bg-void-deep p-5 transition-all duration-500 hover:border-gold/20">
      <span className="label text-ivory/40">{label}</span>
      <p className="mt-2 font-mono text-xl text-ivory">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {change !== undefined && (
        <p className={`mt-1 label ${isPositive ? 'text-teal' : isNegative ? 'text-ember' : 'text-ivory/40'}`}>
          {isPositive ? '↑' : isNegative ? '↓' : '→'} {Math.abs(change).toFixed(1)}%
        </p>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<{
    market: MarketData;
    priceHistory: PricePoint[];
    holderTiers: HolderTier[];
    onChainActivity: OnChainMetric[];
    civFlows: CivFlow[];
    lastUpdated: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chartRange, setChartRange] = useState<'7d' | '14d' | '30d'>('30d');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setError('');
    } catch {
      setError('Analytics temporarily unavailable');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const chartData = data?.priceHistory
    ? chartRange === '7d'
      ? data.priceHistory.slice(-7)
      : chartRange === '14d'
      ? data.priceHistory.slice(-14)
      : data.priceHistory
    : [];

  const priceChangeColor = data?.market.priceChange24h
    ? data.market.priceChange24h >= 0
      ? '#00B4A8'
      : '#A33A4A'
    : '#D8B36A';

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-sm pt-40 text-center">
        <Reveal>
          <span className="label text-gold">Market Intelligence</span>
          <h1 className="headline-hero mt-6 text-ivory">$MYTH Analytics</h1>
          <p
            className="mx-auto mt-6 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Real-time token metrics, on-chain activity, and civilization capital flows.
          </p>
        </Reveal>
      </section>

      {loading && (
        <div className="section-md text-center">
          <div className="inline-flex items-center gap-3">
            <MythMark size={24} stroke="#D8B36A" />
            <span className="label text-ivory/50">Loading market data...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="section-md text-center">
          <p className="text-ember">{error}</p>
        </div>
      )}

      {data && (
        <>
          {/* Price Hero */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="border border-rule bg-void-deep p-8 md:p-12">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="label text-ivory/40">Current Price</span>
                    <div className="mt-2 flex items-baseline gap-4">
                      <h2 className="font-display text-5xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                        {formatPrice(data.market.price)}
                      </h2>
                      <span className={`label text-lg ${data.market.priceChange24h >= 0 ? 'text-teal' : 'text-ember'}`}>
                        {data.market.priceChange24h >= 0 ? '+' : ''}{data.market.priceChange24h}%
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="label text-ivory/40">
                        ATH: {formatPrice(data.market.allTimeHigh)}
                      </span>
                      <span className="label text-ivory/40">
                        ATL: {formatPrice(data.market.allTimeLow)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-64">
                    <MiniChart data={chartData} color={priceChangeColor} />
                    <div className="mt-2 flex justify-center gap-2">
                      {(['7d', '14d', '30d'] as const).map((range) => (
                        <button
                          key={range}
                          onClick={() => setChartRange(range)}
                          className={`label px-3 py-1 ${
                            chartRange === range ? 'text-gold border-gold/40 border' : 'text-ivory/40'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <SectionDivider variant="glyph" />

          {/* Market Stats Grid */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">Market Overview</span>
                <span className="h-px flex-1 bg-rule" />
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <Reveal>
                <StatCard label="Market Cap" value={formatNumber(data.market.marketCap)} />
              </Reveal>
              <Reveal>
                <StatCard label="Fully Diluted Valuation" value={formatNumber(data.market.fullyDilutedValuation)} />
              </Reveal>
              <Reveal>
                <StatCard label="24h Volume" value={formatNumber(data.market.volume24h)} />
              </Reveal>
              <Reveal>
                <StatCard label="Liquidity" value={formatNumber(data.market.liquidity)} />
              </Reveal>
              <Reveal>
                <StatCard label="Circulating Supply" value={`${(data.market.circulatingSupply / 1e6).toFixed(0)}M MYTH`} />
              </Reveal>
              <Reveal>
                <StatCard label="Total Supply" value={`${(data.market.totalSupply / 1e9).toFixed(1)}B MYTH`} />
              </Reveal>
              <Reveal>
                <StatCard label="From ATH" value={`${(((data.market.price - data.market.allTimeHigh) / data.market.allTimeHigh) * 100).toFixed(1)}%`} />
              </Reveal>
              <Reveal>
                <StatCard label="From ATL" value={`${(((data.market.price - data.market.allTimeLow) / data.market.allTimeLow) * 100).toFixed(1)}%`} />
              </Reveal>
            </div>
          </section>

          <SectionDivider variant="wave" />

          {/* On-Chain Activity */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">On-Chain Activity</span>
                <span className="h-px flex-1 bg-rule" />
                <span className="label text-ivory/40">24h</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {data.onChainActivity.map((metric, i) => (
                <Reveal key={metric.metric} delay={i * 0.05}>
                  <StatCard
                    label={metric.metric}
                    value={metric.value}
                    change={metric.change}
                  />
                </Reveal>
              ))}
            </div>
          </section>

          <SectionDivider variant="particles" flip />

          {/* Holder Distribution */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">Holder Distribution</span>
                <span className="h-px flex-1 bg-rule" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {data.holderTiers.map((tier, i) => (
                <Reveal key={tier.tier} delay={i * 0.05}>
                  <div className="border border-rule bg-void-deep p-5 text-center transition-all duration-500 hover:border-gold/20">
                    <span className="label text-ivory/40">{tier.tier}</span>
                    <p className="mt-3 font-mono text-2xl text-ivory">{tier.count}</p>
                    <p className="mt-1 label text-gold">{tier.share}%</p>
                    <div className="mt-3 h-1 w-full bg-rule/30">
                      <div
                        className="h-full bg-gradient-to-r from-gold/80 to-gold/30 transition-all duration-1000"
                        style={{ width: `${tier.share}%` }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <SectionDivider variant="glyph" />

          {/* Civilization Capital Flows */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="mb-8 flex items-baseline gap-6">
                <span className="label text-gold">Civilization Capital Flows</span>
                <span className="h-px flex-1 bg-rule" />
                <span className="label text-ivory/40">24h</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.civFlows.map((civ, i) => {
                const isPositive = civ.net > 0;
                return (
                  <Reveal key={civ.name} delay={i * 0.05}>
                    <div className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                          {civ.name}
                        </h4>
                        <span className={`label ${isPositive ? 'text-teal' : 'text-ember'}`}>
                          {isPositive ? '↑' : '↓'} {formatNumber(Math.abs(civ.net))}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <span className="label text-ivory/40">Inflow</span>
                          <p className="mt-1 font-mono text-sm text-teal">+{formatNumber(civ.inflow)}</p>
                        </div>
                        <div>
                          <span className="label text-ivory/40">Outflow</span>
                          <p className="mt-1 font-mono text-sm text-ember">-{formatNumber(civ.outflow)}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-1 w-full bg-rule/30">
                        <div
                          className="h-full transition-all duration-1000"
                          style={{
                            width: `${Math.min(100, (civ.inflow / (civ.inflow + civ.outflow)) * 100)}%`,
                            backgroundColor: isPositive ? '#00B4A8' : '#A33A4A',
                          }}
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="border border-rule/50 bg-void-deep/50 p-6 text-center">
                <p className="text-xs text-ivory/30" style={{ lineHeight: '1.7' }}>
                  Data is simulated for demonstration purposes. In production, metrics are sourced from on-chain data via Helius DAS API, Jupiter, and Birdeye.
                  This is not financial advice. $MYTH is a participation token, not an investment instrument.
                </p>
                <p className="mt-2 label text-ivory/20">
                  Last updated: {new Date(data.lastUpdated).toLocaleString()}
                </p>
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section className="section-lg text-center">
            <Reveal>
              <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
              <h2 className="headline-section text-ivory">Shape the Culture</h2>
              <p
                className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/70 md:text-lg"
                style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}
              >
                Every canon entry you author, every ritual you attend, every vote you cast — the index moves.
              </p>
              <a
                href="/governance"
                className="label mt-10 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
              >
                Enter Governance<span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </section>
        </>
      )}

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
