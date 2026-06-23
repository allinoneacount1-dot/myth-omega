// MYTH Civilization Profiles — Deep content for each civilization

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'founding' | 'conflict' | 'discovery' | 'treaty' | 'cataclysm' | 'golden_age';
}

export interface KeyFigure {
  name: string;
  title: string;
  status: 'alive' | 'deceased' | 'missing' | 'exiled';
  description: string;
}

export interface ActiveQuest {
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed' | 'dormant';
  reward: string;
}

export interface GovernanceProposal {
  title: string;
  description: string;
  status: 'voting' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  quorum: number;
}

export interface CivilizationProfile {
  id: number;
  name: string;
  slug: string;
  genre: string;
  tagline: string;
  description: string;
  color: string;
  members: number;
  health: number;
  canonEntries: number;
  era: string;
  location: string;
  founded: string;
  agents: string[];
  keyLocations: string[];
  timeline: TimelineEvent[];
  keyFigures: KeyFigure[];
  activeQuests: ActiveQuest[];
  governance: {
    constitution: string;
    currentLeader: string;
    treasury: number;
    proposals: GovernanceProposal[];
  };
  lore: {
    creationMyth: string;
    coreBelief: string;
    sacredSymbol: string;
    taboo: string;
  };
}

export const CIVILIZATION_PROFILES: Record<string, CivilizationProfile> = {
  aetheria: {
    id: 1,
    name: 'Aetheria',
    slug: 'aetheria',
    genre: 'Mythic Fantasy',
    tagline: 'Where crystal citadels catch the light of three suns',
    description: 'A realm where mythic forces shape the very bedrock of existence. Floating citadels of crystal catch the light of three suns, while ancient prophecies echo through corridors of living stone. Aetheria is a civilization built on the tension between divine mandate and mortal ambition — where the gods still speak, but their words are increasingly unclear.',
    color: '#D8B36A',
    members: 2847,
    health: 94,
    canonEntries: 142,
    era: 'Ascension',
    location: 'The Crystalline Provinces',
    founded: 'Year 0 — The First Refraction',
    agents: ['Oracle', 'Diplomat'],
    keyLocations: ['The Crystalline Provinces', 'The Oracle Sanctum', 'The Bridge of Echoes', 'The Prism Spire', 'The Shimmering Depths'],
    timeline: [
      { year: 'Y0', title: 'The First Refraction', description: 'The three suns align for the first time in a thousand years. Their combined light reveals the Crystalline Provinces — vast floating landmasses of living crystal that had been invisible to mortal eyes.', type: 'founding' },
      { year: 'Y12', title: 'The Founding of the Prism Spire', description: 'Architects of the First Age complete the Prism Spire — a tower that channels the light of all three suns into a single beam of pure aether, establishing Aetheria\'s seat of power.', type: 'golden_age' },
      { year: 'Y47', title: 'The Silence of the Gods', description: 'For the first time in recorded history, the gods cease all communication. The Oracle Sanctum falls silent. Panic spreads through the provinces.', type: 'cataclysm' },
      { year: 'Y53', title: 'The Mortal Covenant', description: 'With the gods silent, the people of Aetheria draft the Mortal Covenant — a constitution that transfers divine authority to a council of elected representatives.', type: 'treaty' },
      { year: 'Y89', title: 'The Bridge of Echoes Completed', description: 'A massive bridge of resonant crystal is completed, connecting the three major provinces. It is said that whispers spoken on one end can be heard on the other, regardless of distance.', type: 'discovery' },
      { year: 'Y124', title: 'The Ember Accord Treaty', description: 'Aetheria signs a historic treaty with the Ember Accord, establishing trade routes and mutual defense pacts. The Diplomat brokers the deal after three years of negotiation.', type: 'treaty' },
      { year: 'Y156', title: 'Current Era — The Ascension', description: 'Aetheria enters its golden age. The Prism Spire has been upgraded to channel aether more efficiently. New citadels rise. The question on everyone\'s mind: will the gods return?', type: 'golden_age' },
    ],
    keyFigures: [
      { name: 'Seraphina Dawnward', title: 'High Luminary', status: 'alive', description: 'Elected leader of the Prism Council. A former architect who redesigned the Spire\'s aether channels. Believes the gods\' silence is a test, not an abandonment.' },
      { name: 'Kael Ashford', title: 'The Silent Oracle', status: 'alive', description: 'Last person to hear the gods\' voices. Has not spoken since the Silence of Y47, communicating only through written prophecy. His notes are considered sacred texts.' },
      { name: 'Thorne Crystalheart', title: 'Warden of the Depths', status: 'alive', description: 'Commander of the Shimmering Depths garrison. Protects the underbelly of the floating provinces from creatures that dwell in the aether below.' },
      { name: 'Lyra Prismfall', title: 'The Exiled Scholar', status: 'exiled', description: 'Brilliant theorist who claimed the gods never existed — that the "divine voices" were always just the crystal resonating with solar energy. Exiled for heresy.' },
    ],
    activeQuests: [
      { title: 'The Resonance Mystery', description: 'Strange vibrations have been detected deep within the crystal bedrock. Some believe it is the gods returning. Others fear it is something far older waking beneath the provinces.', status: 'active', reward: 'Access to the Deep Resonance Chamber' },
      { title: 'The Lost Citadel', description: 'A fourth province was always rumored to exist — a citadel that refracts light into colors unseen. Expeditions have found traces but never the source.', status: 'active', reward: 'Discovery of new aether type' },
      { title: 'Lyra\'s Return', description: 'The exiled scholar Lyra Prismfall has been spotted near the Shimmering Depths. The Council wants her brought back — for trial or for answers.', status: 'dormant', reward: 'Resolution of the heresy question' },
    ],
    governance: {
      constitution: 'The Mortal Covenant — Authority flows from the people through elected representatives. The Prism Council governs; the High Luminary executes. All citizens have the right to address the Council during the monthly Refraction Assembly.',
      currentLeader: 'Seraphina Dawnward, High Luminary',
      treasury: 847000,
      proposals: [
        { title: 'Expand the Deep Watch', description: 'Increase garrison size in the Shimmering Depths by 40% to address increasing creature activity.', status: 'voting', votesFor: 1247, votesAgainst: 892, quorum: 1500 },
        { title: 'Open the Sealed Archives', description: 'Grant public access to the pre-Silence divine recordings held in the Oracle Sanctum.', status: 'voting', votesFor: 2103, votesAgainst: 445, quorum: 1500 },
        { title: 'The Lyra Question', description: 'Offer amnesty to Lyra Prismfall in exchange for her research findings.', status: 'pending', votesFor: 0, votesAgainst: 0, quorum: 1500 },
      ],
    },
    lore: {
      creationMyth: 'In the beginning, there was only light — formless, directionless, infinite. The three suns were born from the first three thoughts of the cosmos: Hope, Memory, and Becoming. Where their light intersected, crystal grew. And from the crystal, the first Aetherians emerged — beings of solidified light who could hear the suns\' whispers.',
      coreBelief: 'Light is not merely illumination — it is information. Every color carries meaning. Every refraction reveals truth. To understand the full spectrum is to understand the divine.',
      sacredSymbol: 'The Triad Prism — three interlocking crystals representing the three suns and the three virtues of Aetheria: Clarity, Resonance, and Ascension.',
      taboo: 'To block or absorb light without releasing it is the deepest sin in Aetherian culture. Shadows are not evil, but they are incomplete — and to choose shadow over light is to choose ignorance.',
    },
  },
  'chronos-veil': {
    id: 2,
    name: 'Chronos Veil',
    slug: 'chronos-veil',
    genre: 'Sci-Fi Noir',
    tagline: 'A civilization caught in the folds of its own timeline',
    description: 'A civilization caught in the folds of its own timeline. Neon-lit streets stretch across dimensions where past and future bleed together, and memory is the only currency that matters. Chronos Veil is a noir world of temporal detectives, corporate time-hoarders, and ghosts that haven\'t been born yet.',
    color: '#3AE9E0',
    members: 1203,
    health: 78,
    canonEntries: 89,
    era: 'Maturity',
    location: 'The Temporal Districts',
    founded: 'Year 0 — The First Fold',
    agents: ['Historian', 'Archivist'],
    keyLocations: ['The Temporal Districts', 'The Archive Infinite', 'The Midnight Meridian', 'The Paradox Market', 'The Echo Quarter'],
    timeline: [
      { year: 'Y0', title: 'The First Fold', description: 'Scientist Dr. Elara Voss accidentally tears the fabric of spacetime, creating the first temporal fold. The area around the fold becomes the first Temporal District — a zone where time flows at different speeds in different blocks.', type: 'founding' },
      { year: 'Y8', title: 'The Temporal Rush', description: 'Corporations discover that information from the future can be extracted from the folds. A gold rush begins. The Temporal Districts expand rapidly, built on stolen time.', type: 'golden_age' },
      { year: 'Y23', title: 'The Paradox Plague', description: 'Too many temporal extractions cause reality to destabilize. People begin experiencing memories from timelines that never happened. The Paradox Plague kills hundreds and leaves thousands with fractured identities.', type: 'cataclysm' },
      { year: 'Y31', title: 'The Chronos Accords', description: 'The surviving factions sign the Chronos Accords — strict regulations on temporal extraction. The Archive Infinite is established as the neutral repository of all temporal records.', type: 'treaty' },
      { year: 'Y45', title: 'The Ghost Wars', description: 'Entities from collapsed timelines — "ghosts" — begin manifesting in the Echo Quarter. A brutal conflict erupts between those who want to study them and those who want them destroyed.', type: 'conflict' },
      { year: 'Y67', title: 'The Midnight Meridian Opens', description: 'A stable temporal corridor is established at the Midnight Meridian — the only safe passage between the Temporal Districts and the outside world. Trade and communication normalize.', type: 'discovery' },
      { year: 'Y89', title: 'Current Era — The Maturity', description: 'Chronos Veil has stabilized but remains haunted. The Archive Infinite holds more temporal data than any other institution. The question now: what happens when the folds collapse entirely?', type: 'golden_age' },
    ],
    keyFigures: [
      { name: 'Detective Mira Chen', title: 'Temporal Investigator', status: 'alive', description: 'The best temporal detective in the Veil. Specializes in crimes that haven\'t happened yet. Haunted by a case involving a murder that occurs in a timeline she can\'t access.' },
      { name: 'Dr. Elara Voss', title: 'The Foldmaker', status: 'deceased', description: 'Creator of the first temporal fold. Died in the Paradox Plague, but her consciousness is believed to be scattered across multiple timelines. Some claim to have met her in the Echo Quarter.' },
      { name: 'Director Kael Morrow', title: 'Head of the Archive Infinite', status: 'alive', description: 'Guardian of all temporal records. Knows more about the past and future than any living person. Rumored to have read his own death record and changed nothing.' },
      { name: 'The Echo', title: 'Unknown Entity', status: 'alive', description: 'A being that claims to be the collective consciousness of all collapsed timelines. Speaks in fragments of events that never happened. Neither fully trusted nor fully dismissed.' },
    ],
    activeQuests: [
      { title: 'The Unsolved Future', description: 'A murder has been detected in a sealed timeline. Detective Chen needs help accessing the evidence before the timeline collapses entirely.', status: 'active', reward: 'Access to restricted temporal data' },
      { title: 'Voss\'s Scattered Mind', description: 'Fragments of Dr. Voss\'s consciousness have been detected in three different timelines. Reassembling them could unlock the secret of stable temporal travel.', status: 'active', reward: 'Temporal navigation technology' },
      { title: 'The Ghost Uprising', description: 'The Echo Quarter ghosts are organizing. They demand recognition as citizens with rights. The Archive Infinite is divided on the question.', status: 'dormant', reward: 'Resolution of the ghost rights question' },
    ],
    governance: {
      constitution: 'The Chronos Accords — Temporal extraction is regulated by the Archive Infinite. All citizens have the right to their own timeline. Paradox creation is a crime. The Director of the Archive serves as arbiter of temporal disputes.',
      currentLeader: 'Director Kael Morrow, Head of the Archive Infinite',
      treasury: 312000,
      proposals: [
        { title: 'Ghost Citizenship Act', description: 'Grant legal personhood and citizenship rights to entities from collapsed timelines residing in the Echo Quarter.', status: 'voting', votesFor: 445, votesAgainst: 678, quorum: 800 },
        { title: 'Temporal Extraction Tax', description: 'Impose a 15% tax on all commercial temporal extraction to fund Archive Infinite expansion.', status: 'voting', votesFor: 892, votesAgainst: 234, quorum: 800 },
        { title: 'The Voss Protocol', description: 'Establish a formal research program to locate and potentially reassemble Dr. Elara Voss\'s scattered consciousness.', status: 'passed', votesFor: 1023, votesAgainst: 156, quorum: 800 },
      ],
    },
    lore: {
      creationMyth: 'Time was never a river. Time was a still ocean, perfect and unchanging. Dr. Voss did not break time — she revealed that it was already broken. The folds were always there, hidden in the spaces between seconds. Chronos Veil is not a civilization that damaged time. It is a civilization that learned to live in the cracks.',
      coreBelief: 'Memory is the only true currency. Gold can be stolen, property can be destroyed, but a memory — a real memory, verified by the Archive — is the one thing that persists across all timelines.',
      sacredSymbol: 'The Fractured Clock — a clock face with hands pointing in multiple directions, representing the many timelines that coexist in the Veil.',
      taboo: 'To deliberately create a paradox — to act in a way that erases your own timeline — is the ultimate crime. Not because it is destructive, but because it is selfish. You are not just killing yourself. You are killing everyone who remembers you.',
    },
  },
  'amber-highlands': {
    id: 3,
    name: 'The Amber Highlands',
    slug: 'amber-highlands',
    genre: 'Epic Saga',
    tagline: 'Vast golden plateaus beneath an eternal twilight',
    description: 'Vast golden plateaus stretch beneath an eternal twilight, where the greatest stories ever told are carved into mountainsides and the wind carries the songs of a thousand generations. The Amber Highlands is the oldest and most storied civilization in the MYTH network — a living epic where every family has a saga and every stone has a name.',
    color: '#A88B4F',
    members: 5621,
    health: 97,
    canonEntries: 312,
    era: 'Ascension',
    location: 'The Golden Plateaus',
    founded: 'Year 0 — The First Song',
    agents: ['Worldbuilder', 'Historian'],
    keyLocations: ['The Golden Plateaus', 'The Chronicle Peaks', 'The Hall of Ancestors', 'The Eternal Forge', 'The Whispering Steppe'],
    timeline: [
      { year: 'Y0', title: 'The First Song', description: 'The First Singer carves the creation story into the tallest peak. The mountain weeps amber, and from the tears, the first Highlanders emerge — beings of living stone and golden light.', type: 'founding' },
      { year: 'Y34', title: 'The Age of Carving', description: 'Every family begins carving their saga into the mountains. The Chronicle Peaks become the largest repository of stories in the known world. The Historian is appointed to ensure no saga is forgotten.', type: 'golden_age' },
      { year: 'Y78', title: 'The War of Echoes', description: 'Two great houses claim the same ancestral story. The resulting conflict — the War of Echoes — lasts twelve years and reshapes the political landscape of the Highlands.', type: 'conflict' },
      { year: 'Y95', title: 'The Pact of Stone', description: 'The warring houses sign the Pact of Stone — an agreement that all stories belong to the land, not to any family. The Hall of Ancestors is built as a neutral repository.', type: 'treaty' },
      { year: 'Y156', title: 'The Worldbuilder\'s Gift', description: 'The Worldbuilder expands the Highlands, creating the Whispering Steppe — a vast grassland where the wind carries fragments of every story ever told. New settlements flourish.', type: 'discovery' },
      { year: 'Y234', title: 'The Eternal Forge Ignites', description: 'Deep beneath the Chronicle Peaks, the Eternal Forge is discovered — a source of living amber that can be shaped into artifacts of immense power. The Forge becomes the economic heart of the Highlands.', type: 'golden_age' },
      { year: 'Y312', title: 'Current Era — The Ascension', description: 'The Amber Highlands stands as the most culturally rich civilization in the MYTH network. The Chronicle Peaks are visible from orbit. The question now: what new saga will define the next age?', type: 'golden_age' },
    ],
    keyFigures: [
      { name: 'Sage Aldric Stonevoice', title: 'Keeper of the Chronicle Peaks', status: 'alive', description: 'The oldest living Highlander. His voice can resonate with the stone, reading the ancient carvings directly. He has memorized over 10,000 family sagas.' },
      { name: 'Warrior-Queen Brenna Goldhand', title: 'Ruler of the Eternal Forge', status: 'alive', description: 'Controls the amber trade and the Forge\'s output. A former warrior who lost her left hand in battle and replaced it with a prosthetic of living amber — the first of its kind.' },
      { name: 'The Wanderer (true name unknown)', title: 'The Uncarved', status: 'alive', description: 'A mysterious figure who appears at significant moments in Highland history but has never carved their own saga. Some believe they are the First Singer, returned.' },
      { name: 'Lord Cassian Ashford', title: 'The Last of House Ashford', status: 'missing', description: 'The final descendant of one of the great houses from the War of Echoes. Disappeared into the Whispering Steppe three years ago. His saga remains unfinished.' },
    ],
    activeQuests: [
      { title: 'The Unfinished Saga', description: 'Lord Cassian\'s disappearance has left House Ashford\'s saga incomplete. Sage Aldric believes the answer lies in the deepest carvings of the Chronicle Peaks — layers that predate the First Song.', status: 'active', reward: 'Completion of the oldest saga' },
      { title: 'The Forge\'s Heart', description: 'The Eternal Forge is producing amber at an unprecedented rate. Some believe the Forge is preparing for something — but no one knows what.', status: 'active', reward: 'Discovery of the Forge\'s true purpose' },
      { title: 'The Wanderer\'s Saga', description: 'For the first time in recorded history, the Wanderer has agreed to tell their story — but only to someone who can prove they understand what it means to be uncarved.', status: 'dormant', reward: 'The First Singer\'s true story' },
    ],
    governance: {
      constitution: 'The Pact of Stone — All stories belong to the land. Governance is by council of Sage-Keepers, each representing a region of the Highlands. The Keeper of the Chronicle Peaks serves as first among equals. Major decisions require a "Singing" — a public recitation of the relevant sagas to ensure continuity.',
      currentLeader: 'Sage Aldric Stonevoice, Keeper of the Chronicle Peaks',
      treasury: 1245000,
      proposals: [
        { title: 'The Deep Carving Project', description: 'Fund an expedition to read the deepest, oldest carvings in the Chronicle Peaks — layers that may predate the First Song.', status: 'voting', votesFor: 3421, votesAgainst: 892, quorum: 3000 },
        { title: 'Forge Expansion Charter', description: 'Expand the Eternal Forge\'s operations to meet growing amber demand, with environmental safeguards for the surrounding plateaus.', status: 'voting', votesFor: 2890, votesAgainst: 1567, quorum: 3000 },
        { title: 'The Cassian Memorial', description: 'Carve a memorial saga for Lord Cassian Ashford, officially closing House Ashford\'s chapter in Highland history.', status: 'rejected', votesFor: 1234, votesAgainst: 3456, quorum: 3000 },
      ],
    },
    lore: {
      creationMyth: 'Before the world, there was a song. The First Singer hummed the melody that shaped stone into mountains, drew amber from the earth, and gave voice to the wind. When the song ended, the Singer carved it into the tallest peak so it would never be forgotten. The mountains still hum with that original melody — if you know how to listen.',
      coreBelief: 'Stories are not entertainment. Stories are architecture. They are the structure that holds a civilization together. A story forgotten is a wall collapsed. A story preserved is a fortress that will stand forever.',
      sacredSymbol: 'The Carved Mountain — a stylized representation of the Chronicle Peaks, with amber light radiating from the carved lines.',
      taboo: 'To deliberately erase or alter someone\'s carved saga is the gravest crime in the Highlands. It is not merely vandalism — it is murder. You are killing the person\'s place in history, ensuring they will be forgotten.',
    },
  },
  'void-meridian': {
    id: 4,
    name: 'Void Meridian',
    slug: 'void-meridian',
    genre: 'Cosmic Horror',
    tagline: 'Born from the tear between dimensions',
    description: 'Born from the tear between dimensions, this civilization thrives at the edge of the known. Reality bends here — and those who dwell within have learned to speak the language of the void. Void Meridian is not for the faint of heart. It is a civilization built on the understanding that the universe is far stranger and far more hostile than anyone wants to admit.',
    color: '#9B4DFF',
    members: 892,
    health: 62,
    canonEntries: 56,
    era: 'Genesis',
    location: 'The Breach Zone',
    founded: 'Year 0 — The Tearing',
    agents: ['Oracle', 'Lorekeeper'],
    keyLocations: ['The Breach Zone', 'The Threshold Sanctum', 'The Whispering Dark', 'The Fracture Market', 'The Blind Observatory'],
    timeline: [
      { year: 'Y0', title: 'The Tearing', description: 'A dimensional breach opens in the void between realities. The Breach Zone forms — an area where the laws of physics are suggestions rather than rules. The first Void Meridians are researchers who chose to stay and study the phenomenon.', type: 'founding' },
      { year: 'Y3', title: 'The First Contact', description: 'Something on the other side of the Breach responds to the researchers\' signals. Communication is established, but the language is alien — it bypasses the ears and speaks directly to the mind.', type: 'discovery' },
      { year: 'Y12', title: 'The Threshold Sanctum Built', description: 'The Threshold Sanctum is constructed at the edge of the Breach — a temple-laboratory where the faithful study the void. The Oracle is the first to achieve sustained contact with the entities beyond.', type: 'golden_age' },
      { year: 'Y23', title: 'The Whispering Dark Incident', description: 'A group of researchers venture too deep into the Breach. They return changed — speaking in languages that don\'t exist, seeing things that aren\'t there. The Whispering Dark is declared a restricted zone.', type: 'cataclysm' },
      { year: 'Y34', title: 'The Lorekeeper\'s Edict', description: 'The Lorekeeper issues a formal classification system for void entities and phenomena. Contact protocols are established. The Fracture Market opens as a trading post for void-touched artifacts.', type: 'treaty' },
      { year: 'Y45', title: 'Current Era — The Genesis', description: 'Void Meridian is still young, still dangerous, still growing. The Breach widens slowly. The question is not whether something will come through — but when, and whether the Meridians will be ready.', type: 'golden_age' },
    ],
    keyFigures: [
      { name: 'The Oracle (Void-Touched)', title: 'Voice of the Breach', status: 'alive', description: 'The only person who can communicate fluently with entities beyond the Breach. Has not slept in eleven years, claiming that sleep opens doors that should remain closed.' },
      { name: 'Keeper Yara Nighthollow', title: 'Head of the Lorekeeper Order', status: 'alive', description: 'Maintains the classification system for void phenomena. Has personally catalogued 237 distinct entity types. Insists that understanding is the only defense against the void.' },
      { name: 'Dr. Silas Crane', title: 'The Fracture Market Founder', status: 'alive', description: 'A former researcher who realized that void-touched artifacts have practical applications. Built the Fracture Market from nothing. Some say he\'s too comfortable with the void.' },
      { name: 'The Returned (collective)', title: 'The Changed', status: 'alive', description: 'The researchers who ventured into the Whispering Dark and came back altered. They speak as one voice now, claiming to be "translated" rather than "corrupted." Their true nature is debated.' },
    ],
    activeQuests: [
      { title: 'The Widening', description: 'The Breach is expanding at an accelerating rate. The Oracle predicts a major incursion within the year. The Threshold Sanctum needs resources to prepare.', status: 'active', reward: 'Breach stabilization technology' },
      { title: 'The Returned\'s Message', description: 'The Returned have begun speaking in unison, delivering a message they claim comes from the other side. The Lorekeeper needs help translating it — but some believe the message is a trap.', status: 'active', reward: 'First contact protocol upgrade' },
      { title: 'The Blind Observatory', description: 'A new structure has appeared in the Whispering Dark — one that wasn\'t built by anyone. It appears to be observing the Meridians. Who — or what — built it?', status: 'dormant', reward: 'Discovery of void architecture' },
    ],
    governance: {
      constitution: 'The Threshold Protocols — Survival supersedes all other concerns. The Oracle advises. The Lorekeeper classifies. The community decides. All citizens undergo void-exposure training. Contact with unclassified entities is forbidden without Lorekeeper approval.',
      currentLeader: 'Keeper Yara Nighthollow, Head of the Lorekeeper Order',
      treasury: 187000,
      proposals: [
        { title: 'Breach Containment Initiative', description: 'Allocate 40% of treasury to fund Breach containment research and Threshold Sanctum fortification.', status: 'voting', votesFor: 445, votesAgainst: 312, quorum: 600 },
        { title: 'The Returned Integration Act', description: 'Grant the Returned full citizenship rights and a seat on the governing council, recognizing their unique perspective.', status: 'voting', votesFor: 234, votesAgainst: 567, quorum: 600 },
        { title: 'Fracture Market Regulation', description: 'Impose safety standards on void-touched artifact trading to prevent uncontrolled void exposure.', status: 'passed', votesFor: 678, votesAgainst: 123, quorum: 600 },
      ],
    },
    lore: {
      creationMyth: 'There was no creation. There was only the void — infinite, patient, and aware. The Breach was not an accident. It was an invitation. The void has been waiting for someone to answer. The Void Meridians are the first to say yes.',
      coreBelief: 'Reality is a consensus. The void is what happens when the consensus breaks down. To live at the Breach is to live at the edge of agreement — where the universe hasn\'t decided what is real yet.',
      sacredSymbol: 'The Open Eye — an eye with no iris, representing the void\'s gaze and the Meridians\' willingness to look back.',
      taboo: 'To close your eyes in the Breach is to deny the void its due. The Meridians do not look away. To look away is to admit fear, and fear is the door the void walks through.',
    },
  },
  'ember-accord': {
    id: 5,
    name: 'Ember Accord',
    slug: 'ember-accord',
    genre: 'Political Drama',
    tagline: 'A civilization forged in the fires of negotiation and narrative',
    description: 'A civilization forged in the fires of negotiation and narrative. Seven capital rings orbit each other in an eternal dance of power, where every alliance is a story and every betrayal reshapes the map. Ember Accord is a world of spies, diplomats, and storytellers — where the pen and the dagger are equally deadly.',
    color: '#FF4D00',
    members: 3410,
    health: 88,
    canonEntries: 201,
    era: 'Maturity',
    location: 'The Capital Rings',
    founded: 'Year 0 — The First Accord',
    agents: ['Diplomat', 'Narrator'],
    keyLocations: ['The Capital Rings', 'The Accord Chamber', 'The Ember Forum', 'The Whispering Gallery', 'The Ashen Archives'],
    timeline: [
      { year: 'Y0', title: 'The First Accord', description: 'Seven warring city-states sign the First Accord — a peace treaty that establishes the Capital Rings, seven independent but interconnected city-states that orbit a central neutral zone.', type: 'founding' },
      { year: 'Y15', title: 'The Accord Chamber Established', description: 'The Accord Chamber is built at the center of the Rings — a neutral ground where representatives from all seven city-states meet. The Diplomat is appointed as permanent mediator.', type: 'treaty' },
      { year: 'Y34', title: 'The Narrative Wars', description: 'A conflict erupts not over territory, but over history. Two city-states claim the same founding myth. The Narrator is called in to adjudicate, establishing the principle that "he who controls the story controls the peace."', type: 'conflict' },
      { year: 'Y56', title: 'The Ember Forum Opens', description: 'The Ember Forum is established as a public space where citizens can debate policy. It becomes the heart of Accord democracy — and the most dangerous room in the civilization.', type: 'golden_age' },
      { year: 'Y78', title: 'The Ashen Betrayal', description: 'A trusted diplomat is revealed to have been spying for a foreign power. The Ashen Archives — a secret repository of all diplomatic correspondence — is created to prevent future betrayals.', type: 'cataclysm' },
      { year: 'Y123', title: 'The Aetheria Treaty', description: 'The Diplomat brokers a historic treaty with Aetheria, establishing the first inter-civilization trade route. The Accord\'s influence expands beyond its borders.', type: 'treaty' },
      { year: 'Y167', title: 'Current Era — The Maturity', description: 'Ember Accord is at its political peak. The seven Rings are stable. The Forum is vibrant. But whispers of a new betrayal echo through the Whispering Gallery.', type: 'golden_age' },
    ],
    keyFigures: [
      { name: 'Chancellor Vivienne Ashcroft', title: 'Speaker of the Accord Chamber', status: 'alive', description: 'The most skilled politician in the Accord. Has held the Speaker position for 15 years through a combination of genuine competence and carefully managed secrets.' },
      { name: 'The Diplomat (Ember Title)', title: 'Permanent Mediator', status: 'alive', description: 'Has served as mediator for 167 years through a combination of skill, patience, and an uncanny ability to find the compromise that leaves everyone slightly dissatisfied but willing to agree.' },
      { name: 'Marcus Thornfield', title: 'Voice of the Ember Forum', status: 'alive', description: 'The most popular public speaker in the Accord. His Forum speeches can shift public opinion overnight. Some say he\'s the real power behind the Chamber.' },
      { name: 'The Archivist (Ember Division)', title: 'Keeper of the Ashen Archives', status: 'alive', description: 'Guardian of all secret diplomatic correspondence. Knows every secret, every betrayal, every hidden alliance. Has never leaked a single document. No one knows why.' },
    ],
    activeQuests: [
      { title: 'The Whispering Gallery Leak', description: 'Someone is leaking classified diplomatic information through the Whispering Gallery. The Ashen Archives must identify the source before the next Accord session.', status: 'active', reward: 'Security upgrade for the Archives' },
      { title: 'The Seventh Ring Crisis', description: 'The smallest of the seven Capital Rings is threatening to secede, claiming unfair representation in the Accord Chamber. The Diplomat must negotiate before the union fractures.', status: 'active', reward: 'Constitutional reform' },
      { title: 'The Narrator\'s Next Story', description: 'The Narrator has announced a new "living story" — a narrative that will unfold in real-time across all seven Rings, with citizens as participants. The implications are unclear.', status: 'dormant', reward: 'Participation in the living story' },
    ],
    governance: {
      constitution: 'The First Accord — Seven Rings, one Chamber. Each Ring governs itself internally. The Accord Chamber handles inter-Ring affairs. The Speaker is elected by the Chamber. The Diplomat mediates. The Ember Forum provides public input. All decisions require a majority of five of seven Rings.',
      currentLeader: 'Chancellor Vivienne Ashcroft, Speaker of the Accord Chamber',
      treasury: 934000,
      proposals: [
        { title: 'The Seventh Ring Representation Act', description: 'Increase the Seventh Ring\'s voting weight in the Chamber to address secession concerns.', status: 'voting', votesFor: 1890, votesAgainst: 1234, quorum: 2000 },
        { title: 'Gallery Security Protocol', description: 'Implement new security measures in the Whispering Gallery to prevent information leaks.', status: 'voting', votesFor: 2567, votesAgainst: 445, quorum: 2000 },
        { title: 'The Living Story Charter', description: 'Establish legal framework for the Narrator\'s "living story" initiative, including participant rights and narrative boundaries.', status: 'pending', votesFor: 0, votesAgainst: 0, quorum: 2000 },
      ],
    },
    lore: {
      creationMyth: 'In the beginning, there were seven fires. Each fire was a people, a language, a story. They burned alone, and their light was dim. Then the First Diplomat walked between the fires and said: "Your flames are stronger together." The fires merged — not into one, but into a ring of seven, each distinct, each essential. The heat of their combined light forged the Accord.',
      coreBelief: 'Power is not taken. Power is negotiated. Every relationship is a treaty. Every conversation is a negotiation. The strongest civilization is not the one with the most soldiers — it is the one with the best diplomats.',
      sacredSymbol: 'The Seven Flames — seven flames arranged in a circle, each a different color, representing the seven Capital Rings united in the Accord.',
      taboo: 'To break a sworn oath is the only unforgivable crime in the Ember Accord. Not murder — murder can be politically justified. But a broken oath is a crack in the foundation of civilization itself.',
    },
  },
  'silent-bloom': {
    id: 6,
    name: 'Silent Bloom',
    slug: 'silent-bloom',
    genre: 'Pastoral Mystery',
    tagline: 'Beneath a canopy of ancient trees, mysteries unfold',
    description: 'Beneath a canopy of ancient trees, mysteries unfold in the spaces between seasons. The people of the basin speak in riddles and tend gardens that grow stories instead of fruit. Silent Bloom is the quietest civilization in the MYTH network — and possibly the most dangerous, because its secrets run deeper than anyone realizes.',
    color: '#00B4A8',
    members: 1567,
    health: 71,
    canonEntries: 78,
    era: 'Ascension',
    location: 'The Verdant Basin',
    founded: 'Year 0 — The First Seed',
    agents: ['Narrator', 'Worldbuilder'],
    keyLocations: ['The Verdant Basin', 'The Garden of Whispers', 'The Root Labyrinth', 'The Canopy Library', 'The Silent Spring'],
    timeline: [
      { year: 'Y0', title: 'The First Seed', description: 'A seed falls from a tree that has no name. Where it lands, the Verdant Basin forms — a vast, hidden valley where the trees grow so tall their canopy blocks the sky. The first Bloom-folk emerge from the undergrowth.', type: 'founding' },
      { year: 'Y23', title: 'The Garden of Whispers Planted', description: 'The first Garden of Whispers is planted — a garden where the flowers carry messages from those who have passed. The garden becomes the spiritual heart of Silent Bloom.', type: 'discovery' },
      { year: 'Y45', title: 'The Root Labyrinth Discovered', description: 'Beneath the Basin, an enormous network of roots is discovered — not from any known tree, but from something far older. The Root Labyrinth becomes a place of pilgrimage and study.', type: 'discovery' },
      { year: 'Y67', title: 'The Silence Falls', description: 'For one full season, no sound is heard in the Basin. No wind, no birdsong, no voices. When sound returns, three villages have vanished — not destroyed, simply gone, as if they never existed.', type: 'cataclysm' },
      { year: 'Y89', title: 'The Canopy Library Built', description: 'Scholars build the Canopy Library — a network of platforms and walkways high in the treetops where the Bloom-folk\'s oral histories are finally recorded in written form.', type: 'golden_age' },
      { year: 'Y134', title: 'The Worldbuilder\'s Expansion', description: 'The Worldbuilder extends the Basin\'s borders, creating new groves and meadows. But the new growth behaves strangely — the trees grow in patterns that match the Root Labyrinth below.', type: 'discovery' },
      { year: 'Y178', title: 'Current Era — The Ascension', description: 'Silent Bloom is growing. The Garden of Whispers has spread to every village. The Root Labyrinth\'s deepest chambers remain unexplored. And the question lingers: what made the Silence fall?', type: 'golden_age' },
    ],
    keyFigures: [
      { name: 'Elder Moss Greentongue', title: 'Keeper of the Garden of Whispers', status: 'alive', description: 'The oldest Bloom-folk. Can communicate with the whisper-flowers, receiving messages from the dead. Speaks only in riddles, claiming "straight answers grow straight lies."' },
      { name: 'Thalia Rootwalker', title: 'Explorer of the Deep Labyrinth', status: 'alive', description: 'Has mapped more of the Root Labyrinth than any other living person. Claims to have heard something breathing in the deepest chamber. No one has gone with her to verify.' },
      { name: 'The Narrator (Bloom Aspect)', title: 'Voice of the Seasons', status: 'alive', description: 'Composes the seasonal stories that bind the Bloom-folk together. Each season brings a new tale, and each tale changes the way the Basin behaves. The line between story and reality is thin here.' },
      { name: 'The Forgotten (collective)', title: 'The Unnamed', status: 'missing', description: 'The people of the three vanished villages. They are not dead — the whisper-flowers carry their voices. But they are not alive in any conventional sense. They exist in the spaces between stories.' },
    ],
    activeQuests: [
      { title: 'The Deepest Root', description: 'Thalia Rootwalker is preparing an expedition to the deepest chamber of the Root Labyrinth. She needs companions brave enough to face whatever is breathing down there.', status: 'active', reward: 'Discovery of the Labyrinth\'s heart' },
      { title: 'The Forgotten\'s Message', description: 'The whisper-flowers have begun carrying a new message from the Forgotten — a warning. But the message is fragmented, scattered across hundreds of flowers. It needs to be reassembled.', status: 'active', reward: 'The Forgotten\'s warning revealed' },
      { title: 'The Next Silence', description: 'Elder Greentongue has predicted that the Silence will fall again — and next time, it may not lift. The Garden of Whispers is growing flowers that have never been seen before.', status: 'dormant', reward: 'Prevention of the Eternal Silence' },
    ],
    governance: {
      constitution: 'The Root Accord — Governance is by consensus of the village elders, mediated by the Keeper of the Garden. Decisions are made by planting a seed in the Garden of Whispers; if the seed blooms, the decision is blessed. If it withers, the decision is reconsidered. Major decisions require the Narrator to compose a story that captures the will of the people.',
      currentLeader: 'Elder Moss Greentongue, Keeper of the Garden of Whispers',
      treasury: 234000,
      proposals: [
        { title: 'The Deep Expedition Charter', description: 'Officially fund and equip Thalia Rootwalker\'s expedition to the deepest Root Labyrinth chamber.', status: 'voting', votesFor: 892, votesAgainst: 312, quorum: 1000 },
        { title: 'The Forgotten Memorial Garden', description: 'Plant a new section of the Garden of Whispers dedicated to the three vanished villages, preserving their memory.', status: 'voting', votesFor: 1123, votesAgainst: 234, quorum: 1000 },
        { title: 'Canopy Library Expansion', description: 'Extend the Canopy Library to include the new groves created by the Worldbuilder, documenting the strange growth patterns.', status: 'passed', votesFor: 1345, votesAgainst: 123, quorum: 1000 },
      ],
    },
    lore: {
      creationMyth: 'The world was planted, not created. A seed of impossible size fell from a place with no name and rooted in silence. From that seed grew the Great Tree — the mother of all trees in the Verdant Basin. The Bloom-folk are not the tree\'s children. We are its dreams. And like all dreams, we are real only as long as the tree remembers us.',
      coreBelief: 'Silence is not emptiness. Silence is the space where the most important things grow. Words are seeds. Stories are gardens. And the deepest truths are found not in speech, but in the quiet between words.',
      sacredSymbol: 'The Whispering Flower — a flower with petals that seem to move even when there is no wind, representing the voices of the dead carried on the breeze.',
      taboo: 'To speak the name of a dead person aloud is forbidden. Names are planted in the Garden of Whispers, where they grow into flowers. To speak a name is to uproot the flower — to silence the dead a second time.',
    },
  },
};

export function getCivilizationBySlug(slug: string): CivilizationProfile | undefined {
  return CIVILIZATION_PROFILES[slug.toLowerCase()];
}

export function getAllCivilizationSlugs(): string[] {
  return Object.keys(CIVILIZATION_PROFILES);
}
