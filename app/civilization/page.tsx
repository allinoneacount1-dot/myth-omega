import { Navigation } from '@/components/Navigation';
import { Reveal } from '@/components/Reveal';
import { SectionDivider } from '@/components/SectionDivider';
import { AGENTS, ECOSYSTEM } from '@/lib/content';
import { HistorianGlyph, ArchivistGlyph, LorekeeperGlyph, OracleGlyph, DiplomatGlyph, WorldbuilderGlyph, NarratorGlyph } from '@/components/agent-glyphs';
import { MythMark } from '@/components/glyphs';
import Link from 'next/link';

const CIVILIZATIONS = [
  { id: 1, name: 'Aetheria', canon: 142, members: 2847, health: 94, color: '#D8B36A', genre: 'Mythic Fantasy' },
  { id: 2, name: 'Chronos Veil', canon: 89, members: 1203, health: 78, color: '#3AE9E0', genre: 'Sci-Fi Noir' },
  { id: 3, name: 'The Amber Highlands', canon: 312, members: 5621, health: 97, color: '#A88B4F', genre: 'Epic Saga' },
  { id: 4, name: 'Void Meridian', canon: 56, members: 892, health: 62, color: '#9B4DFF', genre: 'Cosmic Horror' },
  { id: 5, name: 'Ember Accord', canon: 201, members: 3410, health: 88, color: '#FF4D00', genre: 'Political Drama' },
  { id: 6, name: 'Silent Bloom', canon: 78, members: 1567, health: 71, color: '#00B4A8', genre: 'Pastoral Mystery' },
];

const AGENT_GLYPHS: Record<string, React.FC<{ size?: number; stroke?: string }>> = {
  Historian: HistorianGlyph,
  Archivist: ArchivistGlyph,
  Lorekeeper: LorekeeperGlyph,
  Oracle: OracleGlyph,
  Diplomat: DiplomatGlyph,
  Worldbuilder: WorldbuilderGlyph,
  Narrator: NarratorGlyph,
};

const AGENT_FEED = [
  { agent: 'Oracle', action: 'predicted next chapter for', target: 'Aetheria', time: '2m ago', icon: 'Oracle' },
  { agent: 'Worldbuilder', action: 'generated geography:', target: 'The Crystalline Depths', time: '5m ago', icon: 'Worldbuilder' },
  { agent: 'Historian', action: 'resolved canon conflict in', target: 'Chronos Veil', time: '12m ago', icon: 'Historian' },
  { agent: 'Narrator', action: 'composed event:', target: 'The Festival of Echoes', time: '18m ago', icon: 'Narrator' },
  { agent: 'Diplomat', action: 'negotiated treaty between', target: 'Aetheria & Ember Accord', time: '25m ago', icon: 'Diplomat' },
  { agent: 'Archivist', action: 'indexed artifact:', target: 'The Obsidian Codex', time: '31m ago', icon: 'Archivist' },
];

export default function CivilizationPage() {
  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-md pt-40 text-center">
        <Reveal>
          <span className="label text-gold">The Living World</span>
          <h1 className="headline-hero mt-6 text-ivory">Civilizations</h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.5' }}>
            Each civilization is a living canon — written by its people, tended by its agents, preserved for the long arc of inheritance.
          </p>
        </Reveal>
      </section>

      {/* Civilization Grid */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CIVILIZATIONS.map((civ) => (
            <Reveal key={civ.id}>
              <article className="group relative border border-rule bg-void-deep p-8 glow-hover transition-all duration-700">
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <div>
                    <span className="label text-ivory/40">#{String(civ.id).padStart(3, '0')}</span>
                    <h3 className="mt-3 font-display text-xl text-ivory md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>{civ.name}</h3>
                    <p className="mt-1 label text-ivory/50">{civ.genre}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center border border-rule">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: civ.color }} />
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-rule pt-6">
                  <div>
                    <p className="label text-ivory/40">Canon</p>
                    <p className="mt-1 font-mono text-lg text-gold">{civ.canon}</p>
                  </div>
                  <div>
                    <p className="label text-ivory/40">Members</p>
                    <p className="mt-1 font-mono text-lg text-ivory">{civ.members.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="label text-ivory/40">Health</p>
                    <p className="mt-1 font-mono text-lg" style={{ color: civ.health > 80 ? '#00B4A8' : civ.health > 60 ? '#D8B36A' : '#A33A4A' }}>{civ.health}%</p>
                  </div>
                </div>
                <div className="mt-6 h-1 w-full bg-rule/30">
                  <div className="h-full bg-gradient-to-r from-gold/80 to-gold/30 transition-all duration-1000" style={{ width: `${civ.health}%` }} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* Agent Activity Feed */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">Live Feed</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">Seven agents at work</span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2">
          {AGENT_FEED.map((feed, i) => {
            const Glyph = AGENT_GLYPHS[feed.icon];
            return (
              <Reveal key={i}>
                <div className="flex items-start gap-4 bg-void-deep p-6 transition-colors duration-500 hover:bg-sapphire/20">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-rule text-gold/70">
                    <Glyph size={32} stroke="currentColor" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-ivory/80" style={{ lineHeight: '1.7' }}>
                      <span className="text-gold">{feed.agent}</span>
                      {' '}{feed.action}{' '}
                      <span className="text-ivory">{feed.target}</span>
                    </p>
                    <p className="mt-1 label text-ivory/30">{feed.time}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* Ecosystem Stack */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">Infrastructure</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">06 / 06</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM.map((item, i) => (
              <Reveal key={item.name}>
                <div className="group border border-rule bg-void p-8 transition-all duration-700 hover:border-gold/30 glow-hover">
                  <span className="label text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="mt-4 font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{item.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65" style={{ lineHeight: '1.7' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">Build Your Own Civilization</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-base italic text-ivory/70 md:text-lg" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
            Enter the Canon Forge. Create worlds that outlive you.
          </p>
          <Link href="/forge" className="label mt-10 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
            Enter The Forge<span aria-hidden="true">→</span>
          </Link>
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
