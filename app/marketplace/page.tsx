'use client';
import { DashboardLayout } from '@/components/DashboardLayout';
import Link from 'next/link';
import { AgentGlyph } from '@/components/agent-glyphs';
import { AGENT_MARKETPLACE } from '@/lib/marketplace';

const TIER_COLORS = { free: '#00B4A8', pro: '#D8B36A', enterprise: '#9B4DFF' };

export default function MarketplacePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Agent Marketplace</h1>
          <p className="mt-1 text-sm text-ivory/50">Browse and hire specialized AI agents</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AGENT_MARKETPLACE.map((agent) => (
            <div key={agent.name} className="border border-rule bg-void-deep p-6 hover:border-gold/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border" style={{ borderColor: `${agent.color}30`, backgroundColor: `${agent.color}10` }}>
                  <AgentGlyph name={agent.name} size={28} stroke={agent.color} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</h3>
                  <p className="label text-ivory/50">{agent.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ivory/60">{agent.tagline}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center"><p className="label text-ivory/30">Rating</p><p className="font-mono text-sm text-gold">★ {agent.rating}</p></div>
                <div className="text-center"><p className="label text-ivory/30">Tasks</p><p className="font-mono text-sm text-ivory">{agent.completedTasks.toLocaleString()}</p></div>
                <div className="text-center"><p className="label text-ivory/30">Speed</p><p className="font-mono text-sm text-ivory">{agent.responseTime}</p></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="border border-rule/30 bg-void p-2 text-center"><p className="label text-teal">Free</p><p className="label text-ivory/40">{agent.pricing.free}</p></div>
                <div className="border border-rule/30 bg-void p-2 text-center"><p className="label text-gold">Pro</p><p className="label text-ivory/40">{agent.pricing.pro}</p></div>
                <div className="border border-rule/30 bg-void p-2 text-center"><p className="label text-[#9B4DFF]">Enterprise</p><p className="label text-ivory/40">{agent.pricing.enterprise}</p></div>
              </div>
              <Link href={`/agents/${agent.name.toLowerCase()}`} className="label mt-4 block w-full border border-gold py-2 text-center text-gold text-xs hover:bg-gold hover:text-void">
                Chat with {agent.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
