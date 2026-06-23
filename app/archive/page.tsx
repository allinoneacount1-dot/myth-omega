'use client';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AgentGlyph } from '@/components/agent-glyphs';
import { AGENTS, ECOSYSTEM } from '@/lib/content';

// ─── Data ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  agent: string;
  civ: string;
  event: string;
  time: string;
  type: string;
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  { agent: 'Oracle', civ: 'Aetheria', event: 'Predicted the Sundering of the Eastern Provinces', time: '2h ago', type: 'prediction' },
  { agent: 'Worldbuilder', civ: 'The Amber Highlands', event: 'Generated geography: The Crystalline Depths', time: '5h ago', type: 'creation' },
  { agent: 'Historian', civ: 'Chronos Veil', event: 'Resolved canon conflict: Timeline divergence in Chapter 7', time: '1d ago', type: 'resolution' },
  { agent: 'Narrator', civ: 'Ember Accord', event: 'Composed event: The Festival of Echoes', time: '2d ago', type: 'event' },
  { agent: 'Diplomat', civ: 'Aetheria', event: 'Negotiated treaty with Ember Accord', time: '3d ago', type: 'treaty' },
  { agent: 'Archivist', civ: 'Void Meridian', event: 'Indexed artifact: The Obsidian Codex', time: '4d ago', type: 'artifact' },
  { agent: 'Lorekeeper', civ: 'Silent Bloom', event: 'Rejected canon proposal: The False Prophet narrative', time: '5d ago', type: 'canon_review' },
  { agent: 'Oracle', civ: 'Chronos Veil', event: 'Foretold: The Last Transmission', time: '1w ago', type: 'prediction' },
  { agent: 'Worldbuilder', civ: 'Ember Accord', event: 'Expanded territory: The Ashlands Frontier', time: '1w ago', type: 'creation' },
  { agent: 'Historian', civ: 'The Amber Highlands', event: 'Canonized: Founding myth of the Three Kings', time: '2w ago', type: 'canon' },
];

interface CivNode {
  name: string;
  x: number;
  y: number;
  color: string;
  agents: string[];
}

const CIV_NODES: CivNode[] = [
  { name: 'Aetheria', x: 20, y: 30, color: '#D8B36A', agents: ['Oracle', 'Diplomat'] },
  { name: 'The Amber Highlands', x: 75, y: 22, color: '#E8C547', agents: ['Worldbuilder', 'Historian'] },
  { name: 'Chronos Veil', x: 50, y: 55, color: '#3AE9E0', agents: ['Historian', 'Oracle'] },
  { name: 'Ember Accord', x: 30, y: 72, color: '#A33A4A', agents: ['Narrator', 'Worldbuilder'] },
  { name: 'Void Meridian', x: 80, y: 65, color: '#7B6BA5', agents: ['Archivist'] },
  { name: 'Silent Bloom', x: 15, y: 50, color: '#5BA89F', agents: ['Lorekeeper'] },
];

interface CivConnection {
  from: number;
  to: number;
  label: string;
  agents: string[];
}

const CIV_CONNECTIONS: CivConnection[] = [
  { from: 0, to: 3, label: 'Treaty: Eastern Accord', agents: ['Diplomat'] },
  { from: 0, to: 2, label: 'Canon: Sundering Prophecy', agents: ['Oracle'] },
  { from: 1, to: 2, label: 'Trade: Crystal Passage', agents: ['Worldbuilder', 'Historian'] },
  { from: 3, to: 4, label: 'Pact: Shadow Covenant', agents: ['Narrator'] },
  { from: 4, to: 5, label: 'Exchange: Bloom Codex', agents: ['Archivist', 'Lorekeeper'] },
  { from: 1, to: 3, label: 'War: The Fractured Age', agents: ['Historian', 'Narrator'] },
  { from: 2, to: 0, label: 'Alliance: Temporal Pact', agents: ['Oracle', 'Diplomat'] },
  { from: 5, to: 1, label: 'Treaty: Root Accord', agents: ['Lorekeeper'] },
];

