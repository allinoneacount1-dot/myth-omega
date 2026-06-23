import { CHAPTERS, AGENTS, TOKEN, ECOSYSTEM, FINAL, HERO } from '@/lib/content';
import { GLYPH_MAP, MythMark } from '@/components/glyphs';
import { AGENT_GLYPHS } from '@/components/agent-glyphs';

export default function Home() {
  return (
    <main className="bg-void text-ivory">
      {/* ── NAV ── */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-void/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <a href="#top" className="flex items-center gap-3">
            <MythMark size={32} stroke="#F7F4EE" />
            <span className="label text-ivory">MYTH</span>
          </a>
          <div className="hidden items-center gap-10 md:flex">
            <a href="#chapter-1" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Genesis</a>
            <a href="#agents" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Agents</a>
            <a href="#token" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">$MYTH</a>
          </div>
          <a href="#enter" className="label border border-gold/40 px-5 py-2.5 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10">Enter</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative flex h-[100vh] min-h-[720px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(216,179,106,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(58,233,224,0.04)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #D8B36A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,7,11,0.8) 100%)' }} />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <span className="label text-gold">{HERO.eyebrow}</span>
          <h1 className="headline-hero mt-6 text-ivory">{HERO.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-2xl italic text-ivory/85 md:text-3xl" style={{ fontFamily: 'var(--font-display), serif' }}>
            {HERO.manifesto}
          </p>
          <p className="label mt-12 text-ivory/55">{HERO.chapterLine}</p>
          <div className="mt-20 flex items-center justify-center">
            <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
          </div>
        </div>
      </section>

      {/* ── CHAPTERS ── */}
      {CHAPTERS.map((chapter) => {
        const Glyph = GLYPH_MAP[chapter.glyph];
        return (
          <section key={chapter.index} id={`chapter-${chapter.index}`} className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="flex flex-col gap-6">
                  <span className="label text-gold">Chapter {chapter.roman}</span>
                  <div className="text-gold/70"><Glyph size={64} stroke="currentColor" strokeWidth={1} /></div>
                </div>
              </div>
              <div className="md:col-span-9">
                <h2 className="headline-section text-ivory">{chapter.title}</h2>
                <p className="mt-6 max-w-2xl font-display text-xl italic text-gold md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.sub}</p>
                <div className="mt-16 space-y-8">
                  {chapter.body.map((para, i) => (
                    <p key={i} className="max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl" style={{ lineHeight: '1.75' }}>{para}</p>
                  ))}
                </div>
                {chapter.manifest && (
                  <div className="mt-20 max-w-2xl">
                    <div className="h-px w-16 bg-gold/40" />
                    <p className="mt-8 font-display text-xl italic text-gold md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.manifest}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── AGENTS ── */}
      <section id="agents" className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">The Seven</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">07 / 07</span>
          </div>
          <h3 className="headline-section max-w-3xl text-ivory">Seven agents. One canon.</h3>
          <p className="mt-6 max-w-2xl font-display text-xl italic text-gold" style={{ fontFamily: 'var(--font-display), serif' }}>
            Each civilization is tended by an intelligence with a single sacred duty.
          </p>
          <div className="mt-24 grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((agent, i) => {
              const Glyph = AGENT_GLYPHS[agent.name];
              return (
                <article key={agent.name} className="group flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/40">
                  <div className="mb-8 flex items-baseline justify-between">
                    <span className="label text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="label text-ivory/30">{agent.role}</span>
                  </div>
                  <div className="mb-10 text-gold transition-transform duration-700 group-hover:scale-110"><Glyph size={72} stroke="currentColor" /></div>
                  <h4 className="font-display text-3xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</h4>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.65' }}>{agent.desc}</p>
                  <div className="mt-8 h-px w-12 bg-gold/30 transition-all duration-700 group-hover:w-full" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOKEN ── */}
      <section id="token" className="section-md">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">The Participation Layer</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">$MYTH</span>
          </div>
          <h3 className="headline-section max-w-3xl text-ivory">{TOKEN.tagline}</h3>
          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {TOKEN.body.map((para, i) => (
                <p key={i} className="mb-6 text-lg leading-relaxed text-ivory/85" style={{ lineHeight: '1.75' }}>{para}</p>
              ))}
            </div>
            <div className="lg:col-span-7">
              <span className="label text-ivory/50">Six utilities</span>
              <div className="mt-8 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
                {TOKEN.uses.map((use, i) => (
                  <div key={use.title} className="group bg-void p-6 transition-colors duration-500 hover:bg-sapphire/30">
                    <span className="label text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                    <h5 className="mt-3 font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{use.title}</h5>
                    <p className="mt-2 text-sm text-ivory/65" style={{ lineHeight: '1.6' }}>{use.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">The Stack</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">06 / 06</span>
          </div>
          <h3 className="headline-section max-w-3xl text-ivory">Six systems. One civilization engine.</h3>
          <div className="mt-24 divide-y divide-rule border-t border-b border-rule">
            {ECOSYSTEM.map((item, i) => (
              <article key={item.name} className="grid grid-cols-12 items-baseline gap-6 py-12 transition-colors duration-500 hover:bg-sapphire/20">
                <span className="label col-span-2 text-gold/60 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="font-display col-span-10 text-2xl text-ivory md:col-span-4 md:text-3xl" style={{ fontFamily: 'var(--font-display), serif' }}>{item.name}</h4>
                <p className="col-span-12 text-base text-ivory/70 md:col-span-7" style={{ lineHeight: '1.65' }}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="enter" className="section-lg">
        <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <span className="label text-gold">Final Word</span>
          <h2 className="headline-hero mt-12 text-ivory">{FINAL.title}</h2>
          <p className="mx-auto mt-12 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
            {FINAL.body}
          </p>
          <a href="#" className="label mt-16 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
            {FINAL.cta}<span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-rule bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <MythMark size={40} stroke="#F7F4EE" />
                <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>MYTH</span>
              </div>
              <p className="mt-6 max-w-md text-sm text-ivory/55" style={{ lineHeight: '1.7' }}>
                The first Culture Engine. Infrastructure for civilizations that intend to be remembered.
              </p>
              <p className="mt-8 label text-ivory/30">© 2026 MYTH Foundation</p>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                <div>
                  <span className="label text-gold/70">Engine</span>
                  <ul className="mt-4 space-y-3">
                    {['Genesis', 'Intelligence', 'Archive', 'Commons', 'Market', 'Atlas'].map((x) => (
                      <li key={x}><a href="#" className="text-sm text-ivory/65 transition-colors duration-300 hover:text-gold">{x}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="label text-gold/70">Network</span>
                  <ul className="mt-4 space-y-3">
                    {['Solana', 'Documentation', 'Whitepaper', 'GitHub', 'Brand Kit'].map((x) => (
                      <li key={x}><a href="#" className="text-sm text-ivory/65 transition-colors duration-300 hover:text-gold">{x}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="label text-gold/70">Civilization</span>
                  <ul className="mt-4 space-y-3">
                    {['About', 'Foundation', 'Careers', 'Press', 'Contact'].map((x) => (
                      <li key={x}><a href="#" className="text-sm text-ivory/65 transition-colors duration-300 hover:text-gold">{x}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-rule pt-8 md:flex-row md:items-center">
            <span className="label text-ivory/30">Version 1.0 / Genesis Draft</span>
            <span className="label text-ivory/30">A civilization operating system</span>
          </div>
        </div>
      </footer>
    </main>
  );
}