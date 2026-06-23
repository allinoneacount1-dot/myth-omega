'use client';

import { Reveal } from '@/components/Reveal';
import { CHAPTERS } from '@/lib/content';
import { GLYPH_MAP } from '@/components/glyphs';

interface ChapterSectionProps {
  chapter: typeof CHAPTERS[0];
}

export function ChapterSection({ chapter }: ChapterSectionProps) {
  const Glyph = GLYPH_MAP[chapter.glyph];

  return (
    <section
      id={`chapter-${chapter.index}`}
      className="relative section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="label text-gold">
                Chapter {chapter.roman}
              </span>
              <div className="text-gold/70">
                <Glyph size={64} stroke="currentColor" strokeWidth={1} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-9">
          <Reveal delay={0.1}>
            <h2 className="headline-section text-ivory">
              {chapter.title}
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-2xl font-display text-xl italic text-gold md:text-2xl"
               style={{ fontFamily: 'var(--font-display), serif' }}>
              {chapter.sub}
            </p>
          </Reveal>

          <div className="mt-16 space-y-8">
            {chapter.body.map((para, i) => (
              <Reveal key={i} delay={0.35 + i * 0.1}>
                <p className="max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl"
                   style={{ lineHeight: '1.75' }}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {chapter.manifest && (
            <Reveal delay={0.7}>
              <div className="mt-20 max-w-2xl">
                <div className="h-px w-16 bg-gold/40" />
                <p className="mt-8 font-display text-xl italic text-gold md:text-2xl"
                   style={{ fontFamily: 'var(--font-display), serif' }}>
                  {chapter.manifest}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}