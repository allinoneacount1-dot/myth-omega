'use client';

import { Reveal } from './Reveal';
import { FINAL } from '@/lib/content';

export function FinalCTA() {
  return (
    <section id="enter" className="relative section-lg">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="label text-gold">Final Word</span>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="headline-hero mt-12 text-ivory">
              {FINAL.title}
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-12 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl"
               style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.6' }}>
              {FINAL.body}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <a
              href="#"
              className="label mt-16 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
            >
              {FINAL.cta}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}