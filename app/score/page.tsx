'use client';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENTS, ECOSYSTEM } from '@/lib/content';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface CivilizationScore {
  name: string;
  genre: string;
  canonDepth: number;
  agentActivity: number;
  governance: number;
  loreConsistency: number;
  memberEngagement: number;
  overall: number;
  trend: 'up' | 'stable' | 'down';
}

const CIVILIZATION_SCORES: CivilizationScore[] = [
  { name: 'Aetheria',                  genre: 'Mythic Fantasy',     canonDepth: 92, agentActivity: 88, governance: 76, loreConsistency: 91, memberEngagement: 84, overall: 87, trend: 'up' },
  { name: 'Chronos Veil',              genre: 'Sci-Fi Noir',        canonDepth: 78, agentActivity: 82, governance: 89, loreConsistency: 71, memberEngagement: 67, overall: 78, trend: 'stable' },
  { name: 'The Amber Highlands',       genre: 'Epic Saga',          canonDepth: 97, agentActivity: 91, governance: 82, loreConsistency: 95, memberEngagement: 90, overall: 92, trend: 'up' },
  { name: 'Void Meridian',             genre: 'Cosmic Horror',      canonDepth: 54, agentActivity: 63, governance: 58, loreConsistency: 62, memberEngagement: 71, overall: 60, trend: 'down' },
  { name: 'Ember Accord',              genre: 'Political Drama',    canonDepth: 85, agentActivity: 79, governance: 91, loreConsistency: 80, memberEngagement: 77, overall: 83, trend: 'up' },
  { name: 'Silent Bloom',              genre: 'Pastoral Mystery',   canonDepth: 68, agentActivity: 74, governance: 65, loreConsistency: 78, memberEngagement: 82, overall: 73, trend: 'stable' },
];

const SCORE_COMPONENTS = [
  { key: 'canonDepth',      label: 'Canon Depth',              weight: 30, color: '#D8B36A', colorClass: 'bg-gold',      description: 'Number of canon entries, lore artifacts, historical events' },
  { key: 'agentActivity',   label: 'Agent Activity',           weight: 25, color: '#3AE9E0', colorClass: 'bg-cyan',      description: 'How actively the 7 agents are working on this civilization' },
  { key: 'governance',      label: 'Governance Participation',  weight: 20, color: '#9B4DFF', colorClass: 'bg-[#9B4DFF]', description: 'Voting rate, proposal submissions, quorum reach' },
  { key: 'loreConsistency', label: 'Lore Consistency',         weight: 15, color: '#A33A4A', colorClass: 'bg-ember',     description: 'How well new canon aligns with existing narrative (no contradictions)' },
  { key: 'memberEngagement',label: 'Member Engagement',        weight: 10, color: '#00B4A8', colorClass: 'bg-teal',      description: 'Active members, participation in rituals, event attendance' },
] as const;

const RANKED = [...CIVILIZATION_SCORES].sort((a, b) => b.overall - a.overall);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function trendSymbol(trend: CivilizationScore['trend']) {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
}

function trendColor(trend: CivilizationScore['trend']) {
  if (trend === 'up') return 'text-teal';
  if (trend === 'down') return 'text-ember';
  return 'text-ivory/50';
}

function scoreColor(score: number) {
  if (score >= 85) return 'text-gold';
  if (score >= 70) return 'text-cyan';
  return 'text-ember';
}

/* ------------------------------------------------------------------ */
/*  Circular score — pure CSS/SVG                                      */
/* ------------------------------------------------------------------ */

