'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MythMark } from '@/components/glyphs';
import { ClientOnly } from '@/components/ClientOnly';
import { WalletConnectButton } from '@/components/WalletConnectButton';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: '◈' },
  { href: '/civilizations', label: 'Civilizations', icon: '⬡' },
  { href: '/agents', label: 'Agents', icon: '◉' },
  { href: '/governance', label: 'Governance', icon: '⚖' },
  { href: '/analytics', label: 'Analytics', icon: '◔' },
  { href: '/forge', label: 'Forge', icon: '⚒' },
  { href: '/whitepaper', label: 'Whitepaper', icon: '◈' },
];

function Sidebar({ isOpen, onToggle, currentPath }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r border-rule bg-void-deep transition-all duration-500 ease-out ${
          isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-20 md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-rule px-4">
          <Link href="/" className={`flex items-center gap-3 ${!isOpen && 'md:hidden'}`}>
            <MythMark size={28} stroke="#D8B36A" />
            <span className="label text-gold">MYTH</span>
          </Link>
          <button
            onClick={onToggle}
            className="flex h-8 w-8 items-center justify-center text-ivory/40 transition-colors hover:text-ivory md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-gold/10 text-gold'
                      : 'text-ivory/55 hover:bg-rule/30 hover:text-ivory'
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center text-sm">{item.icon}</span>
                  <span className={`text-sm font-medium ${!isOpen && 'md:hidden'}`}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom: Wallet */}
        <div className="border-t border-rule p-4">
          <ClientOnly fallback={
            <div className="flex h-10 items-center justify-center border border-rule/30 rounded-lg">
              <span className="label text-ivory/30">Loading...</span>
            </div>
          }>
            <WalletConnectButton />
          </ClientOnly>
        </div>
      </aside>
    </>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Close sidebar on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-void">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath={pathname}
      />

      {/* Main Content */}
      <main className={`transition-all duration-500 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-rule bg-void/80 backdrop-blur-md px-4 md:px-8">
          <div className="flex items-center gap-4">
            {/* Burger Menu */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center border border-rule text-ivory/55 transition-colors hover:text-ivory"
              aria-label="Toggle sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                {sidebarOpen ? (
                  <path d="M4 4L14 14M14 4L4 14" />
                ) : (
                  <path d="M2 5h14M2 9h14M2 13h14" />
                )}
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="hidden items-center gap-2 md:flex">
              <span className="label text-ivory/30">MYTH</span>
              <span className="text-ivory/20">/</span>
              <span className="label text-gold">
                {NAV_ITEMS.find((item) => item.href === pathname)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span className="label text-ivory/30">Live</span>
            </div>

            {/* Wallet (mobile) */}
            <div className="md:hidden">
              <ClientOnly fallback={<div className="h-8 w-20 rounded border border-rule/30" />}>
                <WalletConnectButton />
              </ClientOnly>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