const SIDEBAR_STATS = [
  { label: 'Total Events', value: '1,247' },
  { label: 'Active Agents', value: '7' },
  { label: 'Civilizations', value: '6' },
  { label: 'Canon Entries', value: '89' },
  { label: 'Last Updated', value: 'Live' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FILTERS = ['All', 'Historian', 'Archivist', 'Lorekeeper', 'Oracle', 'Diplomat', 'Worldbuilder', 'Narrator'] as const;
const VIEW_MODES = ['Timeline', 'Grid', 'Network'] as const;

const TYPE_COLORS: Record<string, string> = {
  prediction: '#3AE9E0',
  creation: '#D8B36A',
  resolution: '#7B6BA5',
  event: '#A33A4A',
  treaty: '#5BA89F',
  artifact: '#E8C547',
  canon_review: '#9A9389',
  canon: '#D8B36A',
};

function getAgentColor(name: string): string {
  const colors: Record<string, string> = {
    Historian: '#7B6BA5',
    Archivist: '#5BA89F',
    Lorekeeper: '#3AE9E0',
    Oracle: '#D8B36A',
    Diplomat: '#A33A4A',
    Worldbuilder: '#E8C547',
    Narrator: '#9A9389',
  };
  return colors[name] || '#D8B36A';
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ArchivePage() {
  return (
    <main className="bg-void text-ivory min-h-screen">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Particle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute h-[3px] w-[3px] rounded-full bg-gold/40"
              style={{
                left: `${10 + (i * 67) % 80}%`,
                top: `${8 + (i * 43) % 80}%`,
                animation: `particleFloat ${4 + (i % 3)}s ease-in-out infinite ${(i * 0.3) % 2}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(216,179,106,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_70%,rgba(58,233,224,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #D8B36A 1px, transparent 1px)', backgroundSize: '56px 56px' }} />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <span className="hero-fade-up hero-delay-1 label text-gold inline-block">The Living Archive</span>
          <h1 className="hero-fade-up hero-delay-2 headline-editorial mt-6 text-ivory">
            Every Decision.<br />Every Artifact.<br />Every Moment.
          </h1>
          <p className="hero-fade-up hero-delay-3 mx-auto mt-8 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl" style={{ fontFamily: 'var(--font-display), serif' }}>
            A persistent, queryable inheritance of every civilization&apos;s evolution. Browse by timeline, by agent, by connection.
          </p>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ═══ FILTER BAR + CONTENT LAYOUT ═══ */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">

        {/* ─── FILTER BAR ─── */}
        <div className="sticky top-[72px] z-40 -mx-6 bg-void/85 backdrop-blur-xl border-b border-rule px-6 py-4 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = filter === 'All';
                return (
                  <span
                    key={filter}
                    className={`label cursor-pointer border px-3.5 py-2 transition-all duration-300 ${
                      isActive
                        ? 'border-gold/50 text-gold bg-gold/5'
                        : 'border-rule text-ivory/55 hover:border-gold/30 hover:text-ivory/80'
                    }`}
                  >
                    {filter}
                  </span>
                );
              })}
            </div>

            {/* View Toggle + Search */}
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center border border-rule">
                {VIEW_MODES.map((mode) => {
                  const isActive = mode === 'Timeline';
                  return (
                    <span
                      key={mode}
                      className={`label cursor-pointer px-4 py-2 transition-colors duration-300 ${
                        isActive
                          ? 'text-gold bg-gold/5'
                          : 'text-ivory/45 hover:text-ivory/70'
                      }`}
                    >
                      {mode}
                    </span>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative hidden md:block">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/30"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <div className="label w-56 border border-rule bg-void-deep py-2.5 pl-10 pr-4 text-ivory/30">
                  Search events, artifacts, civilizations...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MAIN CONTENT + SIDEBAR ─── */}
        <div className="mt-12 gap-12 lg:flex">
          {/* ─── CONTENT AREA ─── */}
          <div className="flex-1">

            {/* ═══ TIMELINE VIEW ═══ */}
            <div>
              {TIMELINE_ENTRIES.map((entry, i) => {
                const agentColor = getAgentColor(entry.agent);
                const typeColor = TYPE_COLORS[entry.type] || '#D8B36A';
                return (
                  <Reveal key={i} delay={0.05 * i}>
                    <div
                      className="group relative flex items-start gap-5 border-l border-rule px-6 py-6 pl-8 transition-colors duration-500 hover:bg-sapphire/20"
                      style={{ animation: `timelineSlideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.05 * i}s both` }}
                    >
                      {/* Gold accent dot */}
                      <div
                        className="absolute -left-[5px] top-[32px] h-[9px] w-[9px] rounded-full"
                        style={{ background: typeColor, boxShadow: `0 0 8px ${typeColor}40` }}
                      />

                      {/* Agent Glyph */}
                      <div
                        className="shrink-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ color: agentColor }}
                      >
                        <AgentGlyph name={entry.agent} size={36} stroke={agentColor} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                          <span
                            className="label px-2 py-0.5 border"
                            style={{ color: typeColor, borderColor: `${typeColor}40`, background: `${typeColor}10` }}
                          >
                            {entry.agent}
                          </span>
                          <span className="label text-gold/60">{entry.civ}</span>
                          <span className="label text-ivory/35">{entry.time}</span>
                        </div>
                        <p className="mt-2 text-[15px] leading-relaxed text-ivory/80">
                          {entry.event}
                        </p>
                      </div>

                      {/* Type indicator */}
                      <div className="shrink-0 hidden sm:block">
                        <span
                          className="label opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ color: typeColor }}
                        >
                          {entry.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* ═══ GRID VIEW (static structure for toggling) ═══ */}
            <div className="hidden">
              {TIMELINE_ENTRIES.map((entry, i) => {
                const agentColor = getAgentColor(entry.agent);
                return (
                  <Reveal key={i} delay={0.06 * i}>
                    <article
                      className="group border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/30"
                      style={{ animation: `gridCardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 * i}s both` }}
                    >
                      <div className="mb-4 transition-transform duration-700 group-hover:scale-105" style={{ color: agentColor }}>
                        <AgentGlyph name={entry.agent} size={40} stroke={agentColor} />
                      </div>
                      <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                        {entry.event}
                      </h4>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="label text-gold/60">{entry.civ}</span>
                        <span className="text-ivory/20">·</span>
                        <span className="label text-ivory/40">{entry.time}</span>
                      </div>
                      <p className="mt-3 text-sm text-ivory/55 leading-relaxed">
                        {entry.agent} recorded a {entry.type.replace('_', ' ')} event in {entry.civ}.
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* ═══ NETWORK VIEW ═══ */}
            <div className="hidden">
              <div className="relative w-full border border-rule bg-void-deep" style={{ height: '500px' }}>
                {/* Connection lines (SVG) */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {CIV_CONNECTIONS.map((conn, i) => {
                    const from = CIV_NODES[conn.from];
                    const to = CIV_NODES[conn.to];
                    const midX = (from.x + to.x) / 2;
                    const midY = (from.y + to.y) / 2;
                    return (
                      <g key={i}>
                        <line
                          x1={from.x}
                          y1={from.y}
                          x2={to.x}
                          y2={to.y}
                          stroke="#D8B36A"
                          strokeWidth="0.15"
                          opacity="0.3"
                          strokeDasharray="0.5 0.3"
                        />
                        <foreignObject x={midX - 4} y={midY - 2} width="8" height="4">
                          <div className="flex items-center justify-center gap-0.5">
                            {conn.agents.map((a, ai) => (
                              <span
                                key={ai}
                                className="label text-center"
                                style={{ fontSize: '1.2px', color: getAgentColor(a) }}
                              >
                                {a.charAt(0)}
                              </span>
                            ))}
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </svg>

                {/* Civilization nodes */}
                {CIV_NODES.map((civ, i) => (
                  <Reveal key={i} delay={0.1 * i}>
                    <div
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${civ.x}%`,
                        top: `${civ.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Node circle */}
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 hover:scale-125"
                        style={{
                          borderColor: civ.color,
                          background: `${civ.color}10`,
                          animation: 'nodePulse 3s ease-in-out infinite',
                        }}
                      >
                        <span className="label" style={{ color: civ.color, fontSize: '8px' }}>
                          {civ.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      {/* Name label */}
                      <span
                        className="mt-2 text-center label whitespace-nowrap"
                        style={{ color: `${civ.color}cc`, fontSize: '9px' }}
                      >
                        {civ.name}
                      </span>
                      {/* Agent badges */}
                      <div className="mt-1 flex flex-wrap justify-center gap-0.5">
                        {civ.agents.map((agent) => (
                          <span
                            key={agent}
                            className="label px-1 py-px"
                            style={{
                              fontSize: '7px',
                              color: getAgentColor(agent),
                              border: `0.5px solid ${getAgentColor(agent)}40`,
                              background: `${getAgentColor(agent)}08`,
                            }}
                          >
                            {agent}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 border border-rule bg-void/80 p-3 backdrop-blur-sm">
                  <span className="label text-ivory/40 block mb-2">Agent Activity</span>
                  {AGENTS.map((agent) => (
                    <div key={agent.name} className="flex items-center gap-2 mb-1">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: getAgentColor(agent.name) }} />
                      <span className="label" style={{ fontSize: '8px', color: `${getAgentColor(agent.name)}aa` }}>
                        {agent.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="mt-12 w-full shrink-0 space-y-6 lg:mt-0 lg:w-64">
            <Reveal>
              <div className="border border-rule bg-void-deep p-6">
                <span className="label text-gold/60 block mb-4">Network Status</span>
                <div className="space-y-4">
                  {SIDEBAR_STATS.map((stat) => (
                    <div key={stat.label} className="flex items-baseline justify-between">
                      <span className="label text-ivory/45">{stat.label}</span>
                      <span className={`label ${stat.value === 'Live' ? 'text-cyan' : 'text-ivory'}`}>
                        {stat.value === 'Live' && (
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan mr-1.5 align-middle" style={{ animation: 'heroPulseGlow 2s ease-in-out infinite' }} />
                        )}
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-rule bg-void-deep p-6">
                <span className="label text-gold/60 block mb-4">Active Agents</span>
                <div className="space-y-3">
                  {AGENTS.map((agent) => (
                    <div key={agent.name} className="flex items-center gap-3">
                      <div className="shrink-0" style={{ color: getAgentColor(agent.name) }}>
                        <AgentGlyph name={agent.name} size={24} stroke={getAgentColor(agent.name)} />
                      </div>
                      <div className="min-w-0">
                        <span className="label block text-ivory/80">{agent.name}</span>
                        <span className="label block text-ivory/35">{agent.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border border-rule bg-void-deep p-6">
                <span className="label text-gold/60 block mb-4">Civilizations</span>
                <div className="space-y-3">
                  {CIV_NODES.map((civ) => (
                    <div key={civ.name} className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ background: `${civ.color}30`, border: `1px solid ${civ.color}` }}
                      />
                      <div className="min-w-0">
                        <span className="label block truncate" style={{ color: `${civ.color}cc` }}>
                          {civ.name}
                        </span>
                        <span className="label block text-ivory/30">
                          {civ.agents.length} agent{civ.agents.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="border border-gold/20 bg-gold/5 p-6">
                <span className="label text-gold/60 block mb-3">Archive Engine</span>
                <p className="text-sm text-ivory/60 leading-relaxed" style={{ lineHeight: '1.65' }}>
                  Powered by persistent memory layers. Every action across every civilization is indexed, queryable, and immutable.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan" style={{ animation: 'heroPulseGlow 3s ease-in-out infinite' }} />
                  <span className="label text-cyan/80">All systems operational</span>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* ═══ ECOSYSTEM SECTION ═══ */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionDivider variant="glyph" />
        <Reveal>
          <div className="text-center mb-16">
            <span className="label text-gold">Connected Systems</span>
            <h2 className="headline-section mt-6 text-ivory">The MYTH Ecosystem</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/60" style={{ fontFamily: 'var(--font-display), serif' }}>
              The Archive is one layer of a living infrastructure. Every system feeds the canon.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM.map((eco, i) => (
            <Reveal key={eco.name} delay={0.05 * i}>
              <article className="group flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/30">
                <span className="label text-gold/50">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="mt-4 font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{eco.name}</h4>
                <p className="mt-3 text-sm text-ivory/55 leading-relaxed">{eco.desc}</p>
                <div className="mt-auto pt-6 h-px w-8 bg-gold/30 transition-all duration-700 group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-rule bg-void-deep mt-24">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <MythMark size={40} stroke="#F7F4EE" />
              <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>MYTH</span>
            </div>
            <p className="mt-6 max-w-md text-sm text-ivory/55" style={{ lineHeight: '1.7' }}>
              The first Culture Engine. Infrastructure for civilizations that intend to be remembered.
            </p>
            <p className="mt-8 label text-ivory/30">&copy; 2026 MYTH Foundation</p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
