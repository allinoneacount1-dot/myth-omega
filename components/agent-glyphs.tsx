// Seven Agents — each with a unique custom SVG glyph
// Geometric DNA: hairline strokes, negative space, distinctive silhouette
// No stock icons. No Lucide. No Phosphor.

export interface AgentGlyphProps {
  size?: number;
  stroke?: string;
  className?: string;
}

// Historian — open scroll with time arrow
export function AgentHistorian({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M10 16 L32 22 L54 16" stroke={stroke} strokeWidth={1.2} />
      <path d="M10 48 L32 42 L54 48" stroke={stroke} strokeWidth={1.2} />
      <line x1="10" y1="16" x2="10" y2="48" stroke={stroke} strokeWidth={1.2} />
      <line x1="54" y1="16" x2="54" y2="48" stroke={stroke} strokeWidth={1.2} />
      <path d="M32 22 L32 42" stroke={stroke} strokeWidth={1.2} strokeDasharray="2 3" opacity="0.5" />
      <path d="M22 28 L42 32" stroke={stroke} strokeWidth={0.8} opacity="0.4" />
      <path d="M22 36 L42 32" stroke={stroke} strokeWidth={0.8} opacity="0.4" />
      <circle cx="32" cy="32" r="2" fill={stroke} />
    </svg>
  );
}

// Archivist — layered database cylinders
export function AgentArchivist({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <ellipse cx="32" cy="14" rx="20" ry="4" stroke={stroke} strokeWidth={1.2} />
      <path d="M12 14 L12 26" stroke={stroke} strokeWidth={1.2} />
      <path d="M52 14 L52 26" stroke={stroke} strokeWidth={1.2} />
      <path d="M12 26 Q32 32 52 26" stroke={stroke} strokeWidth={1.2} />
      <ellipse cx="32" cy="30" rx="20" ry="4" stroke={stroke} strokeWidth={1.2} opacity="0.7" />
      <path d="M12 30 L12 42" stroke={stroke} strokeWidth={1.2} opacity="0.7" />
      <path d="M52 30 L52 42" stroke={stroke} strokeWidth={1.2} opacity="0.7" />
      <path d="M12 42 Q32 48 52 42" stroke={stroke} strokeWidth={1.2} opacity="0.7" />
      <ellipse cx="32" cy="46" rx="20" ry="4" stroke={stroke} strokeWidth={1.2} opacity="0.4" />
      <path d="M12 46 L12 54" stroke={stroke} strokeWidth={1.2} opacity="0.4" />
      <path d="M52 46 L52 54" stroke={stroke} strokeWidth={1.2} opacity="0.4" />
    </svg>
  );
}

// Lorekeeper — shield with central glyph
export function AgentLorekeeper({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M32 8 L52 16 L52 32 Q52 48 32 56 Q12 48 12 32 L12 16 Z" stroke={stroke} strokeWidth={1.2} />
      <path d="M32 18 L42 22 L42 32 Q42 42 32 46 Q22 42 22 32 L22 22 Z" stroke={stroke} strokeWidth={1} opacity="0.5" />
      <line x1="32" y1="18" x2="32" y2="46" stroke={stroke} strokeWidth={1} opacity="0.6" />
      <circle cx="32" cy="32" r="3" fill={stroke} />
    </svg>
  );
}

// Oracle — eye with constellation inside
export function AgentOracle({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M8 32 Q32 12 56 32 Q32 52 8 32 Z" stroke={stroke} strokeWidth={1.2} />
      <circle cx="32" cy="32" r="9" stroke={stroke} strokeWidth={1.2} />
      <circle cx="32" cy="32" r="3" fill={stroke} />
      <circle cx="32" cy="32" r="14" stroke={stroke} strokeWidth={0.6} opacity="0.3" strokeDasharray="2 4" />
    </svg>
  );
}

// Diplomat — bridge with two pillars
export function AgentDiplomat({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <line x1="10" y1="20" x2="10" y2="54" stroke={stroke} strokeWidth={1.2} />
      <line x1="54" y1="20" x2="54" y2="54" stroke={stroke} strokeWidth={1.2} />
      <path d="M10 28 Q32 18 54 28" stroke={stroke} strokeWidth={1.2} />
      <line x1="14" y1="32" x2="22" y2="32" stroke={stroke} strokeWidth={0.8} opacity="0.5" />
      <line x1="28" y1="30" x2="36" y2="30" stroke={stroke} strokeWidth={0.8} opacity="0.5" />
      <line x1="42" y1="32" x2="50" y2="32" stroke={stroke} strokeWidth={0.8} opacity="0.5" />
      <path d="M10 40 L54 40" stroke={stroke} strokeWidth={1.2} opacity="0.4" />
      <line x1="6" y1="54" x2="58" y2="54" stroke={stroke} strokeWidth={1.2} />
    </svg>
  );
}

// Worldbuilder — mountain peaks with horizon
export function AgentWorldbuilder({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M6 50 L22 24 L32 36 L42 18 L58 50 Z" stroke={stroke} strokeWidth={1.2} />
      <line x1="6" y1="50" x2="58" y2="50" stroke={stroke} strokeWidth={1.2} />
      <circle cx="42" cy="18" r="3" stroke={stroke} strokeWidth={1} />
      <path d="M22 24 L26 30 L18 30 Z" stroke={stroke} strokeWidth={0.8} opacity="0.4" />
      <line x1="32" y1="36" x2="32" y2="50" stroke={stroke} strokeWidth={0.8} opacity="0.3" strokeDasharray="1 2" />
    </svg>
  );
}

// Narrator — wave with rising horizon
export function AgentNarrator({ size = 64, stroke = 'currentColor', className = '' }: AgentGlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M6 38 Q14 30 22 38 T38 38 T54 38" stroke={stroke} strokeWidth={1.2} />
      <path d="M6 44 Q14 36 22 44 T38 44 T54 44" stroke={stroke} strokeWidth={1.2} opacity="0.6" />
      <path d="M6 50 Q14 42 22 50 T38 50 T54 50" stroke={stroke} strokeWidth={1.2} opacity="0.35" />
      <line x1="6" y1="54" x2="58" y2="54" stroke={stroke} strokeWidth={1.2} />
      <circle cx="50" cy="14" r="4" stroke={stroke} strokeWidth={1} />
      <line x1="50" y1="18" x2="50" y2="30" stroke={stroke} strokeWidth={0.8} opacity="0.4" strokeDasharray="1 2" />
    </svg>
  );
}

export const AGENT_GLYPHS: Record<string, (props: AgentGlyphProps) => JSX.Element> = {
  Historian: AgentHistorian,
  Archivist: AgentArchivist,
  Lorekeeper: AgentLorekeeper,
  Oracle: AgentOracle,
  Diplomat: AgentDiplomat,
  Worldbuilder: AgentWorldbuilder,
  Narrator: AgentNarrator,
};