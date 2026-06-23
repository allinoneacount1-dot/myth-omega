// Mythic chapter glyphs — custom SVG mark per chapter
// Geometry: sacred triangles, celestial arcs, foundation pillars
// Each glyph is symbolic, NOT decorative.

export type GlyphKey = 'forgetting' | 'birth' | 'culture' | 'civilization' | 'engine' | 'future' | 'myth';

export interface GlyphProps {
  size?: number;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

// Chapter I — The Age of Forgetting
// Fractured circle, one segment missing. Data without meaning.
export function GlyphForgetting({ size = 64, className = '', stroke = 'currentColor', strokeWidth = 1 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="26" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M32 6 A26 26 0 0 1 58 32" stroke={stroke} strokeWidth={strokeWidth} opacity="0.25" />
      <path d="M58 32 A26 26 0 0 1 32 58" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <circle cx="32" cy="32" r="3" fill={stroke} />
    </svg>
  );
}

// Chapter II — Birth of Stories
// Triangle with apex pointing up, enclosed circle (the story within)
export function GlyphBirth({ size = 64, className = '', stroke = 'currentColor', strokeWidth = 1 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M32 8 L56 52 L8 52 Z" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="32" cy="36" r="10" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="32" cy="36" r="2" fill={stroke} />
    </svg>
  );
}

// Chapter III — Rise of Culture
// Three ascending arcs — layers of meaning stacking
export function GlyphCulture({ size = 64, className = '', stroke = 'currentColor', strokeWidth = 1 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M8 48 Q32 32 56 48" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M8 38 Q32 22 56 38" stroke={stroke} strokeWidth={strokeWidth} opacity="0.65" />
      <path d="M8 28 Q32 12 56 28" stroke={stroke} strokeWidth={strokeWidth} opacity="0.35" />
      <line x1="8" y1="54" x2="56" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

// Chapter IV — Digital Civilizations
// Nested squares — worlds within worlds within worlds
export function GlyphCivilization({ size = 64, className = '', stroke = 'currentColor', strokeWidth = 1 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="14" y="14" width="36" height="36" stroke={stroke} strokeWidth={strokeWidth} opacity="0.7" />
      <rect x="22" y="22" width="20" height="20" stroke={stroke} strokeWidth={strokeWidth} opacity="0.4" />
      <circle cx="32" cy="32" r="3" fill={stroke} />
    </svg>
  );
}

// Chapter V — The Culture Engine
// Concentric circles with crosshair — the engine core
export function GlyphEngine({ size = 64, className = '', stroke = 'currentColor', strokeWidth = 1 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="26" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="32" cy="32" r="18" stroke={stroke} strokeWidth={strokeWidth} opacity="0.7" />
      <circle cx="32" cy="32" r="10" stroke={stroke} strokeWidth={strokeWidth} opacity="0.4" />
      <line x1="6" y1="32" x2="58" y2="32" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <line x1="32" y1="6" x2="32" y2="58" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <circle cx="32" cy="32" r="2" fill={stroke} />
    </svg>
  );
}

// Chapter VI — The Future
// Vertical line rising, with horizon line — legacy extending upward
export function GlyphFuture({ size = 64, className = '', stroke = 'currentColor', strokeWidth = 1 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <line x1="6" y1="54" x2="58" y2="54" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="32" y1="54" x2="32" y2="8" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="32" cy="20" r="6" stroke={stroke} strokeWidth={strokeWidth} opacity="0.5" />
      <circle cx="32" cy="14" r="3" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M26 36 L32 30 L38 36" stroke={stroke} strokeWidth={strokeWidth} opacity="0.6" />
    </svg>
  );
}

// MYTH brand mark — M as a monument (two pillars + apex)
export function MythMark({ size = 48, className = '', stroke = 'currentColor', strokeWidth = 1.5 }: GlyphProps) {
  return (
    <svg width={size} height={(size * 32) / 48} viewBox="0 0 48 32" fill="none" className={className} aria-hidden="true">
      <line x1="6" y1="28" x2="6" y2="4" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="42" y1="28" x2="42" y2="4" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M6 4 L24 18 L42 4" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="2" y1="30" x2="46" y2="30" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

export const GLYPH_MAP: Record<GlyphKey, (props: GlyphProps) => JSX.Element> = {
  forgetting: GlyphForgetting,
  birth: GlyphBirth,
  culture: GlyphCulture,
  civilization: GlyphCivilization,
  engine: GlyphEngine,
  future: GlyphFuture,
  myth: MythMark,
};