// MYTH Canon Builder — AI-assisted lore creation helpers

export interface CanonEntry {
  id: string;
  civilization: string;
  title: string;
  content: string;
  type: 'lore' | 'character' | 'event' | 'artifact' | 'location' | 'myth';
  tags: string[];
  contradictions: string[];
  createdAt: string;
}

export interface CanonValidation {
  isConsistent: boolean;
  contradictions: string[];
  suggestions: string[];
}

export function generateCanonId(): string {
  return `canon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function validateCanonEntry(
  entry: Partial<CanonEntry>,
  existingEntries: CanonEntry[]
): CanonValidation {
  const contradictions: string[] = [];
  const suggestions: string[] = [];

  // Check for duplicate titles
  const duplicate = existingEntries.find(
    (e) => e.title.toLowerCase() === entry.title?.toLowerCase() && e.id !== entry.id
  );
  if (duplicate) {
    contradictions.push(`Title "${entry.title}" already exists in canon entry "${duplicate.id}"`);
  }

  // Check for content similarity
  if (entry.content && entry.content.length < 50) {
    suggestions.push('Content is very short. Consider expanding with more detail.');
  }

  return {
    isConsistent: contradictions.length === 0,
    contradictions,
    suggestions,
  };
}

export const CANON_TYPES = [
  { value: 'lore', label: 'Lore Entry', icon: '📜' },
  { value: 'character', label: 'Character', icon: '👤' },
  { value: 'event', label: 'Historical Event', icon: '⚔️' },
  { value: 'artifact', label: 'Artifact', icon: '🏺' },
  { value: 'location', label: 'Location', icon: '🗺️' },
  { value: 'myth', label: 'Creation Myth', icon: '✨' },
] as const;
