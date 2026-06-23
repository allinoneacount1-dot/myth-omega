import { CHAPTERS, AGENTS, TOKEN, ECOSYSTEM, FINAL, HERO } from '@/lib/content';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { Reveal } from '@/components/Reveal';
import { SectionDivider } from '@/components/SectionDivider';
import { Hero } from '@/components/Hero';
import { ClientOnly } from '@/components/ClientOnly';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import Link from 'next/link';

function SimpleNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-void/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <MythMark size={32} stroke="#F7F4EE" />
          <span className="label text-ivory">MYTH</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          <a href="#chapter-1" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Genesis</a>
          <span className="text-ivory/20">/</span>
          <a href="#chapter-2" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Birth</a>
          <span className="text-ivory/20">/</span>
          <a href="#chapter-3" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Rise</a>
          <span className="text-ivory/20">·</span>
          <Link href="/agents" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Agents</Link>
          <Link href="/civilization" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Worlds</Link>
          <Link href="/governance" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Governance</Link>
        </div>
        <div className="flex items-center gap-4">
          <ClientOnly fallback={<button className="label border border-gold/40 px-5 py-2.5 text-gold/50">Loading...</button>}>
            <WalletConnectButton />
          </ClientOnly>
        </div>
      </div>
    </nav>
  );
}

