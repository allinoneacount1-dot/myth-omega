'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { CIVILIZATION_PROFILES } from '@/lib/civilizations';
import { AGENT_MARKETPLACE } from '@/lib/marketplace';

interface DashboardStats {
  totalCivilizations: number;
  totalAgents: number;
  totalProposals: number;
  activeQuests: number;
  cultureHealth: number;
}

interface LiveData {
  solPrice: number;
  solChange24h: number;
  btcPrice: number;
  btcChange24h: number;
  networkTps: number;
  lastUpdated: string;
}

function formatPrice(p: number): string {
  if (p >= 1000) return `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (p >= 1) return `$${p.toFixed(2)}`;
  return `$${p.toFixed(4)}`;
}

function StatCard({ label, value, change, icon, color = '#D8B36A' }: {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
  color?: string;
}) {
  return (
    <div className="border border-rule bg-void-deep p-5 transition-all duration-500 hover:border-gold/20">
      <div className="flex items-start justify-between">
        <span className="label text-ivory/40">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className="mt-2 font-mono text-2xl text-ivory">{value}</p>
      {change !== undefined && (
        <p className={`mt-1 label ${change >= 0 ? 'text-teal' : 'text-ember'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </p>
      )}
    </div>
  );
}

function MiniChart({ data, color = '#D8B36A' }: { data: number[]; color?: string }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 40;
  const points = data.map((p, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${points.join(' ')} ${width},${height}`} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);

  const stats: DashboardStats = {
    totalCivilizations: 6,
    totalAgents: 7,
    totalProposals: Object.values(CIVILIZATION_PROFILES).reduce((sum, c) => sum + c.governance.proposals.length, 0),
    activeQuests: Object.values(CIVILIZATION_PROFILES).reduce((sum, c) => sum + c.activeQuests.filter(q => q.status === 'active').length, 0),
    cultureHealth: Math.round(Object.values(CIVILIZATION_PROFILES).reduce((sum, c) => sum + c.health, 0) / 6),
  };

  const fetchLiveData = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics?type=all');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const sol = data.cryptoPrices?.find((c: any) => c.symbol === 'SOL');
      const btc = data.cryptoPrices?.find((c: any) => c.symbol === 'BTC');
      setLiveData({
        solPrice: sol?.price || 0,
        solChange24h: sol?.change24h || 0,
        btcPrice: btc?.price || 0,
        btcChange24h: btc?.change24h || 0,
        networkTps: data.solanaNetwork?.avgTps || 0,
        lastUpdated: data.timestamp,
      });
    } catch {
      // Silent fail — dashboard still works without live data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 60_000);
    return () => clearInterval(interval);
  }, [fetchLiveData]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
              Command Center
            </h1>
            <p className="mt-1 text-sm text-ivory/50">MYTH Culture Engine — Real-time overview</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="label text-ivory/30">
              {liveData ? `Last sync: ${new Date(liveData.lastUpdated).toLocaleTimeString()}` : 'Connecting...'}
            </span>
          </div>
        </div>

        {/* Live Market Ticker */}
        {liveData && (
          <div className="flex flex-wrap gap-4 border border-rule bg-void-deep p-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-ivory/50">SOL</span>
              <span className="font-mono text-lg text-ivory">{formatPrice(liveData.solPrice)}</span>
              <span className={`label ${liveData.solChange24h >= 0 ? 'text-teal' : 'text-ember'}`}>
                {liveData.solChange24h >= 0 ? '↑' : '↓'} {Math.abs(liveData.solChange24h).toFixed(2)}%
              </span>
            </div>
            <div className="text-ivory/20">|</div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-ivory/50">BTC</span>
              <span className="font-mono text-lg text-ivory">{formatPrice(liveData.btcPrice)}</span>
              <span className={`label ${liveData.btcChange24h >= 0 ? 'text-teal' : 'text-ember'}`}>
                {liveData.btcChange24h >= 0 ? '↑' : '↓'} {Math.abs(liveData.btcChange24h).toFixed(2)}%
              </span>
            </div>
            <div className="text-ivory/20">|</div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-ivory/50">Network TPS</span>
              <span className="font-mono text-lg text-ivory">{liveData.networkTps.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatCard label="Civilizations" value={stats.totalCivilizations} icon="⬡" />
          <StatCard label="Agents" value={stats.totalAgents} icon="◉" />
          <StatCard label="Proposals" value={stats.totalProposals} icon="⚖" />
          <StatCard label="Active Quests" value={stats.activeQuests} icon="⚔" />
          <StatCard
            label="Culture Health"
            value={`${stats.cultureHealth}%`}
            icon="♥"
            color={stats.cultureHealth >= 80 ? '#00B4A8' : '#D8B36A'}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Civilizations */}
          <div className="lg:col-span-2 border border-rule bg-void-deep p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Civilizations</h2>
              <Link href="/civilizations" className="label text-gold/60 hover:text-gold">View All →</Link>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Object.values(CIVILIZATION_PROFILES).map((civ) => (
                <Link
                  key={civ.slug}
                  href={`/civilization/${civ.slug}`}
                  className="group flex items-center gap-4 border border-rule bg-void p-4 transition-all duration-500 hover:border-gold/20"
                >
                  <div className="flex h-10 w-10 items-center justify-center border" style={{ borderColor: `${civ.color}30`, backgroundColor: `${civ.color}10` }}>
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: civ.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-ivory/90">{civ.name}</h3>
                      <span className="label text-ivory/30">{civ.genre}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-rule/20 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${civ.health}%`, backgroundColor: civ.color }} />
                      </div>
                      <span className="label text-ivory/40">{civ.health}%</span>
                    </div>
                    <p className="mt-1 label text-ivory/30">{civ.members.toLocaleString()} members • {civ.canonEntries} entries</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Agent Status */}
          <div className="border border-rule bg-void-deep p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Agent Status</h2>
              <Link href="/agents" className="label text-gold/60 hover:text-gold">All →</Link>
            </div>
            <div className="space-y-3">
              {AGENT_MARKETPLACE.map((agent) => (
                <Link
                  key={agent.name}
                  href={`/agents/${agent.name.toLowerCase()}`}
                  className="flex items-center gap-3 border border-rule/30 bg-void p-3 transition-all duration-300 hover:border-gold/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center" style={{ backgroundColor: `${agent.color}10` }}>
                    <AgentGlyph name={agent.name} size={18} stroke={agent.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ivory/90">{agent.name}</span>
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: agent.status === 'available' ? '#00B4A8' : '#D8B36A' }} />
                    </div>
                    <p className="label text-ivory/30">{agent.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Proposals */}
          <div className="border border-rule bg-void-deep p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Active Proposals</h2>
              <Link href="/governance" className="label text-gold/60 hover:text-gold">View All →</Link>
            </div>
            <div className="space-y-3">
              {Object.values(CIVILIZATION_PROFILES).flatMap((civ) =>
                civ.governance.proposals.filter(p => p.status === 'voting').map((proposal) => ({
                  ...proposal,
                  civName: civ.name,
                  civColor: civ.color,
                }))
              ).slice(0, 5).map((proposal, i) => (
                <div key={i} className="border border-rule/30 bg-void p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: proposal.civColor }} />
                      <span className="text-sm text-ivory/90">{proposal.title}</span>
                    </div>
                    <span className="label text-gold">{proposal.civName}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="label text-ivory/30">{proposal.votesFor} For / {proposal.votesAgainst} Against</span>
                    <span className="label text-teal">Voting</span>
                  </div>
                </div>
              ))}
              {Object.values(CIVILIZATION_PROFILES).flatMap((civ) => civ.governance.proposals.filter(p => p.status === 'voting')).length === 0 && (
                <p className="text-center label text-ivory/30 py-4">No active proposals</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border border-rule bg-void-deep p-6">
            <h2 className="font-display text-xl text-ivory mb-6" style={{ fontFamily: 'var(--font-display), serif' }}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/forge" className="flex flex-col items-center gap-2 border border-rule bg-void p-6 transition-all duration-500 hover:border-gold/30">
                <span className="text-2xl">⚒</span>
                <span className="text-sm text-ivory/90">Forge Canon</span>
                <span className="label text-ivory/30">Create lore</span>
              </Link>
              <Link href="/marketplace" className="flex flex-col items-center gap-2 border border-rule bg-void p-6 transition-all duration-500 hover:border-gold/30">
                <span className="text-2xl">◉</span>
                <span className="text-sm text-ivory/90">Hire Agent</span>
                <span className="label text-ivory/30">Assign work</span>
              </Link>
              <Link href="/governance" className="flex flex-col items-center gap-2 border border-rule bg-void p-6 transition-all duration-500 hover:border-gold/30">
                <span className="text-2xl">⚖</span>
                <span className="text-sm text-ivory/90">Vote</span>
                <span className="label text-ivory/30">Active proposals</span>
              </Link>
              <Link href="/analytics" className="flex flex-col items-center gap-2 border border-rule bg-void p-6 transition-all duration-500 hover:border-gold/30">
                <span className="text-2xl">◔</span>
                <span className="text-sm text-ivory/90">Analytics</span>
                <span className="label text-ivory/30">Market data</span>
              </Link>
              <Link href="/civilizations" className="flex flex-col items-center gap-2 border border-rule bg-void p-6 transition-all duration-500 hover:border-gold/30">
                <span className="text-2xl">⬡</span>
                <span className="text-sm text-ivory/90">Civilizations</span>
                <span className="label text-ivory/30">Manage worlds</span>
              </Link>
              <Link href="/whitepaper" className="flex flex-col items-center gap-2 border border-rule bg-void p-6 transition-all duration-500 hover:border-gold/30">
                <span className="text-2xl">◈</span>
                <span className="text-sm text-ivory/90">Whitepaper</span>
                <span className="label text-ivory/30">Download PDF</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-rule pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MythMark size={32} stroke="#F7F4EE" />
            <div>
              <span className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>MYTH</span>
              <p className="label text-ivory/30">The Culture Engine</p>
            </div>
          </div>
          <span className="label text-ivory/20">© 2026 MYTH Foundation</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
