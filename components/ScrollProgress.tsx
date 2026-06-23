'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reduce = useSafeReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px]">
      <motion.div
        className="h-full bg-gradient-to-r from-gold via-cyan to-gold"
        style={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
