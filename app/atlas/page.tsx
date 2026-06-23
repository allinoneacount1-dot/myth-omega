'use client';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';


interface Civilization {
  id: number;
  name: string;
  genre: string;
  members: number;
  health: number;
  canonEntries: number;
  era: string;
  location: string;
  agents: string[];
  color: string;
  description: string;
  keyLocations: string[];
  angle: number;
}

const CIVILIZATIONS: Civilization[] = [
  {
    id: 1,
    name: 'Aetheria',
    genre: 'Mythic Fantasy',
    members: 2847,
    health: 94,
    canonEntries: 142,
    era: 'Ascension',
    location: 'The Crystalline Provinces',
    agents: ['Oracle', 'Diplomat'],
    color: '#D8B36A',
    description: 'A realm where mythic forces shape the very bedrock of existence. Floating citadels of crystal catch the light of three suns, while ancient prophecies echo through corridors of living stone.',
    keyLocations: ['The Crystalline Provinces', 'The Oracle Sanctum', 'The Bridge of Echoes'],
    angle: 0,
  },
  {
    id: 2,
    name: 'Chronos Veil',
    genre: 'Sci-Fi Noir',
    members: 1203,
    health: 78,
    canonEntries: 89,
    era: 'Maturity',
    location: 'The Temporal Districts',
    agents: ['Historian', 'Archivist'],
    color: '#3AE9E0',
    description: 'A civilization caught in the folds of its own timeline. Neon-lit streets stretch across dimensions where past and future bleed together, and memory is the only currency that matters.',
    keyLocations: ['The Temporal Districts', 'The Archive Infinite', 'The Midnight Meridian'],
    angle: 60,
  },
  {
    id: 3,
    name: 'The Amber Highlands',
    genre: 'Epic Saga',
    members: 5621,
    health: 97,
    canonEntries: 312,
    era: 'Ascension',
    location: 'The Golden Plateaus',
    agents: ['Worldbuilder', 'Historian'],
    color: '#A88B4F',
    description: 'Vast golden plateaus stretch beneath an eternal twilight, where the greatest stories ever told are carved into mountainsides and the wind carries the songs of a thousand generations.',
    keyLocations: ['The Golden Plateaus', 'The Chronicle Peaks', 'The Hall of Ancestors'],
    angle: 120,
  },
  {
    id: 4,
    name: 'Void Meridian',
    genre: 'Cosmic Horror',
    members: 892,
    health: 62,
    canonEntries: 56,
    era: 'Genesis',
    location: 'The Breach Zone',
    agents: ['Oracle', 'Lorekeeper'],
    color: '#9B4DFF',
    description: 'Born from the tear between dimensions, this civilization thrives at the edge of the known. Reality bends here — and those who dwell within have learned to speak the language of the void.',
    keyLocations: ['The Breach Zone', 'The Threshold Sanctum', 'The Whispering Dark'],
    angle: 180,
  },
  {
    id: 5,
    name: 'Ember Accord',
    genre: 'Political Drama',
    members: 3410,
    health: 88,
    canonEntries: 201,
    era: 'Maturity',
    location: 'The Capital Rings',
    agents: ['Diplomat', 'Narrator'],
    color: '#FF4D00',
    description: 'A civilization forged in the fires of negotiation and narrative. Seven capital rings orbit each other in an eternal dance of power, where every alliance is a story and every betrayal reshapes the map.',
    keyLocations: ['The Capital Rings', 'The Accord Chamber', 'The Ember Forum'],
    angle: 240,
  },
  {
    id: 6,
    name: 'Silent Bloom',
    genre: 'Pastoral Mystery',
    members: 1567,
    health: 71,
    canonEntries: 78,
    era: 'Ascension',
    location: 'The Verdant Basin',
    agents: ['Narrator', 'Worldbuilder'],
    color: '#00B4A8',
    description: 'Beneath a canopy of ancient trees, mysteries unfold in the spaces between seasons. The people of the basin speak in riddles and tend gardens that grow stories instead of fruit.',
    keyLocations: ['The Verdant Basin', 'The Garden of Whispers', 'The Root Labyrinth'],
    angle: 300,
  },
];

const CONNECTIONS = [
  {
    title: 'Shared Mythology',
    subtitle: 'Cross-Canon Elements',
    description: 'The Oracle appears in both Aetheria and Void Meridian — a bridge between prophecy and the void. Shared mythological elements weave these worlds into a greater tapestry.',
    icon: 'glyph-culture',
  },
  {
    title: 'Agent Crossover',
    subtitle: 'The Seven Across Six',
    description: 'The Historian tends both Chronos Veil and The Amber Highlands. The Diplomat walks Aetheria and Ember Accord. Each agent carries threads between worlds, binding the canon together.',
    icon: 'glyph-engine',
  },
  {
    title: 'Treaty Networks',
    subtitle: 'Diplomatic Bonds',
    description: 'The Diplomat has negotiated the Accord of Three Rings between Aetheria, Ember Accord, and The Amber Highlands. Void Meridian observes from the Breach Zone, considering its terms.',
    icon: 'glyph-civilization',
  },
  {
    title: 'Canon Overlap',
    subtitle: 'Interconnected Lore',
    description: 'The Crystalline Depths of Aetheria share a border with the Golden Plateaus. The Verdant Basin feeds the Temporal Districts through underground rivers of narrative. No world stands alone.',
    icon: 'glyph-myth',
  },
];

