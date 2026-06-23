'use client';

import { Reveal } from './Reveal';
import { AGENTS } from '@/lib/content';
import { AgentGlyph } from './agent-glyphs';

export function AgentsShowcase() {
  return (
    <section className="relative section-md bg-void-deep">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-20 flex items-baseline gap-6">
            <span className="label text-gold">The Seven</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">07 / 07</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="headline-section max-w-3xl text-ivory">
            Seven agents. One canon.
          </h3>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl font-display text-xl italic text-gold"
             style={{ fontFamily: 'var(--font-display), serif' }}>
            Each civilization is tended by an intelligence with a single sacred duty.
          </p>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((agent, i) => {
            const Glyph = AgentGlyph;
            return (
              <Reveal key={agent.name} delay={0.1 * i}>
                <article className="group relative flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/40">
                  {/* Index */}
                  <div className="mb-8 flex items-baseline justify-between">
                    <span className="label text-gold/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="label text-ivory/30">{agent.role}</span>
                  </div>

                  {/* Glyph */}
                  <div className="mb-10 text-gold transition-transform duration-700 group-hover:scale-110">
                    <Glyph name={agent.name} size={72} stroke="currentColor" />
                  </div>

                  {/* Name */}
                  <h4 className="font-display text-3xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                    {agent.name}
                  </h4>

                  {/* Description */}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.65' }}>
                    {agent.desc}
                  </p>

                  {/* Hairline */}
                  <div className="mt-8 h-px w-12 bg-gold/30 transition-all duration-700 group-hover:w-full" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}