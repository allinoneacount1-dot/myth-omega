'use client';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENTS, ECOSYSTEM } from '@/lib/content';

// ─── Data ────────────────────────────────────────────────────────────────────

const CIVILIZATIONS = [
  { id: 'aetheria', name: 'Aetheria', genre: 'Mythic Fantasy', members: 2847, color: '#D8B36A', x: 50, y: 10 },
  { id: 'chronos', name: 'Chronos Veil', genre: 'Sci-Fi Noir', members: 1203, color: '#3AE9E0', x: 88, y: 30 },
  { id: 'amber', name: 'Amber Highlands', genre: 'Epic Saga', members: 5621, color: '#A88B4F', x: 75, y: 70 },
  { id: 'void', name: 'Void Meridian', genre: 'Cosmic Horror', members: 892, color: '#9B4DFF', x: 25, y: 70 },
  { id: 'ember', name: 'Ember Accord', genre: 'Political Drama', members: 3410, color: '#FF4D00', x: 12, y: 30 },
  { id: 'silent', name: 'Silent Bloom', genre: 'Pastoral Mystery', members: 1567, color: '#00B4A8', x: 50, y: 90 },
] as const;

type Relationship = 'alliance' | 'rivalry' | 'trade' | 'neutral';

interface DiplomaticRelation {
  from: string;
  to: string;
  type: Relationship;
  label: string;
}

const RELATIONS: DiplomaticRelation[] = [
  { from: 'aetheria', to: 'ember', type: 'rivalry', label: 'Ideological conflict — order vs revolution' },
  { from: 'aetheria', to: 'chronos', type: 'alliance', label: 'Shared temporal research' },
  { from: 'aetheria', to: 'silent', type: 'trade', label: 'Cultural exchange — art for food' },
  { from: 'chronos', to: 'void', type: 'rivalry', label: 'Reality philosophy clash' },
  { from: 'chronos', to: 'amber', type: 'alliance', label: 'Historical documentation partnership' },
  { from: 'amber', to: 'ember', type: 'trade', label: 'Resources for protection' },
  { from: 'amber', to: 'silent', type: 'alliance', label: 'Pastoral peace treaty' },
  { from: 'void', to: 'ember', type: 'neutral', label: 'No contact' },
  { from: 'void', to: 'silent', type: 'rivalry', label: 'Cosmic horror vs pastoral peace' },
  { from: 'ember', to: 'silent', type: 'trade', label: 'Protection for isolation' },
];

interface Treaty {
  name: string;
  parties: [string, string];
  type: 'Alliance' | 'Trade' | 'Non-Aggression';
  status: 'Active' | 'Pending' | 'Under Review';
  established: string;
  terms: string;
}

const TREATIES: Treaty[] = [
  {
    name: 'The Temporal Concord',
    parties: ['Aetheria', 'Chronos Veil'],
    type: 'Alliance',
    status: 'Active',
    established: 'Cycle 44',
    terms: 'Joint research into the nature of canon-time. Shared access to the Archive of Echoes. Neither civilization may alter the other\'s past without consent.',
  },
  {
    name: 'The Amber Compact',
    parties: ['Amber Highlands', 'Ember Accord'],
    type: 'Trade',
    status: 'Active',
    established: 'Cycle 31',
    terms: 'Amber provides raw narrative materials and food canon. Ember Accord provides military protection and political intelligence along the northern border.',
  },
  {
    name: 'The Verdant Accord',
    parties: ['Amber Highlands', 'Silent Bloom'],
    type: 'Alliance',
    status: 'Active',
    established: 'Cycle 28',
    terms: 'Pastoral peace treaty. Shared stewardship of the Borderlands. Mutual defense against external existential threats.',
  },
  {
    name: 'The Ember Isolation Pact',
    parties: ['Ember Accord', 'Silent Bloom'],
    type: 'Trade',
    status: 'Under Review',
    established: 'Cycle 51',
    terms: 'Ember Accord provides armed escorts through the Whispering Passages. Silent Bloom maintains diplomatic silence and non-interference in Ember internal affairs.',
  },
  {
    name: 'The Veil Non-Aggression Treaty',
    parties: ['Chronos Veil', 'Void Meridian'],
    type: 'Non-Aggression',
    status: 'Pending',
    established: 'Cycle 58',
    terms: 'Prohibition on reality-altering incursions into each other\'s canonical space. Mediation required before any cross-reality expedition.',
  },
];

