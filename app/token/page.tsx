import { TOKEN } from '@/lib/content';
import { MythMark } from '@/components/glyphs';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';

export default function TokenPage() {
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
            <Link href="/agents" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Agents</Link>
            <Link href="/token" className="label text-gold">$MYTH</Link>
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
            <span className="label text-gold">The Participation Layer</span>
            <h1 className="headline-hero mt-6 text-ivory">$MYTH</h1>
            <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>
              {TOKEN.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* TOKEN DETAILS */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
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
