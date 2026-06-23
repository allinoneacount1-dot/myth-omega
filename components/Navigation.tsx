'use client';

import Link from 'next/link';
import { MythMark } from '@/components/glyphs';
import { WalletConnect } from '@/components/WalletConnect';
import { CHAPTERS } from '@/lib/content';

export function Navigation() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-void/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <MythMark size={32} stroke="#F7F4EE" />
          <span className="label text-ivory">MYTH</span>
        </Link>
        <div className="hidden items-center gap-10 md:flex">
          {CHAPTERS.slice(0, 3).map((c) => (
            <a key={c.index} href={`#chapter-${c.index}`} className="label text-ivory/55 transition-colors duration-500 hover:text-gold">{c.title}</a>
          ))}
          <Link href="/agents" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Agents</Link>
          <Link href="/token" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">$MYTH</Link>
          <Link href="/whitepaper" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Whitepaper</Link>
        </div>
        <WalletConnect />
      </div>
    </nav>
  );
}
