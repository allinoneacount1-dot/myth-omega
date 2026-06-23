'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { HERO } from '@/lib/content';
import { MythMark } from '@/components/glyphs';

const HeroScene = dynamic(() => import('./HeroScene').then(m => m.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-void" />,
});

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function Hero() {
  const reduce = usePrefersReducedMotion();

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 1.4,
      delay: reduce ? 0 : 0.6 + i * 0.18,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="relative h-[100vh] min-h-[720px] w-full overflow-hidden">
      {/* R3F background — wrapped in Suspense */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-void" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(5,7,11,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-6 py-12 md:px-10 lg:px-16">
        {/* Top bar */}
        <motion.div {...stagger(0)} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MythMark size={36} stroke="#F7F4EE" />
            <span className="label text-ivory">MYTH</span>
          </div>
          <span className="label hidden text-ivory/50 md:block">{HERO.chapter}</span>
        </motion.div>

        {/* Center — monumental title */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <motion.div {...stagger(1)}>
            <span className="label text-gold">{HERO.eyebrow}</span>
          </motion.div>

          <motion.h1 {...stagger(2)} className="headline-hero mt-6 text-ivory">
            MYTH
          </motion.h1>

          <motion.p
            {...stagger(3)}
            className="mt-8 max-w-2xl font-display text-2xl italic text-ivory/85 md:text-3xl"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            {HERO.manifesto}
          </motion.p>

          <motion.p {...stagger(4)} className="label mt-12 text-ivory/55">
            {HERO.chapterLine}
          </motion.p>
        </div>

        {/* Bottom — scroll indicator */}
        <motion.div {...stagger(5)} className="flex items-center justify-between">
          <span className="label text-ivory/40">Scroll to begin</span>
          <motion.div
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="h-12 w-px bg-gradient-to-b from-gold to-transparent"
          />
          <span className="label text-ivory/40">2026 / V1.0</span>
        </motion.div>
      </div>
    </section>
  );
}