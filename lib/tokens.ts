// MYTH OMEGA — Design Tokens
// The Cultural Engine. Sacred geometry meets futuristic minimalism.

export const tokens = {
  // Color — Void-led, Ancient Gold as primary accent, rare cyan/ember
  color: {
    void: '#05070B',          // Page bg — deep cosmic black
    voidDeep: '#02030A',      // Layered bg for depth
    gold: '#D8B36A',          // Ancient gold — primary accent (legacy, sacred)
    goldDeep: '#A88B4F',      // Hover / dim state of gold
    ivory: '#F7F4EE',         // Celestial ivory — primary text
    ivoryMuted: '#9A9389',    // Secondary text
    sapphire: '#10213A',      // Deep sapphire — section dividers / surface
    cyan: '#3AE9E0',          // Aurora cyan — rare accent (live state only)
    ember: '#A33A4A',         // Crimson ember — warning / hot state
    rule: 'rgba(247, 244, 238, 0.08)',  // Hairline borders
    ruleStrong: 'rgba(216, 179, 106, 0.25)', // Accent hairline
  },

  // Type — Editorial display, readable body, mono labels
  font: {
    display: '"Tenor Sans", "Cormorant Garamond", Georgia, serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "SF Mono", "Consolas", monospace',
  },

  // 3-tier typography rhythm
  type: {
    headlineHero: { size: 'clamp(56px, 9vw, 144px)', line: '0.94', tracking: '-0.02em', weight: 400 },
    headlineSection: { size: 'clamp(40px, 6vw, 88px)', line: '1.02', tracking: '-0.015em', weight: 400 },
    headlineEditorial: { size: 'clamp(28px, 3.5vw, 52px)', line: '1.15', tracking: '-0.01em', weight: 400 },
    bodyLg: { size: '20px', line: '1.7', tracking: '0', weight: 400 },
    bodyMd: { size: '16px', line: '1.65', tracking: '0', weight: 400 },
    bodySm: { size: '14px', line: '1.55', tracking: '0', weight: 400 },
    label: { size: '11px', line: '1.4', tracking: '0.18em', weight: 500, transform: 'uppercase' },
  },

  // Spacing — 3 section tiers
  spacing: {
    sectionSm: 'clamp(72px, 10vh, 120px)',
    sectionMd: 'clamp(120px, 18vh, 200px)',
    sectionLg: 'clamp(160px, 24vh, 280px)',
  },

  // Motion — signature timing
  ease: {
    mythic: [0.22, 1, 0.36, 1],     // Custom cinematic ease-out
    reveal: [0.65, 0, 0.35, 1],     // Symmetric ease
    soft: [0.4, 0, 0.2, 1],         // Material standard
  },

  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.4,
    cinematic: 2.4,
  },

  // Layout
  maxWidth: '1440px',
  gutter: 'clamp(24px, 4vw, 64px)',
} as const;

export type Tokens = typeof tokens;