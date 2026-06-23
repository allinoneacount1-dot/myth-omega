'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENT_MARKETPLACE } from '@/lib/marketplace';

const STATUS_COLORS = {
  available: '#00B4A8',
  busy: '#D8B36A',
  maintenance: '#A33A4A',
};

const TIER_COLORS = {
  free: '#00B4A8',
  pro: '#D8B36A',
  enterprise: '#9B4DFF',
};

export default function MarketplacePage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string>('all');

  const filteredAgents = filterTier === 'all'
    ? AGENT_MARKETPLACE
    : AGENT_MARKETPLACE.filter((a) =>
        a.capabilities.some((c) => c.tier === filterTier)
      );

  return (
    <main className="bg-void text-ivory min-h-screen">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-sm pt-16 text-center">
        <Reveal>
          <span className="label text-gold">Intelligence Layer</span>
          <h1 className="headline-hero mt-6 text-ivory">Agent Marketplace</h1>
          <p className="mx-auto mt-6 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl" style={{ fontFamily: 'var(--font-display), serif' }}>
            Hire specialized AI agents to build, protect, and evolve your civilization. Each agent has a sacred duty.
          </p>
        </Reveal>
      </section>

      <SectionDivider variant="glyph" />

      {/* Filter */}
      <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-ivory/40">Filter by tier:</span>
            <div className="flex gap-2">
              {['all', 'free', 'pro', 'enterprise'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setFilterTier(tier)}
                  className={`label px-4 py-2 border transition-all duration-300 ${
                    filterTier === tier
                      ? 'border-gold/50 bg-gold/5 text-gold'
                      : 'border-rule text-ivory/40 hover:text-ivory/70'
                  }`}
                >
                  {tier === 'all' ? 'All' : tier === 'free' ? '🆓 Free' : tier === 'pro' ? '⭐ Pro' : '💎 Enterprise'}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Agent Grid */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent, i) => (
            <Reveal key={agent.name} delay={i * 0.08}>
              <div
                className={`group relative border bg-void-deep p-8 transition-all duration-500 cursor-pointer ${
                  selectedAgent === agent.name ? 'border-gold/40' : 'border-rule hover:border-gold/20'
                }`}
                style={{ borderColor: selectedAgent === agent.name ? agent.color : undefined }}
                onClick={() => setSelectedAgent(selectedAgent === agent.name ? null : agent.name)}
              >
                {/* Top accent */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ backgroundColor: agent.color }} />

                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center border" style={{ borderColor: `${agent.color}30`, backgroundColor: `${agent.color}10` }}>
                      <AgentGlyph name={agent.name} size={36} stroke={agent.color} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</h3>
                      <p className="label text-ivory/50">{agent.role}</p>
                    </div>
                  </div>
                  <span className="label border px-2 py-0.5" style={{ color: STATUS_COLORS[agent.status], borderColor: `${STATUS_COLORS[agent.status]}30` }}>
                    {agent.status}
                  </span>
                </div>

                {/* Tagline */}
                <p className="mt-4 text-sm text-ivory/70 italic" style={{ lineHeight: '1.6' }}>{agent.tagline}</p>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-rule pt-4">
                  <div>
                    <p className="label text-ivory/40">Rating</p>
                    <p className="mt-1 font-mono text-sm text-gold">★ {agent.rating}</p>
                  </div>
                  <div>
                    <p className="label text-ivory/40">Tasks</p>
                    <p className="mt-1 font-mono text-sm text-ivory">{agent.completedTasks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="label text-ivory/40">Speed</p>
                    <p className="mt-1 font-mono text-sm text-ivory">{agent.responseTime}</p>
                  </div>
                </div>

                {/* Expanded: Capabilities */}
                {selectedAgent === agent.name && (
                  <div className="mt-6 border-t border-rule pt-6">
                    <p className="label text-gold/70">Capabilities</p>
                    <div className="mt-3 space-y-2">
                      {agent.capabilities.map((cap) => (
                        <div key={cap.name} className="flex items-center justify-between border border-rule/30 bg-void p-3">
                          <div>
                            <p className="text-sm text-ivory/90">{cap.name}</p>
                            <p className="text-xs text-ivory/50">{cap.description}</p>
                          </div>
                          <span className="label" style={{ color: TIER_COLORS[cap.tier] }}>
                            {cap.tier}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="mt-6">
                      <p className="label text-gold/70">Pricing</p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="border border-rule/30 bg-void p-3 text-center">
                          <p className="label text-teal">Free</p>
                          <p className="mt-1 text-xs text-ivory/70">{agent.pricing.free}</p>
                        </div>
                        <div className="border border-rule/30 bg-void p-3 text-center">
                          <p className="label text-gold">Pro</p>
                          <p className="mt-1 text-xs text-ivory/70">{agent.pricing.pro}</p>
                        </div>
                        <div className="border border-rule/30 bg-void p-3 text-center">
                          <p className="label text-[#9B4DFF]">Enterprise</p>
                          <p className="mt-1 text-xs text-ivory/70">{agent.pricing.enterprise}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/agents/${agent.name.toLowerCase()}`}
                        className="label flex-1 border border-gold py-3 text-center text-gold transition-all duration-500 hover:bg-gold hover:text-void"
                      >
                        Chat with {agent.name} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-void-deep mt-16">
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
