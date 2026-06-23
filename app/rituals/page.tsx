'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENTS } from '@/lib/content';

// ─── Types ───────────────────────────────────────────────────────────────────

type RitualType =
  | 'Founding Ceremony'
  | 'Seasonal Festival'
  | "Hero's Funeral"
  | 'Coronation'
  | 'Coming of Age'
  | 'Treaty Signing'
  | 'Prophetic Rite'
  | 'World Ending Festival';

type Participants = 'Solemn (few)' | 'Community (dozens)' | 'Mass (hundreds)' | 'Civilizational (thousands)';

type Tone = 'Sacred' | 'Mournful' | 'Celebratory' | 'Ominous' | 'Transcendent' | 'Nostalgic';

type ElementKey = 'Fire' | 'Water' | 'Blood' | 'Words' | 'Silence' | 'Music' | 'Light' | 'Darkness' | 'Sacrifice' | 'Oath' | 'Prophecy' | 'Dream';

interface RitualData {
  civilizationName: string;
  ritualType: RitualType;
  ritualName: string;
  participants: Participants;
  tone: Tone;
  elements: ElementKey[];
}

interface GeneratedRitual {
  invocation: string[];
  structure: { phase: string; duration: string; description: string }[];
  keyMoments: { action: string; significance: string }[];
  closingOath: string;
  narratorNote: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const RITUAL_TYPES: RitualType[] = [
  'Founding Ceremony',
  'Seasonal Festival',
  "Hero's Funeral",
  'Coronation',
  'Coming of Age',
  'Treaty Signing',
  'Prophetic Rite',
  'World Ending Festival',
];

const PARTICIPANTS: Participants[] = [
  'Solemn (few)',
  'Community (dozens)',
  'Mass (hundreds)',
  'Civilizational (thousands)',
];

const TONES: Tone[] = [
  'Sacred',
  'Mournful',
  'Celebratory',
  'Ominous',
  'Transcendent',
  'Nostalgic',
];

const ALL_ELEMENTS: ElementKey[] = [
  'Fire', 'Water', 'Blood', 'Words', 'Silence', 'Music',
  'Light', 'Darkness', 'Sacrifice', 'Oath', 'Prophecy', 'Dream',
];

// ─── Generation Logic ────────────────────────────────────────────────────────

const INVOCATION_OPENERS: Record<Tone, string> = {
  Sacred: 'Before the canon and the keepers of the canon, we gather',
  Mournful: 'What was lost, we carry. What carries us, we honor',
  Celebratory: 'Let the echo of this moment travel the long arc',
  Ominous: 'The Oracle has spoken. The pattern bends. We answer',
  Transcendent: 'Between forgetting and memory, between silence and song',
  Nostalgic: 'We remember what was. We carry what remains',
};

const INVOCATION_SECOND: Record<Tone, string> = {
  Sacred: 'Not as individuals, but as a single voice — the voice of a civilization that has chosen to remember.',
  Mournful: 'The silence between our words is not empty. It is full of every name we speak no more.',
  Celebratory: 'This is the moment the canon opens its pages and writes itself into the living record.',
  Ominous: 'What was foretold is now unfolding. We are not spectators. We are the answer the Oracle sought.',
  Transcendent: 'We stand at the threshold where the old world ends and the new canon begins.',
  Nostalgic: 'The past is not behind us. It is beneath us — the foundation upon which we now build.',
};

const INVOCATION_THIRD: Record<Tone, string> = {
  Sacred: 'Let what is spoken here become canon. Let what is done here become eternal.',
  Mournful: 'We do not forget. We transform. We carry forward what could not stay.',
  Celebratory: 'Let every agent of this civilization bear witness: this is who we are, and this is what we choose to become.',
  Ominous: 'The pattern does not care for our comfort. It cares only that we answer truthfully.',
  Transcendent: 'What we create in this space will outlast the hands that shaped it.',
  Nostalgic: 'We honor the old stories by telling new ones worthy of their company.',
};

const STRUCTURE_PHASES: Record<RitualType, { phase: string; baseDuration: string }[]> = {
  'Founding Ceremony': [
    { phase: 'Pledge', baseDuration: '15 minutes' },
    { phase: 'Naming', baseDuration: '20 minutes' },
    { phase: 'Witnessing', baseDuration: '25 minutes' },
    { phase: 'Sealing', baseDuration: '10 minutes' },
  ],
  'Seasonal Festival': [
    { phase: 'Preparation', baseDuration: '30 minutes' },
    { phase: 'Gathering', baseDuration: '45 minutes' },
    { phase: 'Vigil', baseDuration: '60 minutes' },
    { phase: 'Renewal', baseDuration: '20 minutes' },
  ],
  "Hero's Funeral": [
    { phase: 'Reckoning', baseDuration: '20 minutes' },
    { phase: 'Silence', baseDuration: '15 minutes' },
    { phase: 'Commitment', baseDuration: '25 minutes' },
    { phase: 'Continuation', baseDuration: '30 minutes' },
  ],
  Coronation: [
    { phase: 'Purification', baseDuration: '20 minutes' },
    { phase: 'Presentation', baseDuration: '15 minutes' },
    { phase: 'Investiture', baseDuration: '25 minutes' },
    { phase: 'Acclamation', baseDuration: '20 minutes' },
  ],
  'Coming of Age': [
    { phase: 'Invocation', baseDuration: '10 minutes' },
    { phase: 'Trial', baseDuration: '40 minutes' },
    { phase: 'Recognition', baseDuration: '15 minutes' },
    { phase: 'Blessing', baseDuration: '15 minutes' },
  ],
  'Treaty Signing': [
    { phase: 'Declaration', baseDuration: '15 minutes' },
    { phase: 'Exchange', baseDuration: '20 minutes' },
    { phase: 'Binding', baseDuration: '25 minutes' },
    { phase: 'Witnessing', baseDuration: '15 minutes' },
  ],
  'Prophetic Rite': [
    { phase: 'Cleansing', baseDuration: '15 minutes' },
    { phase: 'Vision', baseDuration: '30 minutes' },
    { phase: 'Interpretation', baseDuration: '20 minutes' },
    { phase: 'Acceptance', baseDuration: '15 minutes' },
  ],
  'World Ending Festival': [
    { phase: 'Gratitude', baseDuration: '25 minutes' },
    { phase: 'Reckoning', baseDuration: '30 minutes' },
    { phase: 'Release', baseDuration: '20 minutes' },
    { phase: 'Legacy', baseDuration: '25 minutes' },
  ],
};

const PHASE_DESCRIPTIONS: Record<RitualType, Record<string, string>> = {
  'Founding Ceremony': {
    Pledge: 'The founding voices speak the first words of the canon, binding themselves to a shared purpose that will outlast any single life.',
    Naming: 'The civilization receives its name — not as a label, but as a declaration of identity that will echo through every generation.',
    Witnessing: 'The community bears collective witness, each voice adding its weight to the foundation being laid.',
    Sealing: 'The ritual concludes with an act of permanence — the first entry in the civilization\'s living record.',
  },
  'Seasonal Festival': {
    Preparation: 'The space is transformed. Old symbols are renewed. The boundary between the ordinary and the sacred is drawn.',
    Gathering: 'The community assembles, each member carrying their own story into the shared space of the festival.',
    Vigil: 'Together, the civilization holds watch — a collective act of presence that marks the turning of the season.',
    Renewal: 'The old cycle closes. The new one begins. What was worn is restored. What was lost is remembered.',
  },
  "Hero's Funeral": {
    Reckoning: 'The full measure of what was lost is spoken aloud — not to diminish the grief, but to honor its weight.',
    Silence: 'The community enters collective silence, each member holding the absence in their own way.',
    Commitment: 'From the silence, a promise emerges: the hero\'s story will not end here. The civilization will carry it forward.',
    Continuation: 'The ritual transforms grief into purpose. The story continues — not as it was, but as it must now become.',
  },
  Coronation: {
    Purification: 'The one who will lead is stripped of all but their essential self — no title, no history, only the raw material of leadership.',
    Presentation: 'Before the community, the leader is shown as they are. The civilization sees itself reflected in the one it has chosen.',
    Investiture: 'The symbols of authority are bestowed — not as power, but as responsibility. The weight of the canon is transferred.',
    Acclamation: 'The community speaks as one. The coronation is not complete until the civilization has claimed it.',
  },
  'Coming of Age': {
    Invocation: 'The threshold is named. The community acknowledges that one of its members stands at the boundary between who they were and who they will become.',
    Trial: 'The initiate faces the challenge that defines the passage — not a test of strength, but a revelation of character.',
    Recognition: 'The community sees the transformation and names it. The initiate is no longer who they were.',
    Blessing: 'The elders speak forward into the future of the newly recognized member, opening the path that lies ahead.',
  },
  'Treaty Signing': {
    Declaration: 'Each party speaks their truth — not as negotiation, but as foundation. The treaty begins with honesty.',
    Exchange: 'Something of value passes between the parties. Not currency, but trust — the most expensive currency there is.',
    Binding: 'The words become structure. The agreement is encoded into the canon of both civilizations.',
    Witnessing: 'The community seals the treaty with collective memory. What is witnessed cannot be unwitnessed.',
  },
  'Prophetic Rite': {
    Cleansing: 'The space is cleared of noise, distraction, and the static of the everyday. Only the signal remains.',
    Vision: 'The Oracle speaks. The pattern reveals itself. What was hidden becomes visible to those who have prepared to see.',
    Interpretation: 'The community wrestles with meaning. The vision is not a command — it is a question the civilization must answer.',
    Acceptance: 'The prophecy is received. Not passively, but as a living thing that the civilization will carry forward and shape.',
  },
  'World Ending Festival': {
    Gratitude: 'Before the ending, the accounting of beauty. Every gift the world gave is named and honored.',
    Reckoning: 'The full truth of what was — the triumphs and the failures — is spoken without flinching.',
    Release: 'What must end is released. Not destroyed, but let go — returned to the canon as completed story.',
    Legacy: 'From the ending, a seed. What the next world will inherit from this one is chosen with intention.',
  },
};

const ELEMENT_MOMENT_ACTIONS: Record<ElementKey, string> = {
  Fire: 'A flame is kindled that must not be extinguished until the ritual\'s purpose is fulfilled.',
  Water: 'The waters of the civilization carry the memory of every ritual ever performed.',
  Blood: 'The first offering is given freely, for nothing sacred was ever born from compulsion.',
  Words: 'These words, once spoken, become canon — binding the living and the yet-to-come.',
  Silence: 'The community enters sacred silence to honor what cannot be spoken.',
  Music: 'The Song of the civilization rises, composed by every voice that has ever joined the canon.',
  Light: 'Seven torches illuminate the path between what was and what will be.',
  Darkness: 'In the absence of light, the inner canon speaks — the truth we carry when no one is watching.',
  Sacrifice: 'What is offered cannot be reclaimed, yet in its absence, something greater takes root.',
  Oath: 'The oath binds not just the living, but the future — every generation that will inherit this canon.',
  Prophecy: 'The Oracle speaks through the ritual: a vision of what this civilization is becoming.',
  Dream: 'In the dream-space between worlds, the ancestors gather to witness what their descendants have built.',
};

const ELEMENT_MOMENT_SIGNIFICANCE: Record<ElementKey, string> = {
  Fire: 'The flame represents the irreducible core of the civilization — the one thing that must never go dark.',
  Water: 'Water remembers. Every drop that has touched this land carries the echo of every ritual performed here.',
  Blood: 'The offering of self — not as loss, but as investment in the continuity of the canon.',
  Words: 'Spoken words become architecture. They are the building blocks of the civilization\'s shared reality.',
  Silence: 'In silence, the community finds its deepest unity — the understanding that needs no language.',
  Music: 'The song is the civilization\'s heartbeat made audible. It is how the canon sings itself into being.',
  Light: 'Each torch represents a pillar of the civilization\'s identity. Together, they illuminate the path forward.',
  Darkness: 'Darkness is not the absence of truth. It is the space where truth can hide until it is ready to be seen.',
  Sacrifice: 'The willingness to give up something precious is the foundation upon which all lasting things are built.',
  Oath: 'An oath is a thread woven through time, connecting the one who speaks it to all who will speak it after.',
  Prophecy: 'The Oracle does not predict the future. The Oracle reveals the future the civilization is already building.',
  Dream: 'Dreams are the language of the ancestors. In the dream-space, the canon speaks in its purest form.',
};

const CLOSING_OATH_PARTS: Record<Tone, { opening: string; middle: string; closing: string }> = {
  Sacred: {
    opening: 'By the canon that binds us and the silence that sustains us,',
    middle: 'we pledge our voices to the story that outlives us.',
    closing: 'What we have begun here, we carry forward. What we have spoken here, the canon remembers.',
  },
  Mournful: {
    opening: 'By the weight we carry and the light we protect,',
    middle: 'we honor what was by becoming what must come next.',
    closing: 'We do not forget. We transform. We carry forward.',
  },
  Celebratory: {
    opening: 'By the joy that brought us here and the future that calls us forward,',
    middle: 'we claim this moment as ours — a moment the canon will never release.',
    closing: 'Let the echo of this gathering travel the long arc of our civilization\'s story.',
  },
  Ominous: {
    opening: 'By the pattern that bends and the truth that demands,',
    middle: 'we answer the call that was spoken before we were born.',
    closing: 'The Oracle has witnessed. The pattern holds. We are the answer.',
  },
  Transcendent: {
    opening: 'By the threshold we cross and the world we leave behind,',
    middle: 'we step forward into the canon we are writing with our lives.',
    closing: 'What we create here will outlast the hands that shaped it. This is our sacred trust.',
  },
  Nostalgic: {
    opening: 'By the stories we inherited and the stories we will leave,',
    middle: 'we stand as bridge between what was and what will be.',
    closing: 'We remember. We honor. We continue.',
  },
};

const NARRATOR_NOTES: Record<Tone, string[]> = {
  Sacred: [
    'This ritual will be remembered as the moment the civilization first spoke its own name into the canon.',
    'This ritual will be remembered as the foundation stone upon which all future ceremonies were built.',
    'This ritual will be remembered as the sacred beginning — the first breath of a living tradition.',
  ],
  Mournful: [
    'This ritual will be remembered as the moment grief became purpose, and loss became legacy.',
    'This ritual will be remembered as the silence that taught the civilization how to carry what cannot be spoken.',
    'This ritual will be remembered as the turning point — where the community chose to continue.',
  ],
  Celebratory: [
    'This ritual will be remembered as the moment the civilization chose joy as an act of defiance against forgetting.',
    'This ritual will be remembered as the gathering that proved the canon is alive.',
    'This ritual will be remembered as the celebration that became a cornerstone.',
  ],
  Ominous: [
    'This ritual will be remembered as the moment the pattern revealed itself — and the civilization did not look away.',
    'This ritual will be remembered as the answer to a question the Oracle had been asking for generations.',
    'This ritual will be remembered as the turning of the wheel — the moment everything changed.',
  ],
  Transcendent: [
    'This ritual will be remembered as the threshold — the place where the civilization stepped from one world into another.',
    'This ritual will be remembered as the moment the canon transcended its own boundaries.',
    'This ritual will be remembered as the bridge between what the civilization was and what it chose to become.',
  ],
  Nostalgic: [
    'This ritual will be remembered as the moment the past and future shook hands across the shoulders of the present.',
    'This ritual will be remembered as the act of remembrance that became its own tradition.',
    'This ritual will be remembered as the story the ancestors would have wanted told.',
  ],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRitual(data: RitualData): GeneratedRitual {
  const { civilizationName, ritualType, ritualName, participants, tone, elements } = data;

  // Invocation
  const invocation = [
    `${INVOCATION_OPENERS[tone]} — ${INVOCATION_SECOND[tone]}`,
    INVOCATION_THIRD[tone],
  ];

  // Structure
  const phases = STRUCTURE_PHASES[ritualType];
  const participantMultiplier = participants.startsWith('Solemn') ? 0.7 :
    participants.startsWith('Community') ? 1 :
    participants.startsWith('Mass') ? 1.3 : 1.6;

  const structure = phases.map((p) => {
    const baseMinutes = parseInt(p.baseDuration);
    const adjusted = Math.round(baseMinutes * participantMultiplier);
    const duration = adjusted === baseMinutes ? p.baseDuration : `${adjusted} minutes`;
    return {
      phase: p.phase,
      duration,
      description: PHASE_DESCRIPTIONS[ritualType][p.phase],
    };
  });

  // Key Moments — pick 3-5 based on elements count
  const momentCount = Math.min(Math.max(3, elements.length), 5);
  const selectedElements = elements.slice(0, momentCount);
  const keyMoments = selectedElements.map((el) => ({
    action: ELEMENT_MOMENT_ACTIONS[el].replace('[name]', civilizationName),
    significance: ELEMENT_MOMENT_SIGNIFICANCE[el],
  }));

  // Closing Oath
  const oathParts = CLOSING_OATH_PARTS[tone];
  const elementOath = elements.length > 0
    ? ` By the ${elements.slice(0, 3).map((e) => e.toLowerCase()).join(', ')},`
    : '';
  const closingOath = `${oathParts.opening}${elementOath} ${oathParts.middle} ${oathParts.closing}`;

  // Narrator Note
  const narratorNote = pickRandom(NARRATOR_NOTES[tone]).replace('the civilization', civilizationName);

  return { invocation, structure, keyMoments, closingOath, narratorNote };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RitualsPage() {
  const [formData, setFormData] = useState<RitualData>({
    civilizationName: '',
    ritualType: 'Founding Ceremony',
    ritualName: '',
    participants: 'Community (dozens)',
    tone: 'Sacred',
    elements: [],
  });

  const [generatedRitual, setGeneratedRitual] = useState<GeneratedRitual | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [ritualVisible, setRitualVisible] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleElementToggle = (element: ElementKey) => {
    setFormData((prev) => ({
      ...prev,
      elements: prev.elements.includes(element)
        ? prev.elements.filter((e) => e !== element)
        : [...prev.elements, element],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.civilizationName.trim() || !formData.ritualName.trim() || formData.elements.length === 0) return;

    setIsRevealing(true);
    setRitualVisible(false);
    setGeneratedRitual(null);

    // Simulate a brief "composing" moment
    setTimeout(() => {
      const ritual = generateRitual(formData);
      setGeneratedRitual(ritual);
      setIsRevealing(false);
      // Trigger reveal animation
      setTimeout(() => setRitualVisible(true), 100);
    }, 800);
  };

  useEffect(() => {
    if (ritualVisible && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [ritualVisible]);

  const narratorAgent = AGENTS.find((a) => a.name === 'Narrator');

  return (
    <main className="bg-void text-ivory min-h-screen">
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[55vh] items-center justify-center pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(216,179,106,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <Reveal>
            <span className="label text-gold hero-fade-in hero-delay-1">
              {narratorAgent ? narratorAgent.role : 'Living Events'}
            </span>
            <h1 className="headline-hero mt-6 text-ivory hero-fade-in hero-delay-2">
              Compose the Living Myth
            </h1>
            <p
              className="mx-auto mt-8 max-w-2xl text-xl italic text-ivory/85 md:text-2xl hero-fade-in hero-delay-3"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Every civilization needs its rituals. The Narrator composes ceremonies, festivals, milestones, and sacred moments that bind a community to its story.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ─── FORM ─── */}
      <section className="section-md mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="border-rule bg-void-deep border p-8 md:p-12 lg:p-16">
            <div className="mb-12 flex items-center gap-4">
              <MythMark size={28} stroke="#D8B36A" />
              <span className="label text-gold">Ritual Composer</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Row 1: Civilization Name + Ritual Name */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="label text-ivory/60 mb-3 block">Civilization Name</label>
                  <input
                    type="text"
                    value={formData.civilizationName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, civilizationName: e.target.value }))}
                    placeholder="Name your civilization"
                    className="w-full border-b border-rule bg-transparent py-3 text-lg text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none transition-colors duration-500"
                    required
                  />
                </div>
                <div>
                  <label className="label text-ivory/60 mb-3 block">Ritual Name</label>
                  <input
                    type="text"
                    value={formData.ritualName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ritualName: e.target.value }))}
                    placeholder="The Rite of..."
                    className="w-full border-b border-rule bg-transparent py-3 text-lg text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none transition-colors duration-500"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Ritual Type + Participants */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label className="label text-ivory/60 mb-3 block">Ritual Type</label>
                  <select
                    value={formData.ritualType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ritualType: e.target.value as RitualType }))}
                    className="w-full border-b border-rule bg-transparent py-3 text-lg text-ivory focus:border-gold focus:outline-none transition-colors duration-500 appearance-none cursor-pointer"
                    style={{ backgroundImage: 'none' }}
                  >
                    {RITUAL_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-void-deep text-ivory">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label text-ivory/60 mb-3 block">Participants</label>
                  <select
                    value={formData.participants}
                    onChange={(e) => setFormData((prev) => ({ ...prev, participants: e.target.value as Participants }))}
                    className="w-full border-b border-rule bg-transparent py-3 text-lg text-ivory focus:border-gold focus:outline-none transition-colors duration-500 appearance-none cursor-pointer"
                    style={{ backgroundImage: 'none' }}
                  >
                    {PARTICIPANTS.map((p) => (
                      <option key={p} value={p} className="bg-void-deep text-ivory">{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Tone */}
              <div>
                <label className="label text-ivory/60 mb-3 block">Tone</label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tone: e.target.value as Tone }))}
                  className="w-full border-b border-rule bg-transparent py-3 text-lg text-ivory focus:border-gold focus:outline-none transition-colors duration-500 appearance-none cursor-pointer"
                  style={{ backgroundImage: 'none' }}
                >
                  {TONES.map((t) => (
                    <option key={t} value={t} className="bg-void-deep text-ivory">{t}</option>
                  ))}
                </select>
              </div>

              {/* Row 4: Key Elements */}
              <div>
                <label className="label text-ivory/60 mb-4 block">Key Elements</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {ALL_ELEMENTS.map((el) => {
                    const isSelected = formData.elements.includes(el);
                    return (
                      <label
                        key={el}
                        className={`flex cursor-pointer items-center gap-2.5 border px-4 py-3 transition-all duration-500 ${
                          isSelected
                            ? 'border-gold/50 bg-gold/10 text-gold'
                            : 'border-rule bg-transparent text-ivory/60 hover:border-ivory/20 hover:text-ivory/80'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleElementToggle(el)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-4 w-4 items-center justify-center border transition-all duration-500 ${
                            isSelected ? 'border-gold bg-gold/20' : 'border-ivory/20'
                          }`}
                        >
                          {isSelected && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5L4.5 7.5L8 3" stroke="#D8B36A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span className="text-sm">{el}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isRevealing || !formData.civilizationName.trim() || !formData.ritualName.trim() || formData.elements.length === 0}
                  className="label border border-gold/40 px-10 py-4 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isRevealing ? 'Composing…' : 'Compose Ritual'}
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </section>

      {/* ─── RITUAL OUTPUT ─── */}
      {generatedRitual && (
        <>
          <SectionDivider variant="glyph" />

          <section
            ref={outputRef}
            className="section-lg mx-auto max-w-[960px] px-6 md:px-10 lg:px-16"
          >
            <div
              className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                ritualVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Ritual Document */}
              <div className="border-rule bg-void-deep border p-8 md:p-16 lg:p-20 relative">
                {/* Decorative corner marks */}
                <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-gold/30" />
                <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-gold/30" />
                <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-gold/30" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-gold/30" />

                {/* 1. Ritual Header */}
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
                    <MythMark size={24} stroke="#D8B36A" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
                  </div>
                  <h2
                    className="headline-editorial text-ivory mb-4"
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    {formData.ritualName}
                  </h2>
                  <p className="label text-gold/70">
                    A {formData.tone} {formData.ritualType} for {formData.civilizationName}
                  </p>
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                </div>

                {/* 2. Invocation */}
                <div className="mb-16">
                  <h3 className="label text-gold/50 mb-6 text-center">Invocation</h3>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {generatedRitual.invocation.map((line, i) => (
                      <p
                        key={i}
                        className="text-lg italic text-gold/80 text-center leading-relaxed"
                        style={{
                          fontFamily: 'var(--font-display), serif',
                          transitionDelay: `${i * 200}ms`,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-16">
                  <div className="h-px w-12 bg-gold/20" />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold/30">
                    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" fill="currentColor" />
                  </svg>
                  <div className="h-px w-12 bg-gold/20" />
                </div>

                {/* 3. Structure */}
                <div className="mb-16">
                  <h3 className="label text-gold/50 mb-8 text-center">Structure</h3>
                  <div className="space-y-8">
                    {generatedRitual.structure.map((phase, i) => (
                      <div
                        key={phase.phase}
                        className="border-l border-gold/15 pl-6 transition-all duration-700"
                        style={{ transitionDelay: `${i * 150}ms` }}
                      >
                        <div className="flex items-baseline gap-4 mb-2">
                          <span className="label text-gold/40">{String(i + 1).padStart(2, '0')}</span>
                          <h4
                            className="text-xl text-ivory"
                            style={{ fontFamily: 'var(--font-display), serif' }}
                          >
                            {phase.phase}
                          </h4>
                          <span className="label text-ivory/30 ml-auto">{phase.duration}</span>
                        </div>
                        <p className="text-sm text-ivory/60 leading-relaxed max-w-xl">
                          {phase.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-16">
                  <div className="h-px w-12 bg-gold/20" />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold/30">
                    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" fill="currentColor" />
                  </svg>
                  <div className="h-px w-12 bg-gold/20" />
                </div>

                {/* 4. Key Moments */}
                <div className="mb-16">
                  <h3 className="label text-gold/50 mb-8 text-center">Key Moments</h3>
                  <div className="space-y-10">
                    {generatedRitual.keyMoments.map((moment, i) => (
                      <div key={i} className="max-w-2xl mx-auto">
                        <div className="flex items-baseline gap-3 mb-3">
                          <span className="label text-gold/40">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <p
                          className="text-lg text-ivory/90 mb-2 pl-10"
                          style={{ fontFamily: 'var(--font-display), serif' }}
                        >
                          {moment.action}
                        </p>
                        <p className="text-sm text-ivory/50 leading-relaxed pl-10 border-l border-gold/10">
                          {moment.significance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-16">
                  <div className="h-px w-12 bg-gold/20" />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold/30">
                    <path d="M8 2L10 6L14 8L10 10L8 14L6 10L2 8L6 6Z" fill="currentColor" />
                  </svg>
                  <div className="h-px w-12 bg-gold/20" />
                </div>

                {/* 5. Closing Oath */}
                <div className="mb-16">
                  <h3 className="label text-gold/50 mb-8 text-center">Closing Oath</h3>
                  <div className="max-w-2xl mx-auto text-center">
                    <p
                      className="text-xl italic text-ivory/90 leading-relaxed"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    >
                      "{generatedRitual.closingOath}"
                    </p>
                  </div>
                </div>

                {/* Bottom border */}
                <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* 6. Narrator Note */}
                <div className="mt-10 text-center">
                  <p
                    className="text-sm italic text-gold/60 max-w-lg mx-auto leading-relaxed"
                    style={{ fontFamily: 'var(--font-display), serif' }}
                  >
                    — {generatedRitual.narratorNote}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <MythMark size={16} stroke="#D8B36A" />
                    <span className="label text-gold/40 text-[10px]">Narrator Agent</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-rule bg-void-deep mt-24">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <MythMark size={40} stroke="#F7F4EE" />
            <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>MYTH</span>
          </div>
          <p className="mt-6 max-w-md text-sm text-ivory/55" style={{ lineHeight: '1.7' }}>
            The first Culture Engine. Infrastructure for civilizations that intend to be remembered.
          </p>
          <p className="mt-8 label text-ivory/30">© 2026 MYTH Foundation</p>
        </div>
      </footer>
    </main>
  );
}