function getHealthColor(health: number): string {
  if (health >= 85) return '#00B4A8';
  if (health >= 70) return '#D8B36A';
  return '#A33A4A';
}

function getAgentGlyph(agentName: string): string {
  const map: Record<string, string> = {
    Oracle: 'eye',
    Diplomat: 'bridge',
    Historian: 'archive',
    Archivist: 'book',
    Worldbuilder: 'mountain',
    Narrator: 'wave',
    Lorekeeper: 'shield',
  };
  return map[agentName] || 'myth';
}

export default function AtlasPage() {
  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero Section */}
      <section className="section-md pt-40 text-center">
        <Reveal>
          <span className="label text-gold hero-slide-down hero-delay-1">MYTH Atlas</span>
          <h1 className="headline-hero mt-6 text-ivory hero-slide-up hero-delay-2">Explore the Living World</h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl hero-fade-in hero-delay-3" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.5' }}>
            Six civilizations. One interconnected atlas. Discover worlds, trace histories, travel the living canon.
          </p>
        </Reveal>
      </section>

      {/* Atlas Map Section */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Interactive Atlas</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">Hover to explore</span>
          </div>
        </Reveal>

        {/* CSS Atlas Map */}
        <div className="atlas-map-container relative mx-auto aspect-square w-full max-w-[900px]">
          {/* Connection lines from center to each node */}
          {CIVILIZATIONS.map((civ) => (
            <div
              key={`line-${civ.id}`}
              className="atlas-connection-line absolute left-1/2 top-1/2 origin-left"
              style={{
                width: '45%',
                height: '1px',
                transform: `rotate(${civ.angle}deg)`,
                background: `linear-gradient(90deg, ${civ.color}40, ${civ.color}10)`,
              }}
            />
          ))}

          {/* Central Nexus */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="atlas-nexus relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 bg-void-deep md:h-36 md:w-36">
              <div className="absolute inset-0 rounded-full border border-gold/20 animate-[heroSpin_60s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-gold/10 animate-[heroSpin_45s_linear_infinite_reverse]" />
              <div className="relative flex flex-col items-center">
                <MythMark size={36} stroke="#D8B36A" />
                <span className="mt-1 label text-gold/80" style={{ fontSize: '9px' }}>NEXUS</span>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full animate-[nodePulse_3s_ease-in-out_infinite] border border-gold/20" />
              <div className="absolute inset-[-8px] rounded-full animate-[nodePulse_3s_ease-in-out_infinite_1s] border border-gold/10" />
            </div>
          </div>

          {/* Civilization Nodes */}
          {CIVILIZATIONS.map((civ) => {
            const radius = 42;
            const rad = (civ.angle * Math.PI) / 180;
            const x = 50 + radius * Math.cos(rad);
            const y = 50 + radius * Math.sin(rad);

            return (
              <div
                key={civ.id}
                className="atlas-node absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="group relative cursor-pointer"
                  style={{ '--civ-color': civ.color } as React.CSSProperties}
                >
                  {/* Node circle */}
                  <div
                    className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full border border-rule bg-void-deep transition-all duration-700 group-hover:border-gold/50 group-hover:scale-110 md:h-24 md:w-24"
                    style={{ boxShadow: `0 0 0 0px ${civ.color}00` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${civ.color}30`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0px ${civ.color}00`; }}
                  >
                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${civ.color}15, transparent 70%)` }}
                    />
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: civ.color }}
                    />
                    <span className="mt-1 text-center font-display text-[10px] text-ivory/90 md:text-xs" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {civ.name}
                    </span>
                  </div>

                  {/* Expanded detail on hover */}
                  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-4 w-64 -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                    <div className="border border-rule bg-void-deep/95 backdrop-blur-md p-5">
                      <div className="absolute left-1/2 top-0 h-px w-12 -translate-x-1/2 -translate-y-0" style={{ background: `linear-gradient(90deg, transparent, ${civ.color}, transparent)` }} />
                      <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{civ.name}</h4>
                      <p className="mt-1 label" style={{ color: civ.color }}>{civ.genre}</p>
                      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-rule pt-3">
                        <div>
                          <p className="label text-ivory/40">Members</p>
                          <p className="mt-0.5 font-mono text-sm text-ivory">{civ.members.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="label text-ivory/40">Health</p>
                          <p className="mt-0.5 font-mono text-sm" style={{ color: getHealthColor(civ.health) }}>{civ.health}%</p>
                        </div>
                      </div>
                      <div className="mt-3 h-1 w-full bg-rule/30">
                        <div className="h-full transition-all duration-1000" style={{ width: `${civ.health}%`, backgroundColor: getHealthColor(civ.health) }} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {civ.agents.map((agent) => (
                          <span key={agent} className="label border border-rule px-2 py-0.5 text-ivory/60" style={{ fontSize: '8px' }}>
                            {agent}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* Civilization Detail Panel */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Civilization Profiles</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">06 / 06</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CIVILIZATIONS.map((civ) => (
            <Reveal key={civ.id}>
              <article className="group relative border border-rule bg-void-deep p-8 glow-hover transition-all duration-700">
                {/* Top accent line */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${civ.color}, transparent)` }} />

                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="label text-ivory/40">#{String(civ.id).padStart(3, '0')}</span>
                    <h3 className="mt-3 font-display text-xl text-ivory md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>{civ.name}</h3>
                    <p className="mt-1 label" style={{ color: civ.color }}>{civ.genre}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center border border-rule">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: civ.color }} />
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-relaxed text-ivory/60" style={{ lineHeight: '1.7' }}>
                  {civ.description}
                </p>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-rule pt-6">
                  <div>
                    <p className="label text-ivory/40">Members</p>
                    <p className="mt-1 font-mono text-lg text-ivory">{civ.members.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="label text-ivory/40">Health</p>
                    <p className="mt-1 font-mono text-lg" style={{ color: getHealthColor(civ.health) }}>{civ.health}%</p>
                  </div>
                  <div>
                    <p className="label text-ivory/40">Canon Depth</p>
                    <p className="mt-1 font-mono text-lg text-gold">{civ.canonEntries}</p>
                  </div>
                </div>

                {/* Health Bar */}
                <div className="mt-4 h-1 w-full bg-rule/30">
                  <div className="h-full bg-gradient-to-r from-gold/80 to-gold/30 transition-all duration-1000" style={{ width: `${civ.health}%` }} />
                </div>

                {/* Current Chapter */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="label text-ivory/40">Current Chapter</span>
                  <span className="label border border-rule px-3 py-1 text-ivory/70">{civ.era}</span>
                </div>

                {/* Key Locations */}
                <div className="mt-4">
                  <p className="label text-ivory/40">Key Locations</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {civ.keyLocations.map((loc) => (
                      <span key={loc} className="label border border-rule/50 px-2 py-1 text-ivory/50" style={{ fontSize: '9px' }}>
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Agents */}
                <div className="mt-6">
                  <p className="label text-ivory/40">Active Agents</p>
                  <div className="mt-2 flex gap-2">
                    {civ.agents.map((agent) => (
                      <span key={agent} className="label border border-gold/30 px-3 py-1 text-gold/80" style={{ fontSize: '9px' }}>
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Button */}
                <div className="mt-8">
                  <button className="label w-full border border-rule py-4 text-ivory/60 transition-all duration-500 hover:border-gold/40 hover:text-gold" style={{ fontSize: '10px' }}>
                    Explore {civ.name} <span aria-hidden="true" className="ml-2">→</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* Discover Connections Section */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="label text-gold hero-slide-down hero-delay-1">Discover Connections</span>
            <h2 className="headline-section mt-6 text-ivory hero-slide-up hero-delay-2">The Threads Between Worlds</h2>
            <p className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/60 md:text-lg" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
              No civilization stands alone. Trace the threads that weave six worlds into one living canon.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CONNECTIONS.map((conn, i) => (
            <Reveal key={conn.title} delay={i * 0.1}>
              <div className="group relative border border-rule bg-void-deep p-8 transition-all duration-700 hover:border-gold/30 glow-hover">
                <div className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-rule bg-void">
                    <div className="h-3 w-3 rounded-full bg-gold/40 transition-all duration-500 group-hover:bg-gold group-hover:shadow-[0_0_16px_rgba(216,179,106,0.4)]" />
                  </div>
                  <div className="flex-1">
                    <span className="label text-gold/60">{conn.subtitle}</span>
                    <h4 className="mt-2 font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{conn.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-ivory/55" style={{ lineHeight: '1.7' }}>{conn.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">Begin Your Journey</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/70 md:text-lg" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
            The atlas is open. The civilizations await. Which world will you explore first?
          </p>
          <a href="/civilization" className="label mt-10 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
            Enter the Atlas<span aria-hidden="true">→</span>
          </a>
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
          <p className="mt-8 label text-ivory/30">&copy; 2026 MYTH Foundation</p>
        </div>
      </footer>
    </main>
  );
}
