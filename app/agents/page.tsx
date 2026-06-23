import { AGENTS } from '@/lib/content';
import { AGENT_GLYPHS } from '@/components/agent-glyphs';
import { MythMark } from '@/components/glyphs';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';

export default function AgentsPage() {
  return (
    <main className="bg-void text-ivory">
      {/* NAV */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-void/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-3">
            <MythMark size={32} stroke="#F7F4EE" />
            <span className="label text-ivory">MYTH</span>
          </Link>
          <div className="hidden items-center gap-10 md:flex">
            <Link href="/#chapter-1" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Genesis</Link>
            <Link href="/#agents" className="label text-gold">Agents</Link>
            <Link href="/token" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">$MYTH</Link>
            <Link href="/whitepaper" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Whitepaper</Link>
          </div>
          <Link href="/#enter" className="label border border-gold/40 px-5 py-2.5 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10">Enter</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[50vh] items-center justify-center pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(216,179,106,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <Reveal>
            <span className="label text-gold">The Intelligence Layer</span>
            <h1 className="headline-hero mt-6 text-ivory">Seven Agents.<br />One Canon.</h1>
            <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>
              Each civilization is tended by an intelligence with a single sacred duty. Together, they form the living architecture of MYTH.
            </p>
          </Reveal>
        </div>
      </section>

      {/* AGENTS GRID */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AGENTS.map((agent, i) => {
            const Glyph = AGENT_GLYPHS[agent.name];
            return (
              <Reveal key={agent.name} delay={0.05 * i}>
                <article className="group flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/40">
                  <div className="mb-8 flex items-baseline justify-between">
                    <span className="label text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="label text-ivory/30">{agent.role}</span>
                  </div>
                  <div className="mb-10 text-gold transition-transform duration-700 group-hover:scale-110"><Glyph size={72} stroke="currentColor" /></div>
                  <h4 className="font-display text-3xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</h4>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.65' }}>{agent.desc}</p>
                  <div className="mt-8 h-px w-12 bg-gold/30 transition-all duration-700 group-hover:w-full" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
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
