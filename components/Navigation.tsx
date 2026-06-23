'use client';

import { useEffect, useState } from 'react';
import { MythMark } from './glyphs';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'border-b border-rule bg-void/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <a href="#top" className="flex items-center gap-3">
          <MythMark size={32} stroke="#F7F4EE" />
          <span className="label text-ivory">MYTH</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <a href="#chapter-1" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">
            Genesis
          </a>
          <a href="#engine" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">
            Engine
          </a>
          <a href="#agents" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">
            Agents
          </a>
          <a href="#token" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">
            $MYTH
          </a>
        </div>

        <a
          href="#enter"
          className="label border border-gold/40 px-5 py-2.5 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10"
        >
          Enter
        </a>
      </div>
    </nav>
  );
}