'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { HERO, CHAPTERS, AGENTS } from '@/lib/content';

// ─── Types ───────────────────────────────────────────────────────────────────

type Era = 'Genesis' | 'Ascension' | 'Maturity' | 'Twilight';
type Genre = 'Mythic Fantasy' | 'Sci-Fi Noir' | 'Epic Saga' | 'Cosmic Horror' | 'Political Drama' | 'Pastoral Mystery';
type PredictionType = 'Next Chapter Direction' | 'Character Arc Prediction' | 'World Event Forecast' | 'Canon Conflict Warning' | 'Opportunity Identification';

interface PredictionCard {
  type: PredictionType;
  reading: string;
  confidence: number;
  action: string;
}

interface OracleResponse {
  cards: PredictionCard[];
  narrative: string;
  warnings: string[];
}

// ─── Prediction Engine ───────────────────────────────────────────────────────

const ERA_THEMES: Record<Era, { focus: string; tone: string }> = {
  Genesis: {
    focus: 'foundation, first heroes, origin myths, the spark before the flame',
    tone: 'The world is young. Everything is still possible. What is planted now will define the roots of all that follows.',
  },
  Ascension: {
    focus: 'growth, golden ages, expansion, the reach beyond the known',
    tone: 'The civilization stretches its limbs. This is the age of ambition — where foundations are tested by the weight of what is built upon them.',
  },
  Maturity: {
    focus: 'complexity, institutions, schisms, the weight of accumulated power',
    tone: 'The structures hold, but stress runs through them like veins of ore. What was built in idealism is now tested by the entropy of time.',
  },
  Twilight: {
    focus: 'legacy, decline, rebirth cycles, what endures when empires fade',
    tone: 'The long shadow falls across the civilization. But twilight is not ending — it is the threshold between what was and what will be reborn.',
  },
};

const GENRE_PATTERNS: Record<Genre, { motifs: string[]; archetypes: string[] }> = {
  'Mythic Fantasy': {
    motifs: ['prophecy foretold', 'ancient evil stirring', 'divine intervention', 'the chosen one emerging from obscurity'],
    archetypes: ['a reluctant hero', 'a corrupted sage', 'a dying god', 'a forgotten bloodline'],
  },
  'Sci-Fi Noir': {
    motifs: ['AI consciousness awakening', 'corporate conspiracy deepening', 'generational ship drifting off course', 'the signal from the void'],
    archetypes: ['a jaded investigator', 'a rogue synthetic', 'a corporate defector', 'a ghost in the network'],
  },
  'Epic Saga': {
    motifs: ['dynasty war escalating', 'empire rising in the east', 'battle of ideals fracturing alliances', 'the old king failing'],
    archetypes: ['a disinherited heir', 'a war-weary general', 'a visionary zealot', 'a diplomat with a secret'],
  },
  'Cosmic Horror': {
    motifs: ['forbidden knowledge surfacing', 'reality breach widening', 'cult emergence in the lower districts', 'the stars aligning wrong'],
    archetypes: ['a scholar who read too much', 'a cultist who saw the truth', 'a survivor of the breach', 'a watcher at the threshold'],
  },
  'Political Drama': {
    motifs: ['trade war intensifying', 'alliance fracture deepening', 'succession crisis looming', 'the neutral party forced to choose'],
    archetypes: ['an ambitious consort', 'a spymaster playing both sides', 'a reluctant heir', 'a general with loyalty questioned'],
  },
  'Pastoral Mystery': {
    motifs: ['seasonal anomaly disrupting harvest', 'forgotten ruin discovered beneath the fields', 'village secret unearthed', 'the old pact broken'],
    archetypes: ['a returning exile', 'a village elder hiding truth', 'a stranger with old knowledge', 'a child who remembers'],
  },
};

const KEYWORD_TRIGGERS: { keywords: string[]; effect: string }[] = [
  { keywords: ['war', 'conflict', 'battle', 'siege', 'army'], effect: 'Battle lines will shift. An unexpected alliance or betrayal will redraw the map of power within three chapters.' },
  { keywords: ['peace', 'alliance', 'trade', 'treaty'], effect: 'Prosperity beckons, but beneath the surface, a betrayal opportunity forms — one that will test the alliance at its most vulnerable moment.' },
  { keywords: ['magic', 'ancient', 'power', 'artifact'], effect: 'An awakening is imminent. The old power will demand a price — and someone will be willing to pay it.' },
  { keywords: ['technology', 'progress', 'innovation', 'discovery'], effect: "A discovery will reshape the civilization's understanding of itself. But every revelation carries an ethical dilemma that cannot be unresolved." },
  { keywords: ['religion', 'faith', 'worship', 'temple', 'god'], effect: 'A reformation is coming. The old certainties will fracture — and from the cracks, either heresy or divine truth will emerge.' },
];

