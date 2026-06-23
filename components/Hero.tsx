'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { HERO } from '@/lib/content';
import { MythMark } from '@/components/glyphs';

const HeroScene = dynamic(async () => (await import('./HeroScene')).HeroScene, {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-void" />,
});

function useSafeReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function Hero() {
  const reduce = useSafeReducedMotion();

  return (
    <section id="top" className="relative flex h-[100vh] min-h-[720px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-void" />}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(216,179,106,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(58,233,224,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #D8B36A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,7,11,0.8) 100%)' }} />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
        <motion.span
          className="label text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {HERO.eyebrow}
        </motion.span>
        <motion.h1
          className="headline-hero mt-6 text-ivory"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
        >
          {HERO.title}
        </motion.h1>
        <motion.p
          className="mx-auto mt-8 max-w-2xl font-display text-2xl italic text-ivory/85 md:text-3xl"
          style={{ fontFamily: 'var(--font-display), serif' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
        >
          {HERO.manifesto}
        </motion.p>
        <motion.p
          className="label mt-12 text-ivory/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          {HERO.chapterLine}
        </motion.p>
        <motion.div
          className="mt-20 flex items-center justify-center"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
