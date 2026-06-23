'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MythMark } from '@/components/glyphs';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { ClientOnly } from '@/components/ClientOnly';
import { CHAPTERS } from '@/lib/content';

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-void/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-3">
            <MythMark size={32} stroke="#F7F4EE" />
            <span className="label text-ivory">MYTH</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            <a href="#chapter-1" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Genesis</a>
            <span className="text-ivory/20">/</span>
            <a href="#chapter-2" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Birth</a>
            <span className="text-ivory/20">/</span>
            <a href="#chapter-3" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Rise</a>
            <span className="text-ivory/20">·</span>
            <Link href="/agents" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Agents</Link>
            <Link href="/civilization" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Worlds</Link>
            <Link href="/governance" className="label text-ivory/55 transition-colors duration-500 hover:text-gold">Governance</Link>
          </div>
          <div className="flex items-center gap-4">
            <ClientOnly fallback={<button className="label border border-gold/40 px-5 py-2.5 text-gold/50">Loading...</button>}>
              <WalletConnectButton />
            </ClientOnly>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center border border-rule md:hidden"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ivory">
                {mobileOpen ? (
                  <path d="M5 5L15 15M15 5L5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[49] flex flex-col bg-void/95 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <MythMark size={32} stroke="#F7F4EE" />
              <span className="label text-ivory">MYTH</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center border border-rule"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ivory">
                <path d="M5 5L15 15M15 5L5 15" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 pt-8">
            {CHAPTERS.map((c) => (
              <a
                key={c.index}
                href={`#chapter-${c.index}`}
                onClick={() => setMobileOpen(false)}
                className="border-b border-rule py-4 font-display text-2xl text-ivory/80 transition-colors hover:text-gold"
              >
                {c.title}
              </a>
            ))}
            {[
              { href: '/agents', label: 'The Seven Agents' },
              { href: '/token', label: '$MYTH Token' },
              { href: '/civilization', label: 'Civilizations' },
              { href: '/forge', label: 'Canon Builder' },
              { href: '/governance', label: 'Governance' },
              { href: '/whitepaper', label: 'Whitepaper' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-rule py-4 font-display text-2xl text-ivory/80 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-auto px-6 py-8">
            <ClientOnly fallback={<button className="label border border-gold/40 px-5 py-2.5 text-gold/50">Loading...</button>}>
              <WalletConnectButton />
            </ClientOnly>
          </div>
        </div>
      )}
    </>
  );
}
