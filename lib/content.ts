// MYTH Content — All chapter copy in one place.
// Editorial voice. No marketing speak. No exclamations. Measured.

export interface Chapter {
  index: number;
  roman: string;
  glyph: 'forgetting' | 'birth' | 'culture' | 'civilization' | 'engine' | 'future';
  title: string;
  sub: string;
  body: string[];
  manifest?: string;
}

export const HERO = {
  eyebrow: 'The Culture Engine',
  title: 'MYTH',
  manifesto: 'Build worlds that outlive you.',
  chapter: 'Chapter Zero',
  chapterLine: 'A civilization operating system for the persistent age.',
};

export const CHAPTERS: Chapter[] = [
  {
    index: 1,
    roman: 'I',
    glyph: 'forgetting',
    title: 'The Age of Forgetting',
    sub: 'The Internet Remembers Data. Humanity Forgets Meaning.',
    body: [
      'Every server holds petabytes of information. Every archive preserves fragments.',
      'And yet the stories that bind us — the myths, the rituals, the small sacred geometries of a people — slip between the seams of every database designed to remember them.',
      'We built infrastructure for facts. We forgot to build infrastructure for meaning.',
    ],
    manifest: 'A civilization is not its records. A civilization is what its people carry forward.',
  },
  {
    index: 2,
    roman: 'II',
    glyph: 'birth',
    title: 'The Birth of Stories',
    sub: 'Every civilization begins with a myth.',
    body: [
      'Before governments. Before currencies. Before maps.',
      'A voice in the dark, telling a story that explains where we came from and why we are here.',
      'The myth is not entertainment. The myth is the operating system of a people. It tells them what to value, what to fear, what to build, and what to leave unfinished.',
      'Every empire, every faith, every movement that lasted a thousand years began as a story someone refused to let die.',
    ],
  },
  {
    index: 3,
    roman: 'III',
    glyph: 'culture',
    title: 'The Rise of Culture',
    sub: 'Culture is humanity\'s operating system.',
    body: [
      'Stories become beliefs. Beliefs become rituals. Rituals become identity. Identity becomes civilization.',
      'This is the chain that has run unbroken for ten thousand years — until now.',
      'The chain is breaking. Not because we lack stories, but because we lack infrastructure to preserve, evolve, and inherit them across generations.',
    ],
    manifest: 'The internet gave us infinite copies. It did not give us inheritance.',
  },
  {
    index: 4,
    roman: 'IV',
    glyph: 'civilization',
    title: 'Digital Civilizations',
    sub: 'Communities become worlds. Worlds become civilizations.',
    body: [
      'A Discord server is not a civilization. A subreddit is not a civilization. A DAO is not a civilization — not yet.',
      'But each contains the seeds. A shared canon. A common language. In-jokes that bind strangers. Founders who become mythic. Disagreements that fracture identity.',
      'The pattern is the same. The substrate is new.',
      'For the first time in history, the substrate is programmable. The myths can be authored. The canon can be inherited. The civilization can persist beyond its founders.',
    ],
  },
  {
    index: 5,
    roman: 'V',
    glyph: 'engine',
    title: 'The Culture Engine',
    sub: 'Introducing MYTH.',
    body: [
      'MYTH is the first Culture Engine.',
      'A living system that enables collective imagination, identity, stories, values, symbols, rituals, governance, and history to evolve as persistent digital civilizations.',
      'It is not a platform. It is not a protocol. It is the substrate through which future civilizations will remember who they are.',
      'Powered by artificial intelligence. Secured by Solana. Designed for the long arc of meaning.',
    ],
    manifest: 'The internet solved information. Blockchain solved ownership. AI solved creation. MYTH solves culture.',
  },
  {
    index: 6,
    roman: 'VI',
    glyph: 'future',
    title: 'The Future',
    sub: 'Build what time cannot erase.',
    body: [
      'The civilizations that endure will not be the loudest. They will be the ones whose stories were kept.',
      'Whose lore was tended. Whose canon was protected. Whose history was not erased by the next migration, the next server outage, the next platform collapse.',
      'MYTH is the infrastructure for those who intend to be remembered.',
      'Not for the quarter. Not for the cycle. For the long, quiet, irreversible arc of inheritance.',
    ],
  },
];

