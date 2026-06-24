'use client';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CIVILIZATION_PROFILES } from '@/lib/civilizations';

export default function CivilizationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Civilizations</h1>
          <p className="mt-1 text-sm text-ivory/50">Manage your persistent digital civilizations</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(CIVILIZATION_PROFILES).map((civ) => (
            <Link key={civ.slug} href={`/civilization/${civ.slug}`} className="group border border-rule bg-void-deep p-6 hover:border-gold/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border" style={{ borderColor: `${civ.color}30` }}>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: civ.color }} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{civ.name}</h3>
                  <p className="label text-ivory/50">{civ.genre}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ivory/60">{civ.tagline}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center"><p className="label text-ivory/30">Members</p><p className="font-mono text-sm text-ivory">{civ.members.toLocaleString()}</p></div>
                <div className="text-center"><p className="label text-ivory/30">Canon</p><p className="font-mono text-sm text-ivory">{civ.canonEntries}</p></div>
                <div className="text-center"><p className="label text-ivory/30">Health</p><p className="font-mono text-sm" style={{ color: civ.health >= 80 ? '#00B4A8' : '#D8B36A' }}>{civ.health}%</p></div>
              </div>
              <div className="mt-3 h-1.5 bg-rule/20 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${civ.health}%`, backgroundColor: civ.color }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