function generatePredictions(
  worldName: string,
  era: Era,
  genre: Genre,
  canonText: string,
  selectedTypes: PredictionType[]
): OracleResponse {
  const eraTheme = ERA_THEMES[era];
  const genrePattern = GENRE_PATTERNS[genre];
  const canonLower = canonText.toLowerCase();

  // Detect keyword triggers
  const triggeredEffects: string[] = [];
  for (const trigger of KEYWORD_TRIGGERS) {
    if (trigger.keywords.some(kw => canonLower.includes(kw))) {
      triggeredEffects.push(trigger.effect);
    }
  }

  // Deterministic confidence based on input hash
  const seed = (worldName + era + genre + canonText).length;
  const confidence = () => 70 + ((seed * 7 + Math.floor(Math.random() * 13)) % 26);

  // Generate cards
  const cards: PredictionCard[] = selectedTypes.map((type, i) => {
    const motif = genrePattern.motifs[(seed + i) % genrePattern.motifs.length];
    const archetype = genrePattern.archetypes[(seed + i + 1) % genrePattern.archetypes.length];

    let reading = '';
    let action = '';

    switch (type) {
      case 'Next Chapter Direction':
        reading = `The ${motif} will define ${worldName}'s next movement. ${eraTheme.tone} The chapter ahead belongs to ${archetype} — one whose choices will ripple across the entire canon.`;
        action = `Develop ${archetype} as a central figure in the next narrative arc. Their decisions should reflect the ${era.toLowerCase()} era's core tension.`;
        break;
      case 'Character Arc Prediction':
        reading = `${archetype.charAt(0).toUpperCase() + archetype.slice(1)} stands at the threshold of transformation. The ${motif} will force a choice that reveals their true nature — not who they claim to be, but who they become under pressure.`;
        action = `Write a scene where ${archetype} faces a moral paradox tied to the ${motif}. Let the reader see the fracture before the break.`;
        break;
      case 'World Event Forecast':
        reading = `A convergence is building. The ${motif} will manifest within the next two narrative cycles, reshaping the landscape of ${worldName} in ways that cannot be undone. ${eraTheme.tone}`;
        action = `Plant three subtle foreshadowing details in the current chapter. The event should feel inevitable in retrospect but surprising in the moment.`;
        break;
      case 'Canon Conflict Warning':
        reading = `Tension exists between the established canon and the path ahead. The ${motif} introduces a contradiction with ${archetype}'s established history — one that, if unaddressed, will fracture narrative coherence.`;
        action = `Audit ${archetype}'s backstory for consistency with the ${motif}. Resolve the contradiction through revelation, not retcon.`;
        break;
      case 'Opportunity Identification':
        reading = `A gap in the narrative fabric of ${worldName} waits to be filled. The space around ${archetype} and the ${motif} contains an unwritten chapter that could become the most compelling arc of this civilization.`;
        action = `Draft a side narrative that explores this gap. It should deepen canon without contradicting it — a story that feels like it was always there, waiting.`;
        break;
    }

    return {
      type,
      reading,
      confidence: confidence(),
      action,
    };
  });

  // Generate narrative bridge
  const narrative = `In the ${era.toLowerCase()} of ${worldName}, where ${eraTheme.focus} defines the age, the threads of fate converge upon a single point. ${genrePattern.motifs[0].charAt(0).toUpperCase() + genrePattern.motifs[0].slice(1)} has set into motion a chain of events that no mortal hand can halt — only interpret, and perhaps, gently redirect.

The figure who stands at the center of this convergence is ${genrePattern.archetypes[0]}, though they do not yet know the role they are destined to play. The ${genrePattern.motifs[1]} will test them in ways that transcend the physical — it is a crisis of identity, of belief, of the very foundations upon which ${worldName} was built.

What comes next is not predetermined, but it is shaped. The patterns of the past — the choices made in the fires of creation, the alliances forged and broken, the truths spoken and concealed — all bend toward a moment of reckoning. ${eraTheme.tone} And in that moment, ${worldName} will either deepen into its own myth or fracture into something new entirely.

The Oracle sees not one path, but the weight of all possible paths pressing upon the present. The canon holds. But it breathes. And what it breathes in now is the story yet to be told.`;

  // Generate warnings
  const warnings: string[] = [];
  if (triggeredEffects.length > 0) {
    warnings.push(triggeredEffects[0]);
  }
  if (canonLower.includes('prophecy') && canonLower.includes('choice')) {
    warnings.push("Prophecy and free will are both present in your canon. Ensure the prophecy's fulfillment involves active choice, not passive fulfillment — this preserves narrative agency.");
  }
  if (selectedTypes.includes('Canon Conflict Warning') && triggeredEffects.length < 2) {
    warnings.push('No major canon contradictions detected. The narrative trajectory remains coherent with established lore.');
  }

  return { cards, narrative, warnings };
}

