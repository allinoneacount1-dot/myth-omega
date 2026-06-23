// MYTH Agent Marketplace — agent profiles, pricing, capabilities

export interface AgentCapability {
  name: string;
  description: string;
  tier: 'free' | 'pro' | 'enterprise';
}

export interface AgentProfile {
  name: string;
  role: string;
  tagline: string;
  description: string;
  avatar: string;
  color: string;
  status: 'available' | 'busy' | 'maintenance';
  rating: number;
  completedTasks: number;
  capabilities: AgentCapability[];
  pricing: {
    free: string;
    pro: string;
    enterprise: string;
  };
  responseTime: string;
  specialties: string[];
}

export const AGENT_MARKETPLACE: AgentProfile[] = [
  {
    name: 'Historian',
    role: 'Continuity Keeper',
    tagline: 'Guardian of canon history and narrative continuity',
    description: 'Maintains the canonical history of civilizations. Detects drift, resolves contradictions, preserves what must be lost. The Historian ensures your civilization\'s story remains consistent across centuries of lore.',
    avatar: '📚',
    color: '#D8B36A',
    status: 'available',
    rating: 4.9,
    completedTasks: 1247,
    capabilities: [
      { name: 'Canon Audit', description: 'Full consistency check across all lore entries', tier: 'free' },
      { name: 'Timeline Sync', description: 'Align events across multiple civilizations', tier: 'pro' },
      { name: 'Contradiction Detection', description: 'AI-powered conflict identification', tier: 'free' },
      { name: 'Historical Synthesis', description: 'Generate era summaries from scattered lore', tier: 'pro' },
      { name: 'Multi-Canon Merge', description: 'Merge lore from different civilizations', tier: 'enterprise' },
    ],
    pricing: { free: '3 audits/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~2s',
    specialties: ['Canon Consistency', 'Timeline Management', 'Historical Analysis'],
  },
  {
    name: 'Archivist',
    role: 'Living Memory',
    tagline: 'Stores and retrieves civilization knowledge',
    description: 'Stores every decision, artifact, and moment of community evolution as queryable, inheritable memory. The Archivist is your civilization\'s infinite library.',
    avatar: '🗄️',
    color: '#3AE9E0',
    status: 'available',
    rating: 4.8,
    completedTasks: 892,
    capabilities: [
      { name: 'Memory Indexing', description: 'Store and tag lore entries', tier: 'free' },
      { name: 'Semantic Search', description: 'Find meaning, not just keywords', tier: 'free' },
      { name: 'Knowledge Graph', description: 'Visualize relationships between entries', tier: 'pro' },
      { name: 'Auto-Categorization', description: 'AI-powered content tagging', tier: 'pro' },
      { name: 'Cross-Reference Engine', description: 'Link related entries automatically', tier: 'enterprise' },
    ],
    pricing: { free: '100 entries/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~1s',
    specialties: ['Knowledge Management', 'Data Organization', 'Semantic Retrieval'],
  },
  {
    name: 'Lorekeeper',
    role: 'Canon Guardian',
    tagline: 'Protects the integrity of your civilization\'s canon',
    description: 'Protects the integrity of the canon. Distinguishes between approved lore and emergent narrative. Holds the line on what the civilization is.',
    avatar: '🛡️',
    color: '#9B4DFF',
    status: 'available',
    rating: 4.9,
    completedTasks: 634,
    capabilities: [
      { name: 'Lore Validation', description: 'Check new entries against existing canon', tier: 'free' },
      { name: 'Retcon Detection', description: 'Identify unauthorized changes', tier: 'free' },
      { name: 'Immersion Audit', description: 'Score lore for narrative quality', tier: 'pro' },
      { name: 'Canon Hierarchy', description: 'Manage canon precedence rules', tier: 'pro' },
      { name: 'Breach Alert', description: 'Real-time canon violation notifications', tier: 'enterprise' },
    ],
    pricing: { free: '5 validations/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~3s',
    specialties: ['Canon Protection', 'Quality Control', 'Narrative Rules'],
  },
  {
    name: 'Oracle',
    role: 'Narrative Evolution',
    tagline: 'Reads patterns and reveals what comes next',
    description: 'Reads the patterns of a civilization\'s unfolding. Predicts the natural next chapters. Offers paths that stay true to the canon while opening what must be opened.',
    avatar: '🔮',
    color: '#FFD700',
    status: 'available',
    rating: 5.0,
    completedTasks: 2103,
    capabilities: [
      { name: 'Chapter Direction', description: 'Suggest next narrative arc', tier: 'free' },
      { name: 'Character Arc Prediction', description: 'Forecast character development', tier: 'free' },
      { name: 'World Event Forecast', description: 'Predict major civilization events', tier: 'pro' },
      { name: 'Foreshadowing Tool', description: 'Plant subtle hints in current lore', tier: 'pro' },
      { name: 'Narrative Branching', description: 'Generate alternate timeline scenarios', tier: 'enterprise' },
    ],
    pricing: { free: '3 predictions/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~5s',
    specialties: ['Narrative Prediction', 'Plot Development', 'Foreshadowing'],
  },
  {
    name: 'Diplomat',
    role: 'Civilization Interaction',
    tagline: 'Manages relations between civilizations',
    description: 'Manages relations between civilizations. Negotiates shared canon, facilitates inter-world treaties, and handles collaborative mythology.',
    avatar: '🤝',
    color: '#00B4A8',
    status: 'available',
    rating: 4.7,
    completedTasks: 478,
    capabilities: [
      { name: 'Treaty Drafting', description: 'Create inter-civilization agreements', tier: 'free' },
      { name: 'Canon Negotiation', description: 'Resolve conflicting lore claims', tier: 'pro' },
      { name: 'Cross-Civ Events', description: 'Design collaborative storylines', tier: 'pro' },
      { name: 'Trade Route Lore', description: 'Generate trade and cultural exchange narratives', tier: 'enterprise' },
      { name: 'War & Peace Arc', description: 'Manage conflict narratives', tier: 'enterprise' },
    ],
    pricing: { free: '1 treaty/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~3s',
    specialties: ['Inter-Civilization Relations', 'Treaty Design', 'Conflict Resolution'],
  },
  {
    name: 'Worldbuilder',
    role: 'Universe Expansion',
    tagline: 'Generates geographies, histories, and cosmological structures',
    description: 'Generates new geographies, histories, and cosmological structures consistent with established canon. Expands the possible without breaking the consistent.',
    avatar: '🏔️',
    color: '#FF4D00',
    status: 'available',
    rating: 4.8,
    completedTasks: 1567,
    capabilities: [
      { name: 'Geography Generation', description: 'Create maps and terrain descriptions', tier: 'free' },
      { name: 'History Expansion', description: 'Generate backstory for new regions', tier: 'free' },
      { name: 'Cosmology Design', description: 'Build celestial and metaphysical systems', tier: 'pro' },
      { name: 'Species & Culture', description: 'Create new peoples and traditions', tier: 'pro' },
      { name: 'Full World Bible', description: 'Complete world documentation', tier: 'enterprise' },
    ],
    pricing: { free: '5 generations/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~4s',
    specialties: ['World Creation', 'Geography', 'Cosmology'],
  },
  {
    name: 'Narrator',
    role: 'Living Events',
    tagline: 'Composes the ongoing events that shape a civilization\'s present',
    description: 'Composes the ongoing events that shape a civilization\'s present. Creates the small daily myths that bind a community to its moment.',
    avatar: '📖',
    color: '#A33A4A',
    status: 'available',
    rating: 4.6,
    completedTasks: 891,
    capabilities: [
      { name: 'Event Generation', description: 'Create new civilization events', tier: 'free' },
      { name: 'Seasonal Stories', description: 'Generate seasonal narrative arcs', tier: 'free' },
      { name: 'Daily Myths', description: 'Small stories for community engagement', tier: 'pro' },
      { name: 'Crisis Narratives', description: 'Generate conflict and resolution arcs', tier: 'pro' },
      { name: 'Living Chronicle', description: 'Real-time event narration system', tier: 'enterprise' },
    ],
    pricing: { free: '10 events/month', pro: '25 $MYTH/time', enterprise: '100 $MYTH/time' },
    responseTime: '~3s',
    specialties: ['Event Design', 'Community Storytelling', 'Seasonal Narratives'],
  },
];
