'use client';

import { useEffect, useState } from 'react';
import { HERO } from '@/lib/content';
import { MythMark } from '@/components/glyphs';

function HeroParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="absolute h-[2px] w-[2px] rounded-full bg-gold/40" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `particleFloat ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s` }} />
      ))}
    </div>
  );
}

export function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section id="top" className="relative flex h-[100vh] min-h-[720px] items-center justify-center overflow-hidden">
      <HeroParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(216,179,106,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(58,233,224,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #D8B36A 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,7,11,0.85) 100%)' }} />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
        <span className={`label text-gold ${visible ? 'hero-fade-up hero-delay-1' : 'opacity-0'}`}>{HERO.eyebrow}</span>
        <h1 className={`headline-hero mt-6 text-ivory ${visible ? 'hero-fade-up hero-delay-2' : 'opacity-0'}`}>{HERO.title}</h1>
        <p className={`mx-auto mt-8 max-w-2xl font-display text-2xl italic text-ivory/85 md:text-3xl ${visible ? 'hero-fade-up hero-delay-3' : 'opacity-0'}`} style={{ fontFamily: 'var(--font-display), serif' }}>{HERO.manifesto}</p>
        <p className={`label mt-12 text-ivory/55 ${visible ? 'hero-fade-up hero-delay-4' : 'opacity-0'}`}>{HERO.chapterLine}</p>
        <div className={`mt-20 flex items-center justify-center ${visible ? 'hero-fade-in hero-delay-5' : 'opacity-0'}`}>
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent hero-bounce" />
        </div>
        <div className={`mt-16 ${visible ? 'hero-fade-up hero-delay-6' : 'opacity-0'}`}>
          <a href="#enter" className="group relative inline-flex flex-col items-center gap-4">
            <span className="label text-gold/70 transition-colors duration-500 group-hover:text-gold">Explore Civilization</span>
            <span className="flex h-10 w-10 items-center justify-center border border-gold/40 rounded-full transition-all duration-700 group-hover:border-gold group-hover:bg-gold/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold hero-bounce">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
