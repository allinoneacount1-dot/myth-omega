'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { CIVILIZATION_PROFILES, type CivilizationProfile, type TimelineEvent } from '@/lib/civilizations';

const TIMELINE_ICONS: Record<TimelineEvent['type'], string> = {
  founding: '🌱',
  conflict: '⚔️',
  discovery: '🔮',
  treaty: '📜',
  cataclysm: '💀',
  golden_age: '✨',
};

const STATUS_COLORS = {
  alive: '#00B4A8',
  deceased: '#A33A4A',
  missing: '#D8B36A',
  exiled: '#9B4DFF',
};

const QUEST_STATUS = {
  active: { label: 'Active', color: '#00B4A8' },
  completed: { label: 'Completed', color: '#D8B36A' },
  failed: { label: 'Failed', color: '#A33A4A' },
  dormant: { label: 'Dormant', color: '#9B4DFF' },
};

const PROPOSAL_STATUS = {
  voting: { label: 'Voting', color: '#D8B36A' },
  passed: { label: 'Passed', color: '#00B4A8' },
  rejected: { label: 'Rejected', color: '#A33A4A' },
  pending: { label: 'Pending', color: '#9B4DFF' },
};

const AGENT_COLORS: Record<string, string> = {
  Historian: '#D8B36A',
  Archivist: '#3AE9E0',
  Lorekeeper: '#9B4DFF',
  Oracle: '#FFD700',
  Diplomat: '#00B4A8',
  Worldbuilder: '#FF4D00',
  Narrator: '#A33A4A',
};

type Tab = 'overview' | 'timeline' | 'agents' | 'governance' | 'lore';

