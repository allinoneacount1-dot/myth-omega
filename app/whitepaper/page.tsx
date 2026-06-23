import { CHAPTERS } from '@/lib/content';
import { MythMark } from '@/components/glyphs';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';

export default function WhitepaperPage() {
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
            <Link href="/token" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">$MYTH</Link>
            <Link href="/whitepaper" className="label text-gold">Whitepaper</Link>
          </div>
          <Link href="/#enter" className="label border border-gold/40 px-5 py-2.5 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10">Enter</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-[50vh] items-center justify-center pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(216,179,106,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <Reveal>
            <span className="label text-gold">Technical Foundation</span>
            <h1 className="headline-hero mt-6 text-ivory">Whitepaper</h1>
            <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl" style={{ fontFamily: 'var(--font-display), serif' }}>
              The architecture of a civilization that intends to be remembered.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHITEPAPER CONTENT */}
      <section className="section-md mx-auto max-w-[800px] px-6 md:px-10">
        {CHAPTERS.map((chapter, i) => (
          <Reveal key={chapter.index} delay={i * 0.05}>
            <article className="mb-20">
              <div className="mb-8 flex items-baseline gap-4">
                <span className="label text-gold">Chapter {chapter.roman}</span>
                <span className="h-px flex-1 bg-rule" />
              </div>
              <h2 className="headline-editorial text-ivory">{chapter.title}</h2>
              <p className="mt-6 font-display text-xl italic text-gold" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.sub}</p>
              <div className="mt-10 space-y-6">
                {chapter.body.map((para, j) => (
                  <p key={j} className="text-base leading-relaxed text-ivory/80 md:text-lg" style={{ lineHeight: '1.8' }}>{para}</p>
                ))}
              </div>
              {chapter.manifest && (
                <div className="mt-12">
                  <div className="h-px w-16 bg-gold/40" />
                  <p className="mt-6 font-display text-lg italic text-gold" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.manifest}</p>
                </div>
              )}
            </article>
          </Reveal>
        ))}
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