// ─── Particles Component ─────────────────────────────────────────────────────

function OracleParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 5 + 3) % 100}%`,
      top: `${(i * 7 + 11) % 100}%`,
      size: 2 + (i % 3),
      delay: `${(i * 0.4) % 4}s`,
      duration: `${3 + (i % 4)}s`,
      opacity: 0.15 + (i % 5) * 0.08,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `heroFloat ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function OraclePage() {
  // Form state
  const [worldName, setWorldName] = useState('');
  const [era, setEra] = useState<Era>('Genesis');
  const [genre, setGenre] = useState<Genre>('Mythic Fantasy');
  const [canonText, setCanonText] = useState('');
  const [recentEvents, setRecentEvents] = useState<string[]>(['']);
  const [selectedTypes, setSelectedTypes] = useState<PredictionType[]>([
    'Next Chapter Direction',
    'World Event Forecast',
  ]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<OracleResponse | null>(null);
  const [formError, setFormError] = useState('');

  const predictionTypes: PredictionType[] = [
    'Next Chapter Direction',
    'Character Arc Prediction',
    'World Event Forecast',
    'Canon Conflict Warning',
    'Opportunity Identification',
  ];

  const toggleType = (type: PredictionType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const addEvent = () => {
    if (recentEvents.length < 10) {
      setRecentEvents([...recentEvents, '']);
    }
  };

  const removeEvent = (index: number) => {
    if (recentEvents.length > 1) {
      setRecentEvents(recentEvents.filter((_, i) => i !== index));
    }
  };

  const updateEvent = (index: number, value: string) => {
    const updated = [...recentEvents];
    updated[index] = value;
    setRecentEvents(updated);
  };

  const handleSubmit = () => {
    // Validation
    if (!worldName.trim()) {
      setFormError('The Oracle requires a world name');
      return;
    }
    if (canonText.trim().length < 50) {
      setFormError('The Oracle requires at least 50 characters of canon text');
      return;
    }
    if (selectedTypes.length === 0) {
      setFormError('Select at least one type of reading');
      return;
    }

    setFormError('');
    setIsLoading(true);

    // Simulate Oracle processing
    setTimeout(() => {
      const fullCanon = canonText + '\n\nRecent Events:\n' + recentEvents.filter(e => e.trim()).map(e => `• ${e}`).join('\n');
      const result = generatePredictions(worldName, era, genre, fullCanon, selectedTypes);
      setResponse(result);
      setIsLoading(false);
    }, 2000);
  };

  const resetOracle = () => {
    setResponse(null);
    setWorldName('');
    setEra('Genesis');
    setGenre('Mythic Fantasy');
    setCanonText('');
    setRecentEvents(['']);
    setSelectedTypes(['Next Chapter Direction', 'World Event Forecast']);
    setFormError('');
  };

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] items-center justify-center pt-32">
        <OracleParticles />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(216,179,106,0.08)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <Reveal>
            <span className="label text-gold">Oracle Agent</span>
            <h1 className="headline-hero mt-6 text-ivory hero-fade-up">
              The Oracle Reads<br />What You Cannot See
            </h1>
            <p
              className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/85 md:text-2xl hero-fade-up hero-delay-2"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Describe your civilization&apos;s current state. The Oracle reads its patterns — and reveals the natural next chapters that stay true to your canon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Oracle Interface ─────────────────────────────────────────── */}
      {!response && !isLoading && (
        <section className="section-md mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <div className="border border-rule bg-void-deep p-8 md:p-12">
              {/* Step 1: Civilization Identity */}
              <div className="mb-12">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="label text-gold">Step 01</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="label text-ivory/40">Identity</span>
                </div>
                <h3 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                  Civilization Identity
                </h3>
                <p className="mt-2 text-sm text-ivory/55">
                  Define the world the Oracle will read
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <label className="label text-gold/70">World Name</label>
                    <input
                      type="text"
                      value={worldName}
                      onChange={(e) => setWorldName(e.target.value)}
                      placeholder="e.g. Aethermoor, The Last Dominion, Veil of Ash"
                      className="mt-3 w-full border border-rule bg-void px-5 py-4 font-display text-lg text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="label text-gold/70">Current Era</label>
                      <select
                        value={era}
                        onChange={(e) => setEra(e.target.value as Era)}
                        className="mt-3 w-full border border-rule bg-void px-5 py-4 text-ivory focus:border-gold focus:outline-none"
                      >
                        <option value="Genesis">Genesis</option>
                        <option value="Ascension">Ascension</option>
                        <option value="Maturity">Maturity</option>
                        <option value="Twilight">Twilight</option>
                      </select>
                    </div>
                    <div>
                      <label className="label text-gold/70">Genre</label>
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value as Genre)}
                        className="mt-3 w-full border border-rule bg-void px-5 py-4 text-ivory focus:border-gold focus:outline-none"
                      >
                        <option value="Mythic Fantasy">Mythic Fantasy</option>
                        <option value="Sci-Fi Noir">Sci-Fi Noir</option>
                        <option value="Epic Saga">Epic Saga</option>
                        <option value="Cosmic Horror">Cosmic Horror</option>
                        <option value="Political Drama">Political Drama</option>
                        <option value="Pastoral Mystery">Pastoral Mystery</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-12 h-px w-full bg-rule" />

              {/* Step 2: Current Canon State */}
              <div className="mb-12">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="label text-gold">Step 02</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="label text-ivory/40">Canon</span>
                </div>
                <h3 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                  Current Canon State
                </h3>
                <p className="mt-2 text-sm text-ivory/55">
                  The Oracle reads what has been written. The more detail, the clearer the vision.
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <label className="label text-gold/70">Canon Text</label>
                    <textarea
                      value={canonText}
                      onChange={(e) => setCanonText(e.target.value)}
                      placeholder="Describe the current state of your civilization — its major events, conflicts, values, what chapter it is in now."
                      rows={6}
                      className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                      style={{ lineHeight: '1.75' }}
                    />
                    <div className="mt-2 flex justify-between">
                      <span className="text-xs text-ivory/40">
                        {canonText.length < 50 ? `${canonText.length}/50 minimum` : 'Sufficient canon provided'}
                      </span>
                      <span className="text-xs text-ivory/40">{canonText.length} characters</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label className="label text-gold/70">Recent Events</label>
                      <button
                        onClick={addEvent}
                        className="label text-gold/60 transition-colors hover:text-gold"
                      >
                        + Add Event
                      </button>
                    </div>
                    <div className="mt-3 space-y-3">
                      {recentEvents.map((event, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={event}
                            onChange={(e) => updateEvent(i, e.target.value)}
                            placeholder={`Event ${i + 1}...`}
                            className="flex-1 border border-rule bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                          />
                          {recentEvents.length > 1 && (
                            <button
                              onClick={() => removeEvent(i)}
                              className="flex h-8 w-8 items-center justify-center text-ivory/40 transition-colors hover:text-ember"
                              aria-label="Remove event"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 3L11 11M11 3L3 11" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-12 h-px w-full bg-rule" />

              {/* Step 3: Ask the Oracle */}
              <div className="mb-10">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="label text-gold">Step 03</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="label text-ivory/40">Invocation</span>
                </div>
                <h3 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                  Ask the Oracle
                </h3>
                <p className="mt-2 text-sm text-ivory/55">
                  Select the readings you seek. The Oracle will speak to each.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {predictionTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex cursor-pointer items-center gap-3 border p-4 transition-all duration-500 ${
                        selectedTypes.includes(type)
                          ? 'border-gold/60 bg-gold/5'
                          : 'border-rule hover:border-gold/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-300 ${
                          selectedTypes.includes(type)
                            ? 'border-gold bg-gold/20'
                            : 'border-ivory/30'
                        }`}
                      >
                        {selectedTypes.includes(type) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D8B36A" strokeWidth="2">
                            <path d="M2 6L5 9L10 3" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-ivory/80">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error */}
              {formError && (
                <div className="mb-6 border border-ember/40 bg-ember/5 p-4 text-center">
                  <p className="text-sm text-ember">{formError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="label w-full border border-gold py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
              >
                Consult The Oracle
              </button>
            </div>
          </Reveal>
        </section>
      )}

      {/* ─── Loading State ────────────────────────────────────────────── */}
      {isLoading && (
        <section className="section-lg text-center">
          <div className="mx-auto max-w-md px-6">
            <div className="hero-pulse-glow mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full border border-gold/40">
              <MythMark size={40} stroke="#D8B36A" />
            </div>
            <h3 className="font-display text-2xl text-ivory hero-fade-in" style={{ fontFamily: 'var(--font-display), serif' }}>
              The Oracle is reading...
            </h3>
            <p className="mt-4 text-sm text-ivory/55">
              Tracing the threads of {worldName || 'your world'}. Patterns emerge from the canon.
            </p>
            <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-rule">
              <div
                className="h-full rounded-full bg-gold"
                style={{
                  animation: 'loadingBar 2s ease-in-out forwards',
                }}
              />
            </div>
          </div>
          <style jsx>{`
            @keyframes loadingBar {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
          `}</style>
        </section>
      )}

      {/* ─── Oracle Response ──────────────────────────────────────────── */}
      {response && !isLoading && (
        <section className="section-md mx-auto max-w-[1000px] px-6 md:px-10">
          {/* Oracle Reading Header */}
          <Reveal>
            <div className="mb-12 text-center">
              <MythMark size={48} stroke="#D8B36A" className="mx-auto mb-6" />
              <h2 className="headline-section text-ivory hero-fade-up">
                The Oracle has spoken...
              </h2>
              <p
                className="mx-auto mt-6 max-w-xl font-display text-lg italic text-gold/80 hero-fade-up hero-delay-1"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                For {worldName} — in the {era} era, woven through {genre}
              </p>
            </div>
          </Reveal>

          {/* Prediction Cards */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {response.cards.map((card, i) => (
              <Reveal key={card.type} delay={0.1 * (i + 1)}>
                <article className="border-rule bg-void-deep h-full border p-6 transition-all duration-700 hover:border-gold/30 glow-hover">
                  <div className="mb-4 flex items-baseline justify-between">
                    <h4 className="font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                      {card.type}
                    </h4>
                    <span className="label text-gold/60">{card.confidence}%</span>
                  </div>

                  <p className="mb-6 font-display text-sm italic leading-relaxed text-gold" style={{ fontFamily: 'var(--font-display), serif' }}>
                    {card.reading}
                  </p>

                  {/* Confidence Bar */}
                  <div className="mb-4 h-1 w-full rounded-full bg-rule">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-1000"
                      style={{ width: `${card.confidence}%` }}
                    />
                  </div>

                  <div className="border-t border-rule pt-4">
                    <span className="label text-ivory/40">Suggested Action</span>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                      {card.action}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Narrative Bridge */}
          <Reveal>
            <div className="mb-16 border-l-2 border-gold/40 pl-8">
              <span className="label text-gold/60">Full Narrative</span>
              <div
                className="mt-4 font-display text-lg leading-relaxed text-ivory/85"
                style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.85' }}
              >
                {response.narrative.split('\n\n').map((paragraph, i) => (
                  <p key={i} className={i > 0 ? 'mt-5' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Warning Box */}
          {response.warnings.length > 0 && (
            <Reveal>
              <div className="border border-ember/40 bg-ember/5 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FF4D00" strokeWidth="1.5">
                    <path d="M10 2L18 16H2L10 2Z" />
                    <line x1="10" y1="8" x2="10" y2="12" />
                    <circle cx="10" cy="14" r="0.5" fill="#FF4D00" />
                  </svg>
                  <span className="label text-ember">Canon Consistency Check</span>
                </div>
                <div className="space-y-3">
                  {response.warnings.map((warning, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ivory/70">
                      {warning}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Reset */}
          <Reveal>
            <div className="mt-12 text-center">
              <button
                onClick={resetOracle}
                className="label border border-gold/40 px-10 py-4 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10"
              >
                Consult Again
              </button>
            </div>
          </Reveal>
        </section>
      )}

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-rule bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <MythMark size={40} stroke="#F7F4EE" />
            <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>MYTH</span>
          </div>
          <p className="mt-6 max-w-md text-sm text-ivory/55" style={{ lineHeight: '1.7' }}>
            The first Culture Engine. Infrastructure for civilizations that intend to be remembered.
          </p>
          <p className="mt-8 label text-ivory/30">&copy; 2026 MYTH Foundation</p>
        </div>
      </footer>
    </main>
  );
}
