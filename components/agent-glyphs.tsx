'use client';

import { type SVGProps } from 'react';

export interface AgentGlyphProps extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
}

export function HistorianGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <circle cx="32" cy="32" r="26" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M32 6 A26 26 0 0 1 58 32" stroke={stroke} strokeWidth={strokeWidth} opacity="0.25" />
      <path d="M58 32 A26 26 0 0 1 32 58" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <circle cx="32" cy="32" r="3" fill={stroke}>
        <animate attributeName="r" dur="4s" repeatCount="indefinite" values="2.5;4;2.5" />
      </circle>
      <circle cx="32" cy="32" r="8" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.6">
        <animate attributeName="r" dur="4s" repeatCount="indefinite" values="7;10;7" />
        <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.6;0.2;0.6" />
      </circle>
    </svg>
  );
}

export function ArchivistGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <path d="M8 12 L32 6 L56 12 L56 52 L32 58 L8 52 Z" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="32" y1="6" x2="32" y2="58" stroke={stroke} strokeWidth={strokeWidth} opacity="0.4" />
      <line x1="8" y1="24" x2="56" y2="24" stroke={stroke} strokeWidth={strokeWidth} opacity="0.3" />
      <line x1="8" y1="36" x2="56" y2="36" stroke={stroke} strokeWidth={strokeWidth} opacity="0.3" />
      <circle cx="32" cy="30" r="4" stroke={stroke} strokeWidth={strokeWidth}>
        <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.3;1;0.3" />
      </circle>
    </svg>
  );
}

export function LorekeeperGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <path d="M32 6 L56 18 L56 46 L32 58 L8 46 L8 18 Z" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M32 14 L48 22 L48 42 L32 50 L16 42 L16 22 Z" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <circle cx="32" cy="32" r="5" stroke={stroke} strokeWidth={strokeWidth}>
        <animate attributeName="r" dur="5s" repeatCount="indefinite" values="4;7;4" />
        <animate attributeName="opacity" dur="5s" repeatCount="indefinite" values="0.4;1;0.4" />
      </circle>
    </svg>
  );
}

export function OracleGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <path d="M8 32 Q32 12 56 32 Q32 52 8 32 Z" stroke={stroke} strokeWidth={strokeWidth * 1.2} />
      <circle cx="32" cy="32" r="9" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="32" cy="32" r="3" fill={stroke}>
        <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.3;1;0.3" />
      </circle>
      <circle cx="32" cy="32" r="14" stroke={stroke} strokeWidth={strokeWidth * 0.6} opacity="0.3" strokeDasharray="2 4">
        <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function DiplomatGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <line x1="10" y1="20" x2="10" y2="54" stroke={stroke} strokeWidth={strokeWidth * 1.2} />
      <line x1="54" y1="20" x2="54" y2="54" stroke={stroke} strokeWidth={strokeWidth * 1.2} />
      <path d="M10 28 Q32 18 54 28" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="14" y1="32" x2="22" y2="32" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.5">
        <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.3;0.8;0.3" />
      </line>
      <line x1="28" y1="30" x2="36" y2="30" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.5">
        <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.3;0.8;0.3" begin="0.3s" />
      </line>
      <line x1="42" y1="32" x2="50" y2="32" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.5">
        <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.3;0.8;0.3" begin="0.6s" />
      </line>
      <path d="M10 40 L54 40" stroke={stroke} strokeWidth={strokeWidth} opacity="0.4" />
      <line x1="6" y1="54" x2="58" y2="54" stroke={stroke} strokeWidth={strokeWidth * 1.2} />
    </svg>
  );
}

export function WorldbuilderGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <path d="M6 50 L22 24 L32 36 L42 18 L58 50 Z" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="6" y1="50" x2="58" y2="50" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="42" cy="18" r="3" stroke={stroke} strokeWidth={strokeWidth}>
        <animate attributeName="r" dur="3s" repeatCount="indefinite" values="2;4;2" />
        <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.4;1;0.4" />
      </circle>
      <path d="M22 24 L26 30 L18 30 Z" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.4" />
      <line x1="32" y1="36" x2="32" y2="50" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.3" strokeDasharray="1 2">
        <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="0;6" />
      </line>
    </svg>
  );
}

export function NarratorGlyph({ size = 72, stroke = 'currentColor', strokeWidth = 1, ...rest }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" {...rest}>
      <path d="M6 38 Q14 30 22 38 T38 38 T54 38" stroke={stroke} strokeWidth={strokeWidth * 1.2} />
      <path d="M6 44 Q14 36 22 44 T38 44 T54 44" stroke={stroke} strokeWidth={strokeWidth * 1.2} opacity="0.6" />
      <path d="M6 50 Q14 42 22 50 T38 50 T54 50" stroke={stroke} strokeWidth={strokeWidth * 1.2} opacity="0.35" />
      <line x1="6" y1="54" x2="58" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="50" cy="14" r="4" stroke={stroke} strokeWidth={strokeWidth}>
        <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.3;1;0.3" />
      </circle>
      <line x1="50" y1="18" x2="50" y2="30" stroke={stroke} strokeWidth={strokeWidth * 0.8} opacity="0.4" strokeDasharray="1 2">
        <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" values="0;4" />
      </line>
    </svg>
  );
}

export function AgentGlyph({ name, ...props }: { name: string } & AgentGlyphProps) {
  switch (name) {
    case 'Historian': return <HistorianGlyph {...props} />;
    case 'Archivist': return <ArchivistGlyph {...props} />;
    case 'Lorekeeper': return <LorekeeperGlyph {...props} />;
    case 'Oracle': return <OracleGlyph {...props} />;
    case 'Diplomat': return <DiplomatGlyph {...props} />;
    case 'Worldbuilder': return <WorldbuilderGlyph {...props} />;
    case 'Narrator': return <NarratorGlyph {...props} />;
    default: return null;
  }
}