function CircularScore({ score, size = 200 }: { score: number; size?: number }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(247,244,238,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D8B36A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-5xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
          {score}
        </span>
        <span className="label mt-1 text-ivory/50">/ 100</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bar chart row                                                      */
/* ------------------------------------------------------------------ */

function BarRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-40 flex-shrink-0 label text-ivory/60 md:w-48">{label}</span>
      <div className="relative h-2 flex-1 bg-rule/30">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-10 text-right font-mono text-sm text-ivory/80">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ScorePage() {
  /* Weighted average across all civs for the hero index */
  const mythIndex = Math.round(
    CIVILIZATION_SCORES.reduce((sum, c) => {
      return sum +
        c.canonDepth * 0.30 +
        c.agentActivity * 0.25 +
        c.governance * 0.20 +
        c.loreConsistency * 0.15 +
        c.memberEngagement * 0.10;
    }, 0) / CIVILIZATION_SCORES.length,
  );

  /* Per-component averages for the breakdown bars */
  const avgCanon = Math.round(CIVILIZATION_SCORES.reduce((s, c) => s + c.canonDepth, 0) / CIVILIZATION_SCORES.length);
  const avgAgent = Math.round(CIVILIZATION_SCORES.reduce((s, c) => s + c.agentActivity, 0) / CIVILIZATION_SCORES.length);
  const avgGov = Math.round(CIVILIZATION_SCORES.reduce((s, c) => s + c.governance, 0) / CIVILIZATION_SCORES.length);
  const avgLore = Math.round(CIVILIZATION_SCORES.reduce((s, c) => s + c.loreConsistency, 0) / CIVILIZATION_SCORES.length);
  const avgMember = Math.round(CIVILIZATION_SCORES.reduce((s, c) => s + c.memberEngagement, 0) / CIVILIZATION_SCORES.length);

  const overallBreakdown: { label: string; value: number; color: string }[] = [
    { label: `Canon Depth (30%)`, value: avgCanon, color: '#D8B36A' },
    { label: `Agent Activity (25%)`, value: avgAgent, color: '#3AE9E0' },
    { label: `Governance Participation (20%)`, value: avgGov, color: '#9B4DFF' },
    { label: `Lore Consistency (15%)`, value: avgLore, color: '#A33A4A' },
    { label: `Member Engagement (10%)`, value: avgMember, color: '#00B4A8' },
  ];

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="section-md pt-40 text-center">
        <Reveal>
          <span className="label text-gold">Culture Metrics</span>
          <h1 className="headline-hero mt-6 text-ivory">The Richness Index</h1>
          <p
            className="mx-auto mt-8 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl"
            style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.5' }}
          >
            Every civilization is measured. Not by wealth or power — but by the depth of its canon,
            the consistency of its lore, the activity of its agents, and the strength of its governance.
          </p>
        </Reveal>
      </section>

      <SectionDivider variant="glyph" />

      {/* ============================================================
          OVERALL SCORE
          ============================================================ */}
      <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="border border-rule bg-void-deep p-10 md:p-16">
            <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
              {/* Circular score */}
              <div className="flex flex-col items-center">
                <CircularScore score={mythIndex} size={200} />
                <span className="label mt-6 text-gold">MYTH Culture Index</span>
              </div>

              {/* Breakdown */}
              <div className="flex-1 space-y-5 md:max-w-md md:pl-16">
                <span className="label text-ivory/40">Score Composition</span>
                {overallBreakdown.map((item) => (
                  <BarRow
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="wave" />

      {/* ============================================================
          PER-CIVILIZATION SCORES
          ============================================================ */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Civilization Breakdown</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">06 / 06</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {CIVILIZATION_SCORES.map((civ, i) => (
            <Reveal key={civ.name} delay={i * 0.1}>
              <article className="border border-rule bg-void-deep p-8 transition-all duration-700 hover:border-gold/20">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl text-ivory md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {civ.name}
                    </h3>
                    <p className="mt-1 label text-ivory/50">{civ.genre}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`font-display text-3xl ${scoreColor(civ.overall)}`} style={{ fontFamily: 'var(--font-display), serif' }}>
                      {civ.overall}
                    </span>
                    <span className="label mt-1 text-ivory/40">overall</span>
                  </div>
                </div>

                {/* Bars */}
                <div className="mt-8 space-y-4">
                  <BarRow label="Canon Depth" value={civ.canonDepth} color="#D8B36A" />
                  <BarRow label="Agent Activity" value={civ.agentActivity} color="#3AE9E0" />
                  <BarRow label="Governance" value={civ.governance} color="#9B4DFF" />
                  <BarRow label="Lore Consistency" value={civ.loreConsistency} color="#A33A4A" />
                  <BarRow label="Member Engagement" value={civ.memberEngagement} color="#00B4A8" />
                </div>

                {/* Mini footer */}
                <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                  <span className="label text-ivory/30">Trend</span>
                  <span className={`font-mono text-lg ${trendColor(civ.trend)}`}>
                    {trendSymbol(civ.trend)} {civ.trend === 'up' ? 'Improving' : civ.trend === 'down' ? 'Declining' : 'Stable'}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider variant="gradient" color="#9B4DFF" />

      {/* ============================================================
          SCORE COMPONENTS EXPLAINED
          ============================================================ */}
      <section className="section-sm bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-16 flex items-baseline gap-6">
              <span className="label text-gold">Methodology</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">05 Components</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SCORE_COMPONENTS.map((comp, i) => (
              <Reveal key={comp.key} delay={i * 0.08}>
                <div className="border border-rule bg-void p-8 transition-all duration-700 hover:border-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: comp.color }} />
                    <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {comp.label}
                    </h4>
                  </div>
                  <span className="label mt-2 inline-block text-gold/60">Weight: {comp.weight}%</span>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65" style={{ lineHeight: '1.75' }}>
                    {comp.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="glyph" color="#3AE9E0" />

      {/* ============================================================
          RANKING TABLE
          ============================================================ */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-6">
            <span className="label text-gold">Leaderboard</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">Ranked by overall score</span>
          </div>
        </Reveal>

        <Reveal>
          <div className="border border-rule bg-void-deep overflow-x-auto">
            {/* Header */}
            <div className="grid min-w-[700px] grid-cols-[60px_1fr_1fr_100px_80px] gap-4 border-b border-rule px-8 py-5">
              <span className="label text-ivory/40">Rank</span>
              <span className="label text-ivory/40">Civilization</span>
              <span className="label text-ivory/40">Genre</span>
              <span className="label text-ivory/40 text-right">Score</span>
              <span className="label text-ivory/40 text-right">Trend</span>
            </div>

            {/* Rows */}
            {RANKED.map((civ, i) => (
              <div
                key={civ.name}
                className="group grid min-w-[700px] grid-cols-[60px_1fr_1fr_100px_80px] gap-4 border-b border-rule/50 px-8 py-6 transition-colors duration-500 hover:bg-sapphire/10"
              >
                {/* Rank */}
                <div className="flex items-center">
                  <span className={`font-mono text-sm ${i < 3 ? 'text-gold' : 'text-ivory/40'}`}>
                    {i === 0 ? '♛' : `#${i + 1}`}
                  </span>
                </div>

                {/* Name */}
                <div className="flex items-center">
                  <span className="font-display text-lg text-ivory/90" style={{ fontFamily: 'var(--font-display), serif' }}>
                    {civ.name}
                  </span>
                </div>

                {/* Genre */}
                <div className="flex items-center">
                  <span className="label text-ivory/50">{civ.genre}</span>
                </div>

                {/* Score */}
                <div className="flex items-center justify-end">
                  <span className={`font-display text-2xl ${scoreColor(civ.overall)}`} style={{ fontFamily: 'var(--font-display), serif' }}>
                    {civ.overall}
                  </span>
                </div>

                {/* Trend */}
                <div className="flex items-center justify-end">
                  <span className={`font-mono text-xl ${trendColor(civ.trend)}`}>
                    {trendSymbol(civ.trend)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="wave" color="#00B4A8" />

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">Shape the Culture</h2>
          <p
            className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/70 md:text-lg"
            style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}
          >
            Every canon entry you author, every ritual you attend, every vote you cast — the index moves.
            Build what time cannot erase.
          </p>
          <a
            href="/governance"
            className="label mt-10 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
          >
            Enter Governance<span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
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