function HealthBar({ health, color }: { health: number; color: string }) {
  const getColor = () => {
    if (health >= 80) return '#00B4A8';
    if (health >= 60) return '#D8B36A';
    return '#A33A4A';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="label text-ivory/50">Culture Health</span>
        <span className="label" style={{ color: health >= 80 ? '#00B4A8' : health >= 60 ? '#D8B36A' : '#A33A4A' }}>
          {health}%
        </span>
      </div>
      <div className="h-2 w-full bg-rule/20">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${health}%`, background: `linear-gradient(90deg, ${color}, ${getColor()})` }}
        />
      </div>
    </div>
  );
}

function VoteBar({ forVotes, againstVotes, quorum }: { forVotes: number; againstVotes: number; quorum: number }) {
  const total = forVotes + againstVotes;
  const forPct = total > 0 ? (forVotes / total) * 100 : 0;
  const quorumPct = Math.min(100, (total / quorum) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="label text-teal">{forVotes} For</span>
        <span className="label text-ember">{againstVotes} Against</span>
      </div>
      <div className="relative h-2 w-full bg-rule/20">
        <div className="absolute inset-y-0 left-0 bg-teal/70 transition-all duration-700" style={{ width: `${forPct}%` }} />
        <div className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-gold" title={`Quorum: ${quorum}`} />
      </div>
      <p className="text-right label text-ivory/30">Quorum: {quorumPct.toFixed(0)}%</p>
    </div>
  );
}

export default function CivilizationProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Handle async params
  if (params) {
    params.then((p) => {
      if (!slug) setSlug(decodeURIComponent(p.name).toLowerCase());
    });
  }

  const profile = CIVILIZATION_PROFILES[slug];

  if (!profile) {
    return (
      <main className="bg-void text-ivory min-h-screen">
        <Navigation />
        <section className="section-lg pt-40 text-center">
          <h1 className="headline-section text-ivory">Civilization Not Found</h1>
          <p className="mt-6 text-ivory/60">This civilization does not exist in the MYTH network.</p>
          <Link href="/atlas" className="label mt-8 inline-flex items-center gap-3 border border-gold px-8 py-4 text-gold">
            Explore the Atlas<span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'agents', label: 'Agents & Figures' },
    { id: 'governance', label: 'Governance' },
    { id: 'lore', label: 'Lore & Myth' },
  ];

  return (
    <main className="bg-void text-ivory min-h-screen">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(ellipse at 30% 20%, ${profile.color} 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${profile.color} 0%, transparent 50%)`,
        }} />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="label" style={{ color: profile.color }}>{profile.genre}</span>
                <h1 className="headline-hero mt-4 text-ivory">{profile.name}</h1>
                <p className="mt-4 max-w-2xl font-display text-xl italic text-ivory/70 md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>
                  {profile.tagline}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center border" style={{ borderColor: `${profile.color}30` }}>
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: profile.color, boxShadow: `0 0 20px ${profile.color}40` }} />
                </div>
                <div>
                  <p className="label text-ivory/40">Culture Health</p>
                  <p className="font-mono text-2xl" style={{ color: profile.health >= 80 ? '#00B4A8' : '#D8B36A' }}>{profile.health}%</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-y border-rule bg-void-deep/50">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`label whitespace-nowrap px-6 py-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-b-2 text-ivory'
                    : 'text-ivory/40 hover:text-ivory/70'
                }`}
                style={activeTab === tab.id ? { borderColor: profile.color } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">

        {/* ==================== OVERVIEW ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-16">
            {/* Description */}
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="headline-editorial text-ivory">About {profile.name}</h2>
                <p className="mt-6 text-lg leading-relaxed text-ivory/80" style={{ lineHeight: '1.8' }}>
                  {profile.description}
                </p>
              </div>
            </Reveal>

            {/* Stats Grid */}
            <Reveal>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="border border-rule bg-void-deep p-6 text-center">
                  <p className="label text-ivory/40">Members</p>
                  <p className="mt-2 font-mono text-2xl text-ivory">{profile.members.toLocaleString()}</p>
                </div>
                <div className="border border-rule bg-void-deep p-6 text-center">
                  <p className="label text-ivory/40">Canon Entries</p>
                  <p className="mt-2 font-mono text-2xl" style={{ color: profile.color }}>{profile.canonEntries}</p>
                </div>
                <div className="border border-rule bg-void-deep p-6 text-center">
                  <p className="label text-ivory/40">Current Era</p>
                  <p className="mt-2 font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{profile.era}</p>
                </div>
                <div className="border border-rule bg-void-deep p-6 text-center">
                  <p className="label text-ivory/40">Founded</p>
                  <p className="mt-2 font-mono text-sm text-ivory/80">{profile.founded}</p>
                </div>
              </div>
            </Reveal>

            {/* Health + Location */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Reveal>
                <div className="border border-rule bg-void-deep p-6">
                  <HealthBar health={profile.health} color={profile.color} />
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="label text-ivory/40">Location</span>
                      <span className="text-sm text-ivory/80">{profile.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="label text-ivory/40">Treasury</span>
                      <span className="font-mono text-sm text-gold">${profile.governance.treasury.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="label text-ivory/40">Leader</span>
                      <span className="text-sm text-ivory/80">{profile.governance.currentLeader}</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-rule bg-void-deep p-6">
                  <span className="label text-ivory/40">Key Locations</span>
                  <div className="mt-4 space-y-2">
                    {profile.keyLocations.map((loc) => (
                      <div key={loc} className="flex items-center gap-3 border-b border-rule/30 pb-2">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: profile.color }} />
                        <span className="text-sm text-ivory/80">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Active Quests */}
            <Reveal>
              <div>
                <div className="mb-8 flex items-baseline gap-6">
                  <span className="label" style={{ color: profile.color }}>Active Quests</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="label text-ivory/40">{profile.activeQuests.length} Quests</span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {profile.activeQuests.map((quest) => (
                    <div key={quest.title} className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{quest.title}</h4>
                        <span className="label" style={{ color: QUEST_STATUS[quest.status].color }}>
                          {QUEST_STATUS[quest.status].label}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ivory/65" style={{ lineHeight: '1.7' }}>{quest.description}</p>
                      <div className="mt-4 border-t border-rule/30 pt-3">
                        <span className="label text-ivory/30">Reward: </span>
                        <span className="label text-gold/70">{quest.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* ==================== TIMELINE ==================== */}
        {activeTab === 'timeline' && (
          <div className="max-w-3xl">
            <Reveal>
              <div className="mb-12">
                <h2 className="headline-editorial text-ivory">The Chronicle of {profile.name}</h2>
                <p className="mt-4 text-ivory/60">A living record of the events that shaped this civilization.</p>
              </div>
            </Reveal>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-rule" />

              {profile.timeline.map((event, i) => (
                <Reveal key={event.year} delay={i * 0.08}>
                  <div className="relative mb-12 pl-16">
                    {/* Node */}
                    <div
                      className="absolute left-3.5 top-1 flex h-5 w-5 items-center justify-center rounded-full border text-[10px]"
                      style={{ borderColor: profile.color, backgroundColor: `${profile.color}15` }}
                    >
                      {TIMELINE_ICONS[event.type]}
                    </div>

                    <div className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20">
                      <div className="flex items-baseline gap-3">
                        <span className="label" style={{ color: profile.color }}>{event.year}</span>
                        <h3 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{event.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.75' }}>{event.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ==================== AGENTS & FIGURES ==================== */}
        {activeTab === 'agents' && (
          <div className="space-y-16">
            {/* Assigned Agents */}
            <Reveal>
              <div>
                <div className="mb-8 flex items-baseline gap-6">
                  <span className="label" style={{ color: profile.color }}>Assigned Agents</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="label text-ivory/40">{profile.agents.length} Agents</span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {profile.agents.map((agentName) => {
                    const color = AGENT_COLORS[agentName] || '#D8B36A';
                    return (
                      <Link
                        key={agentName}
                        href={`/agents/${agentName.toLowerCase()}`}
                        className="group flex items-center gap-4 border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20"
                      >
                        <div
                          className="flex h-14 w-14 items-center justify-center border"
                          style={{ borderColor: `${color}30`, backgroundColor: `${color}10` }}
                        >
                          <AgentGlyph name={agentName} size={32} stroke={color} />
                        </div>
                        <div>
                          <h4 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agentName}</h4>
                          <p className="label text-ivory/40">Click to chat →</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Key Figures */}
            <Reveal>
              <div>
                <div className="mb-8 flex items-baseline gap-6">
                  <span className="label" style={{ color: profile.color }}>Key Figures</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="label text-ivory/40">{profile.keyFigures.length} Figures</span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {profile.keyFigures.map((figure) => (
                    <div key={figure.name} className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{figure.name}</h4>
                          <p className="label text-ivory/50">{figure.title}</p>
                        </div>
                        <span
                          className="label border px-2 py-0.5"
                          style={{ color: STATUS_COLORS[figure.status], borderColor: `${STATUS_COLORS[figure.status]}30` }}
                        >
                          {figure.status}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ivory/65" style={{ lineHeight: '1.7' }}>{figure.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* ==================== GOVERNANCE ==================== */}
        {activeTab === 'governance' && (
          <div className="space-y-16 max-w-3xl">
            {/* Constitution */}
            <Reveal>
              <div>
                <h2 className="headline-editorial text-ivory">Constitution</h2>
                <div className="mt-6 border border-rule bg-void-deep p-8">
                  <p className="text-lg leading-relaxed text-ivory/80 italic" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.8' }}>
                    &ldquo;{profile.governance.constitution}&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Current Leader */}
            <Reveal>
              <div className="border border-rule bg-void-deep p-8">
                <span className="label text-ivory/40">Current Leader</span>
                <h3 className="mt-3 font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                  {profile.governance.currentLeader}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="label text-ivory/40">Treasury</span>
                    <p className="mt-1 font-mono text-lg text-gold">${profile.governance.treasury.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="label text-ivory/40">Active Proposals</span>
                    <p className="mt-1 font-mono text-lg text-ivory">{profile.governance.proposals.length}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Proposals */}
            <Reveal>
              <div>
                <div className="mb-8 flex items-baseline gap-6">
                  <span className="label" style={{ color: profile.color }}>Proposals</span>
                  <span className="h-px flex-1 bg-rule" />
                </div>
                <div className="space-y-4">
                  {profile.governance.proposals.map((proposal) => (
                    <div key={proposal.title} className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{proposal.title}</h4>
                        <span className="label" style={{ color: PROPOSAL_STATUS[proposal.status].color }}>
                          {PROPOSAL_STATUS[proposal.status].label}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ivory/65" style={{ lineHeight: '1.7' }}>{proposal.description}</p>
                      {(proposal.status === 'voting' || proposal.status === 'passed' || proposal.status === 'rejected') && (
                        <div className="mt-4">
                          <VoteBar forVotes={proposal.votesFor} againstVotes={proposal.votesAgainst} quorum={proposal.quorum} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* ==================== LORE & MYTH ==================== */}
        {activeTab === 'lore' && (
          <div className="space-y-16 max-w-3xl">
            {/* Creation Myth */}
            <Reveal>
              <div>
                <span className="label" style={{ color: profile.color }}>Creation Myth</span>
                <div className="mt-6 border border-rule bg-void-deep p-8">
                  <p className="font-display text-lg leading-relaxed text-ivory/85 italic" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.8' }}>
                    &ldquo;{profile.lore.creationMyth}&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Core Belief */}
            <Reveal>
              <div>
                <span className="label" style={{ color: profile.color }}>Core Belief</span>
                <div className="mt-6 border border-rule bg-void-deep p-8">
                  <p className="text-lg leading-relaxed text-ivory/80" style={{ lineHeight: '1.8' }}>
                    {profile.lore.coreBelief}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Sacred Symbol & Taboo */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Reveal>
                <div className="border border-rule bg-void-deep p-8">
                  <span className="label" style={{ color: profile.color }}>Sacred Symbol</span>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center border" style={{ borderColor: `${profile.color}30` }}>
                      <div className="h-3 w-3 rotate-45" style={{ backgroundColor: profile.color }} />
                    </div>
                    <p className="text-sm text-ivory/70">{profile.lore.sacredSymbol}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="border border-rule bg-void-deep p-8">
                  <span className="label text-ember">Taboo</span>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.7' }}>
                    {profile.lore.taboo}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>

      {/* Other Civilizations */}
      <section className="border-t border-rule bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="label text-gold">Explore Other Worlds</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {Object.values(CIVILIZATION_PROFILES)
                .filter((c) => c.slug !== slug)
                .map((civ) => (
                  <Link
                    key={civ.slug}
                    href={`/civilization/${civ.slug}`}
                    className="group border border-rule bg-void p-4 text-center transition-all duration-500 hover:border-gold/30"
                  >
                    <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: civ.color }} />
                    </div>
                    <p className="font-display text-sm text-ivory/80" style={{ fontFamily: 'var(--font-display), serif' }}>{civ.name}</p>
                    <p className="mt-1 label text-ivory/30">{civ.genre}</p>
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
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
