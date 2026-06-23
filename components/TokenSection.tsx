'use client';

import { Reveal } from './Reveal';
import { TOKEN } from '@/lib/content';

export function TokenSection() {
  return (
    <section id="token" className="relative section-md">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">The Participation Layer</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">$MYTH</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="headline-section max-w-3xl text-ivory">
            {TOKEN.tagline}
          </h3>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {TOKEN.body.map((para, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <p className="mb-6 text-lg leading-relaxed text-ivory/85" style={{ lineHeight: '1.75' }}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.4}>
              <span className="label text-ivory/50">Six utilities</span>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
              {TOKEN.uses.map((use, i) => (
                <Reveal key={use.title} delay={0.5 + i * 0.06}>
                  <div className="group bg-void p-6 transition-colors duration-500 hover:bg-sapphire/30">
                    <span className="label text-gold/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h5 className="mt-3 font-display text-xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {use.title}
                    </h5>
                    <p className="mt-2 text-sm text-ivory/65" style={{ lineHeight: '1.6' }}>
                      {use.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}