const DIPLOMATIC_FEED = [
  { time: '2m ago', event: 'Diplomat from Aetheria proposed cultural exchange with Silent Bloom' },
  { time: '15m ago', event: 'Chronos Veil historian completed joint canon review with Amber Highlands' },
  { time: '32m ago', event: 'Ember Accord trade delegation arrived at Amber Highlands' },
  { time: '1h ago', event: 'Void Meridian issued diplomatic warning to Chronos Veil' },
  { time: '2h ago', event: 'Silent Bloom mediator appointed for Aetheria-Ember Accord tensions' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCivilization(id: string) {
  return CIVILIZATIONS.find((c) => c.id === id)!;
}

function getRelationStyle(type: Relationship): { borderStyle: string; color: string; label: string } {
  switch (type) {
    case 'alliance':
      return { borderStyle: 'solid', color: '#D8B36A', label: 'Alliance' };
    case 'rivalry':
      return { borderStyle: 'dashed', color: '#A33A4A', label: 'Rivalry' };
    case 'trade':
      return { borderStyle: 'dotted', color: '#3AE9E0', label: 'Trade' };
    case 'neutral':
      return { borderStyle: 'dashed', color: 'rgba(247,244,238,0.15)', label: 'Neutral' };
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Active': return '#00B4A8';
    case 'Pending': return '#D8B36A';
    case 'Under Review': return '#9B4DFF';
    default: return '#F7F4EE';
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DiplomacyPage() {
  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="section-md relative overflow-hidden pt-40 text-center">
        {/* CSS particle background */}
        <div className="diplo-particles absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="diplo-particle absolute rounded-full"
              style={{
                left: `${(i * 37 + 13) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                backgroundColor: i % 3 === 0 ? '#D8B36A' : i % 3 === 1 ? '#3AE9E0' : '#9B4DFF',
                opacity: 0.15 + (i % 5) * 0.05,
                animationDelay: `${(i * 0.4) % 8}s`,
                animationDuration: `${6 + (i % 5) * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Reveal>
            <span className="label text-gold">Diplomat Agent</span>
            <h1 className="headline-hero mt-6 text-ivory">The Web of Civilizations</h1>
            <p className="mx-auto mt-8 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.5' }}>
              Six civilizations exist in relation to one another. Alliances. Rivalries. Shared canon. Trade routes of meaning.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ─── Diplomacy Map ─────────────────────────────────────────────── */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Network Map</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">Six nodes · Ten connections</span>
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal>
          <div className="mb-12 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 border-t border-gold" style={{ borderStyle: 'solid' }} />
              <span className="label text-ivory/50">Alliance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 border-t border-ember" style={{ borderStyle: 'dashed' }} />
              <span className="label text-ivory/50">Rivalry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 border-t border-cyan" style={{ borderStyle: 'dotted' }} />
              <span className="label text-ivory/50">Trade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 border-t border-ivory/15" style={{ borderStyle: 'dashed' }} />
              <span className="label text-ivory/50">Neutral</span>
            </div>
          </div>
        </Reveal>

        {/* Network Diagram Container */}
        <Reveal>
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[960px] border border-rule bg-void-deep">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(247,244,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(247,244,238,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            {/* Connection Lines */}
            {RELATIONS.map((rel, i) => {
              const from = getCivilization(rel.from);
              const to = getCivilization(rel.to);
              const style = getRelationStyle(rel.type);
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <div key={i}>
                  {/* Line */}
                  <div
                    className="absolute"
                    style={{
                      left: `${Math.min(from.x, to.x)}%`,
                      top: `${Math.min(from.y, to.y)}%`,
                      width: `${Math.abs(from.x - to.x)}%`,
                      height: `${Math.abs(from.y - to.y)}%`,
                      pointerEvents: 'none',
                    }}
                  >
                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox={`0 0 ${Math.abs(from.x - to.x) * 10} ${Math.abs(from.y - to.y) * 10}`}
                      preserveAspectRatio="none"
                    >
                      <line
                        x1={from.x < to.x ? 0 : Math.abs(from.x - to.x) * 10}
                        y1={from.y < to.y ? 0 : Math.abs(from.y - to.y) * 10}
                        x2={from.x < to.x ? Math.abs(from.x - to.x) * 10 : 0}
                        y2={from.y < to.y ? Math.abs(from.y - to.y) * 10 : 0}
                        stroke={style.color}
                        strokeWidth="1.5"
                        strokeDasharray={rel.type === 'rivalry' ? '6 4' : rel.type === 'trade' ? '2 4' : rel.type === 'neutral' ? '3 5' : 'none'}
                        opacity={rel.type === 'neutral' ? 0.3 : 0.7}
                      >
                        {rel.type !== 'neutral' && (
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to={rel.type === 'rivalry' ? '-20' : rel.type === 'trade' ? '-12' : '0'}
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        )}
                      </line>
                    </svg>
                  </div>

                  {/* Relationship label */}
                  {rel.type !== 'neutral' && (
                    <div
                      className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:block"
                      style={{
                        left: `${midX}%`,
                        top: `${midY}%`,
                        pointerEvents: 'none',
                      }}
                    >
                      <div className="whitespace-nowrap rounded border border-rule bg-void-deep/90 px-2 py-1 backdrop-blur-sm">
                        <p className="label text-center" style={{ color: style.color, fontSize: '9px' }}>
                          {rel.label}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Civilization Nodes */}
            {CIVILIZATIONS.map((civ) => (
              <div
                key={civ.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${civ.x}%`, top: `${civ.y}%` }}
              >
                <div className="group relative flex flex-col items-center">
                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-4 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${civ.color}15 0%, transparent 70%)`,
                    }}
                  />
                  {/* Node circle */}
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 bg-void-deep transition-all duration-500 group-hover:scale-110 md:h-24 md:w-24"
                    style={{ borderColor: civ.color }}
                  >
                    {/* Inner pulse */}
                    <div
                      className="absolute inset-2 rounded-full opacity-20"
                      style={{
                        background: `radial-gradient(circle, ${civ.color}30 0%, transparent 70%)`,
                      }}
                    />
                    {/* Center dot */}
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: civ.color }}
                    />
                    {/* Orbiting dot */}
                    <div
                      className="absolute h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: civ.color,
                        animation: `diploOrbit 8s linear infinite`,
                        transformOrigin: '0 0',
                        top: '50%',
                        left: '50%',
                      }}
                    />
                  </div>
                  {/* Name label */}
                  <div className="mt-3 text-center">
                    <p className="font-display text-sm text-ivory md:text-base" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {civ.name}
                    </p>
                    <p className="label mt-0.5" style={{ color: civ.color, fontSize: '9px' }}>
                      {civ.genre}
                    </p>
                    <p className="label mt-0.5 text-ivory/40" style={{ fontSize: '9px' }}>
                      {civ.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Center mark */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: 'none' }}>
              <MythMark size={28} stroke="rgba(216,179,106,0.12)" />
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="wave" />

      {/* ─── Active Treaties ───────────────────────────────────────────── */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Active Treaties</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">{TREATIES.length} inter-civilization agreements</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TREATIES.map((treaty, i) => (
            <Reveal key={treaty.name} delay={0.08 * i}>
              <article className="group relative h-full border border-rule bg-void-deep p-8 transition-all duration-700 hover:border-gold/20">
                {/* Top accent */}
                <div className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold/40 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <span className="label text-ivory/30">#{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className="label rounded-full border px-3 py-1"
                    style={{
                      borderColor: getStatusColor(treaty.status),
                      color: getStatusColor(treaty.status),
                    }}
                  >
                    {treaty.status}
                  </span>
                </div>

                {/* Treaty name */}
                <h4 className="font-display text-lg text-ivory md:text-xl" style={{ fontFamily: 'var(--font-display), serif' }}>
                  {treaty.name}
                </h4>

                {/* Parties */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="label text-ivory/50">Parties:</span>
                  <span className="label text-gold">{treaty.parties[0]}</span>
                  <span className="text-ivory/30">↔</span>
                  <span className="label text-gold">{treaty.parties[1]}</span>
                </div>

                {/* Type & Date */}
                <div className="mt-4 flex items-center gap-4 border-t border-rule pt-4">
                  <div>
                    <span className="label text-ivory/40">Type</span>
                    <p className="label mt-1 text-ivory/70">{treaty.type}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="label text-ivory/40">Established</span>
                    <p className="label mt-1 text-ivory/70">{treaty.established}</p>
                  </div>
                </div>

                {/* Terms */}
                <p className="mt-4 text-sm leading-relaxed text-ivory/60" style={{ lineHeight: '1.65' }}>
                  {treaty.terms}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ─── Diplomatic Activity Feed ──────────────────────────────────── */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Diplomatic Activity</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">Recent events</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2">
          {DIPLOMATIC_FEED.map((feed, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <div className="flex items-start gap-4 bg-void-deep p-6 transition-colors duration-500 hover:bg-sapphire/20">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="h-2.5 w-2.5 rounded-full border border-gold/60 bg-gold/20" />
                  {i < DIPLOMATIC_FEED.length - 1 && <div className="h-full w-px bg-rule" />}
                </div>
                <div className="flex-1">
                  <p className="text-base text-ivory/80" style={{ lineHeight: '1.7' }}>
                    {feed.event}
                  </p>
                  <p className="mt-2 label text-ivory/30">{feed.time}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">The Canon Connects Us</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/70 md:text-lg" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
            Every treaty, every rivalry, every exchange — threads in the living tapestry of MYTH.
          </p>
        </Reveal>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────── */}
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

      {/* ─── Page-specific CSS (injected via dangerouslySetInnerHTML for SSR) ─── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes diploParticleFloat {
              0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
              25% { transform: translateY(-30px) translateX(8px); opacity: 0.4; }
              50% { transform: translateY(-15px) translateX(-5px); opacity: 0.25; }
              75% { transform: translateY(-35px) translateX(12px); opacity: 0.5; }
            }
            .diplo-particle {
              animation: diploParticleFloat 8s ease-in-out infinite;
            }
            @keyframes diploOrbit {
              from { transform: rotate(0deg) translateX(44px) rotate(0deg); }
              to { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
            }
            @media (min-width: 768px) {
              @keyframes diploOrbit {
                from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
                to { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
              }
            }
          `,
        }}
      />
    </main>
  );
}