export const TOKEN = {
  symbol: 'MYTH',
  name: 'MYTH',
  tagline: 'The participation layer of a living civilization.',
  body: [
    'MYTH is not a passive asset. It is not a yield instrument. It is not a promise of return.',
    'It is the unit of participation in a civilization you are helping to build.',
    'Holding MYTH is holding a vote in the next chapter of a shared story. Spending MYTH is commissioning the next era of a world. Locking MYTH is pledging to the long-term future of a canon.',
  ],
  uses: [
    { title: 'Governance', desc: 'Vote on canon additions, lore conflicts, and constitutional matters of your civilization.' },
    { title: 'Creation Credits', desc: 'Commission new worlds, characters, timelines, and artifacts through the engine.' },
    { title: 'World Expansion', desc: 'Fund the expansion of existing civilizations. Earn participation in the worlds you help build.' },
    { title: 'Agent Access', desc: 'Unlock advanced AI agents — Historian, Archivist, Lorekeeper, Oracle, Diplomat, Worldbuilder, Narrator.' },
    { title: 'Cultural Asset Ownership', desc: 'Hold fractional stake in the cultural IP of the worlds you co-author.' },
    { title: 'Treasury Participation', desc: 'Co-steward the long-term treasury that funds the persistence of civilizations.' },
  ],
};

export const AGENTS = [
  {
    name: 'Historian',
    role: 'Continuity Keeper',
    desc: 'Maintains the canonical history of a civilization. Detects drift. Resolves contradictions. Preserves what must not be lost.',
    glyph: 'archive',
  },
  {
    name: 'Archivist',
    role: 'Living Memory',
    desc: 'Stores every decision, every artifact, every moment of community evolution as queryable, inheritable memory.',
    glyph: 'book',
  },
  {
    name: 'Lorekeeper',
    role: 'Canon Guardian',
    desc: 'Protects the integrity of the canon. Distinguishes between approved lore and emergent narrative. Holds the line on what the civilization is.',
    glyph: 'shield',
  },
  {
    name: 'Oracle',
    role: 'Narrative Evolution',
    desc: 'Reads the patterns of a civilization\'s unfolding. Predicts the natural next chapters. Offers paths that stay true to the canon while opening what must be opened.',
    glyph: 'eye',
  },
  {
    name: 'Diplomat',
    role: 'Civilization Interaction',
    desc: 'Manages relations between civilizations. Negotiates shared canon. Facilitates inter-world treaties and collaborative mythology.',
    glyph: 'bridge',
  },
  {
    name: 'Worldbuilder',
    role: 'Universe Expansion',
    desc: 'Generates new geographies, histories, and cosmological structures consistent with the established canon. Expands the possible without breaking the consistent.',
    glyph: 'mountain',
  },
  {
    name: 'Narrator',
    role: 'Living Events',
    desc: 'Composes the ongoing events that shape a civilization\'s present. Creates the small daily myths that bind a community to its moment.',
    glyph: 'wave',
  },
];

export const ECOSYSTEM = [
  {
    name: 'MYTH Genesis',
    desc: 'Civilization creation engine. Build worlds, nations, lore, characters, timelines from the first spark of an idea.',
  },
  {
    name: 'MYTH Intelligence',
    desc: 'The AI civilization layer. Historian, Archivist, Lorekeeper, Oracle, Diplomat, Worldbuilder, Narrator — seven agents, one canon.',
  },
  {
    name: 'MYTH Archive',
    desc: 'Living memory network. Not a database. A persistent, queryable inheritance of every civilization\'s evolution.',
  },
  {
    name: 'MYTH Commons',
    desc: 'Governance for civilizations. Voting, consensus, constitutional systems, community law.',
  },
  {
    name: 'MYTH Market',
    desc: 'Cultural economy. Worlds, stories, characters, lore, artifacts — cultural IP, owned and inherited.',
  },
  {
    name: 'MYTH Atlas',
    desc: 'Discovery layer for civilizations. Explore worlds. Trace histories. Travel the living canon.',
  },
];

export const FINAL = {
  title: 'Build what time cannot erase.',
  body: 'Every civilization in human history began with a story someone refused to let die. The next one begins with you.',
  cta: 'Enter MYTH',
};