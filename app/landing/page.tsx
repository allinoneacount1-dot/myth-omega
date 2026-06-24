'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MythMark } from '@/components/glyphs';

export default function LandingPage() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !entered) {
        setEntered(true);
        setTimeout(() => router.push('/dashboard'), 600);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [entered, router]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    setTimeout(() => router.push('/dashboard'), 600);
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center bg-void transition-all duration-700 ${
        entered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      onClick={handleEnter}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-gold/30"
            style={{
              left: `${(i * 7 + mousePos.x * 3) % 100}%`,
              top: `${(i * 11 + mousePos.y * 3) % 100}%`,
              animation: `particleFloat ${4 + (i % 4)}s ease-in-out infinite ${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow following mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, #D8B36A 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Glyph */}
        <div className="mb-8 flex justify-center animate-[fadeInUp_1s_ease-out]">
          <MythMark size={80} stroke="#D8B36A" />
        </div>

        {/* Title */}
        <h1 className="text-[clamp(48px,10vw,120px)] font-display font-normal tracking-[-0.02em] text-ivory animate-[fadeInUp_1s_ease-out_0.2s_both]"
          style={{ fontFamily: 'var(--font-display), serif', lineHeight: '0.9' }}>
          MYTH
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg text-ivory/60 animate-[fadeInUp_1s_ease-out_0.4s_both]">
          The Culture Engine
        </p>

        {/* Subtitle */}
        <p className="mt-3 max-w-md mx-auto text-sm text-ivory/40 animate-[fadeInUp_1s_ease-out_0.6s_both]">
          Build worlds that outlive you. Infrastructure for civilizations that intend to be remembered.
        </p>

        {/* Enter Button */}
        <div className="mt-16 animate-[fadeInUp_1s_ease-out_0.8s_both]">
          <button
            onClick={handleEnter}
            className="group relative inline-flex flex-col items-center gap-4 cursor-pointer"
          >
            {/* Outer ring */}
            <div className="absolute -inset-6 rounded-full border border-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -inset-12 rounded-full border border-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100" />

            {/* Button */}
            <div className="relative flex h-16 w-16 items-center justify-center border border-gold/40 rounded-full transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8B36A" strokeWidth="1.5" className="transition-transform duration-500 group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <span className="label text-gold/60 group-hover:text-gold transition-colors duration-500">
              Press Enter or Click
            </span>
          </button>
        </div>

        {/* Changelog hint */}
        <div className="mt-20 animate-[fadeInUp_1s_ease-out_1s_both]">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span className="label text-ivory/30">6 Civilizations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="label text-ivory/30">7 Agents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
              <span className="label text-ivory/30">Real-time Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      {/* Version */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="label text-ivory/15">v1.0.0 • Genesis Draft</span>
      </div>
    </main>
  );
}
