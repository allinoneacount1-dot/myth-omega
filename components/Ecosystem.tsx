'use client';

import { Reveal } from './Reveal';
import { ECOSYSTEM } from '@/lib/content';

export function Ecosystem() {
  return (
    <section className="relative section-md bg-void-deep">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">The Stack</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">06 / 06</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="headline-section max-w-3xl text-ivory">
            Six systems. One civilization engine.
          </h3>
        </Reveal>

        <div className="mt-24 divide-y divide-rule border-t border-b border-rule">
          {ECOSYSTEM.map((item, i) => (
            <Reveal key={item.name} delay={0.1 * i}>
              <article className="group grid grid-cols-12 items-baseline gap-6 py-12 transition-colors duration-500 hover:bg-sapphire/20">
                <span className="label col-span-2 text-gold/60 md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display col-span-10 text-2xl text-ivory md:col-span-4 md:text-3xl"
                    style={{ fontFamily: 'var(--font-display), serif' }}>
                  {item.name}
                </h4>
                <p className="col-span-12 text-base text-ivory/70 md:col-span-7" style={{ lineHeight: '1.65' }}>
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}