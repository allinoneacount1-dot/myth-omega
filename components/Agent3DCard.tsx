'use client';

import { AgentGlyph } from '@/components/agent-glyphs';

interface Agent3DCardProps {
  name: string;
  color: string;
  role: string;
}

export function Agent3DCard({ name, color, role }: Agent3DCardProps) {
  return (
    <article className="group relative border border-rule bg-void-deep p-8 transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(216,179,106,0.08)]">
      <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <div className="mb-6 flex items-center justify-between">
        <span className="label text-ivory/40">{role}</span>
        <div
          className="h-3 w-3 rounded-full transition-all duration-500 group-hover:shadow-[0_0_12px_currentColor]"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="mb-6 flex items-center justify-center py-4 text-gold transition-transform duration-700 group-hover:scale-110">
        <AgentGlyph name={name} size={72} stroke="currentColor" />
      </div>
      <h3 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
        {name}
      </h3>
      <div className="mt-6 h-px w-12 bg-gold/30 transition-all duration-700 group-hover:w-full" />
    </article>
  );
}

export default Agent3DCard;