export default function HomePage() {
  return (
    <main className="bg-void text-ivory">
      <SimpleNav />
      <Hero />
      <SectionDivider variant="particles" />

      {/* CHAPTERS */}
      {CHAPTERS.map((chapter) => {
        const Glyph = (props: { size?: number; stroke?: string; strokeWidth?: number }) => {
          const Comp = {
            forgetting: (p: React.SVGProps<SVGSVGElement>) => (
              <svg {...p} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1" /><path d="M32 6 A26 26 0 0 1 58 32" stroke="currentColor" strokeWidth="1" opacity="0.25" /><path d="M58 32 A26 26 0 0 1 32 58" stroke="currentColor" strokeWidth="1" opacity="0.5" /><circle cx="32" cy="32" r="3" fill="currentColor" /></svg>
            ),
            birth: (p: React.SVGProps<SVGSVGElement>) => (
              <svg {...p} viewBox="0 0 64 64" fill="none"><path d="M32 8 L56 52 L8 52 Z" stroke="currentColor" strokeWidth="1" /><circle cx="32" cy="36" r="10" stroke="currentColor" strokeWidth="1" /><circle cx="32" cy="36" r="2" fill="currentColor" /></svg>
            ),
            culture: (p: React.SVGProps<SVGSVGElement>) => (
              <svg {...p} viewBox="0 0 64 64" fill="none"><path d="M8 48 Q32 32 56 48" stroke="currentColor" strokeWidth="1" /><path d="M8 38 Q32 22 56 38" stroke="currentColor" strokeWidth="1" opacity="0.65" /><path d="M8 28 Q32 12 56 28" stroke="currentColor" strokeWidth="1" opacity="0.35" /><line x1="8" y1="54" x2="56" y2="54" stroke="currentColor" strokeWidth="1" /></svg>
            ),
            civilization: (p: React.SVGProps<SVGSVGElement>) => (
              <svg {...p} viewBox="0 0 64 64" fill="none"><rect x="6" y="6" width="52" height="52" stroke="currentColor" strokeWidth="1" /><rect x="14" y="14" width="36" height="36" stroke="currentColor" strokeWidth="1" opacity="0.7" /><rect x="22" y="22" width="20" height="20" stroke="currentColor" strokeWidth="1" opacity="0.4" /><circle cx="32" cy="32" r="3" fill="currentColor" /></svg>
            ),
            engine: (p: React.SVGProps<SVGSVGElement>) => (
              <svg {...p} viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1" /><circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" opacity="0.7" /><circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4" /><line x1="6" y1="32" x2="58" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.5" /><line x1="32" y1="6" x2="32" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.5" /><circle cx="32" cy="32" r="2" fill="currentColor" /></svg>
            ),
            future: (p: React.SVGProps<SVGSVGElement>) => (
              <svg {...p} viewBox="0 0 64 64" fill="none"><line x1="6" y1="54" x2="58" y2="54" stroke="currentColor" strokeWidth="1" /><line x1="32" y1="54" x2="32" y2="8" stroke="currentColor" strokeWidth="1" /><circle cx="32" cy="20" r="6" stroke="currentColor" strokeWidth="1" opacity="0.5" /><circle cx="32" cy="14" r="3" stroke="currentColor" strokeWidth="1" /><path d="M26 36 L32 30 L38 36" stroke="currentColor" strokeWidth="1" opacity="0.6" /></svg>
            ),
          }[chapter.glyph];
          return <Comp {...props} />;
        };

        return (
          <section key={chapter.index} id={`chapter-${chapter.index}`} className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-3">
                <Reveal>
                  <div className="flex flex-col gap-6">
                    <span className="label text-gold">Chapter {chapter.roman}</span>
                    <div className="text-gold/70"><Glyph size={64} strokeWidth={1} /></div>
                  </div>
                </Reveal>
              </div>
              <div className="md:col-span-9">
                <Reveal delay={0.1}><h2 className="headline-section text-ivory">{chapter.title}</h2></Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-2xl font-display text-xl italic text-gold md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.sub}</p>
                </Reveal>
                <div className="mt-16 space-y-8">
                  {chapter.body.map((para, i) => (
                    <Reveal key={i} delay={0.3 + i * 0.08}>
                      <p className="max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl" style={{ lineHeight: '1.75' }}>{para}</p>
                    </Reveal>
                  ))}
                </div>
                {chapter.manifest && (
                  <Reveal delay={0.6}>
                    <div className="mt-20 max-w-2xl">
                      <div className="h-px w-16 bg-gold/40" />
                      <p className="mt-8 font-display text-xl italic text-gold md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.manifest}</p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <SectionDivider variant="glyph" flip />

      {/* AGENTS */}
      <section id="agents" className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">The Seven</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">07 / 07</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}><h3 className="headline-section max-w-3xl text-ivory">Seven agents. One canon.</h3></Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl font-display text-xl italic text-gold" style={{ fontFamily: 'var(--font-display), serif' }}>
              Each civilization is tended by an intelligence with a single sacred duty.
            </p>
          </Reveal>
          <div className="mt-24 grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.name} delay={0.05 * i}>
                <article className="group flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/40">
                  <div className="mb-8 flex items-baseline justify-between">
                    <span className="label text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="label text-ivory/30">{agent.role}</span>
                  </div>
                  <div className="mb-10 text-gold transition-transform duration-700 group-hover:scale-110"><AgentGlyph name={agent.name} size={72} stroke="currentColor" /></div>
                  <h4 className="font-display text-3xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</h4>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.65' }}>{agent.desc}</p>
                  <div className="mt-8 h-px w-12 bg-gold/30 transition-all duration-700 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* TOKEN */}
      <section id="token" className="section-md">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">The Participation Layer</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">$MYTH</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}><h3 className="headline-section max-w-3xl text-ivory">{TOKEN.tagline}</h3></Reveal>
          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {TOKEN.body.map((para, i) => (
                <Reveal key={i} delay={0.15 * i}>
                  <p className="mb-6 text-lg leading-relaxed text-ivory/85" style={{ lineHeight: '1.75' }}>{para}</p>
                </Reveal>
              ))}
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.3}><span className="label text-ivory/50">Six utilities</span></Reveal>
              <div className="mt-8 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
                {TOKEN.uses.map((use, i) => (
                  <Reveal key={use.title} delay={0.35 + i * 0.05}>
                    <div className="group bg-void p-6 transition-colors duration-500 hover:bg-sapphire/30">
                      <span className="label text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                      <h5 className="mt-3 font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{use.title}</h5>
                      <p className="mt-2 text-sm text-ivory/65" style={{ lineHeight: '1.6' }}>{use.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="particles" flip />

      {/* ECOSYSTEM */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">The Stack</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">06 / 06</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}><h3 className="headline-section max-w-3xl text-ivory">Six systems. One civilization engine.</h3></Reveal>
          <div className="mt-24 divide-y divide-rule border-t border-b border-rule">
            {ECOSYSTEM.map((item, i) => (
              <Reveal key={item.name} delay={0.05 * i}>
                <article className="grid grid-cols-12 items-baseline gap-6 py-12 transition-colors duration-500 hover:bg-sapphire/20">
                  <span className="label col-span-2 text-gold/60 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="font-display col-span-10 text-2xl text-ivory md:col-span-4 md:text-3xl" style={{ fontFamily: 'var(--font-display), serif' }}>{item.name}</h4>
                  <p className="col-span-12 text-base text-ivory/70 md:col-span-7" style={{ lineHeight: '1.65' }}>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* FINAL CTA */}
      <section id="enter" className="section-lg">
        <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <Reveal><span className="label text-gold">Final Word</span></Reveal>
          <Reveal delay={0.15}><h2 className="headline-hero mt-12 text-ivory">{FINAL.title}</h2></Reveal>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-12 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl" style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
              {FINAL.body}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-16">
              <a href="#chapter-1" className="label inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
                Explore MYTH<span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
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
