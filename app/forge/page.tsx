'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Reveal } from '@/components/Reveal';
import { SectionDivider } from '@/components/SectionDivider';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { AGENTS } from '@/lib/content';

// Constants
const GENRES = [
  'Mythic Fantasy',
  'Sci-Fi Noir',
  'Epic Saga',
  'Cosmic Horror',
  'Political Drama',
  'Pastoral Mystery',
] as const;

type Genre = (typeof GENRES)[number];

const CORE_VALUES = [
  'Honor',
  'Knowledge',
  'Power',
  'Harmony',
  'Chaos',
  'Faith',
  'Freedom',
  'Tradition',
  'Innovation',
  'Survival',
] as const;

const EXISTING_CIVILIZATIONS = [
  'Aetheria',
  'Chronos Veil',
  'The Amber Highlands',
  'Void Meridian',
  'Ember Accord',
  'Silent Bloom',
];

const GENRE_KEYWORDS: Record<Genre, string[]> = {
  'Mythic Fantasy': ['ancient', 'magic', 'prophecy', 'gods', 'divine', 'sacred', 'curse', 'blessing'],
  'Sci-Fi Noir': ['technology', 'AI', 'space', 'digital', 'quantum', 'starship', 'corporate', 'neon'],
  'Epic Saga': ['war', 'empire', 'dynasty', 'conquest', 'kingdom', 'throne', 'battle', 'hero'],
  'Cosmic Horror': ['void', 'unknown', 'forbidden', 'breach', 'entity', 'madness', 'cosmic', 'beyond'],
  'Political Drama': ['alliance', 'treaty', 'power', 'senate', 'council', 'revolution', 'faction'],
  'Pastoral Mystery': ['nature', 'season', 'harvest', 'village', 'land', 'growth', 'cycle', 'secret'],
};

const GENRE_AGENTS: Record<Genre, string[]> = {
  'Mythic Fantasy': ['Oracle', 'Lorekeeper'],
  'Sci-Fi Noir': ['Historian', 'Archivist'],
  'Epic Saga': ['Worldbuilder', 'Narrator'],
  'Cosmic Horror': ['Oracle', 'Lorekeeper'],
  'Political Drama': ['Diplomat', 'Narrator'],
  'Pastoral Mystery': ['Worldbuilder', 'Narrator'],
};

interface FormData {
  worldName: string;
  genre: Genre | '';
  foundingMyth: string;
  coreValues: string[];
  firstMajorEvent: string;
  keyFigure: string;
  artifact: string;
  geographicFeature: string;
}

const INITIAL_FORM: FormData = {
  worldName: '',
  genre: '',
  foundingMyth: '',
  coreValues: [],
  firstMajorEvent: '',
  keyFigure: '',
  artifact: '',
  geographicFeature: '',
};

function checkNameConflict(name: string): boolean {
  return EXISTING_CIVILIZATIONS.some(
    (civ) => civ.toLowerCase() === name.trim().toLowerCase()
  );
}

function checkGenreAlignment(myth: string, genre: Genre): { aligned: boolean; matches: number; total: number } {
  const keywords = GENRE_KEYWORDS[genre];
  const mythLower = myth.toLowerCase();
  const matches = keywords.filter((kw) => mythLower.includes(kw)).length;
  return { aligned: matches >= 2, matches, total: keywords.length };
}

function checkEventCoherence(myth: string, event: string): { coherent: boolean; reason: string } {
  if (!myth.trim() || !event.trim()) return { coherent: false, reason: 'Both founding myth and first event are required.' };

  const mythWords = myth.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
  const eventWords = event.toLowerCase().split(/\s+/).filter((w) => w.length > 4);

  const sharedWords = mythWords.filter((w) => eventWords.includes(w));
  const hasSharedThemes = sharedWords.length >= 1;

  if (hasSharedThemes) {
    return { coherent: true, reason: 'The event shares thematic roots with the founding myth.' };
  }
  return {
    coherent: false,
    reason: 'The first event should logically follow from the founding myth. Consider connecting key themes.',
  };
}

function calculateConsistencyScore(form: FormData): number {
  let score = 0;
  const checks = [
    form.worldName.trim().length > 0,
    form.genre !== '',
    form.foundingMyth.trim().length > 20,
    form.coreValues.length >= 3,
    form.firstMajorEvent.trim().length > 0,
    form.keyFigure.trim().length > 0,
    form.artifact.trim().length > 0,
    form.geographicFeature.trim().length > 0,
  ];
  checks.forEach((c) => { if (c) score += 12.5; });

  // Bonus for genre alignment
  if (form.genre && form.foundingMyth) {
    const alignment = checkGenreAlignment(form.foundingMyth, form.genre);
    if (alignment.aligned) score = Math.min(100, score + 5);
    else if (alignment.matches >= 1) score = Math.min(100, score + 2);
  }

  return Math.round(score);
}

export default function ForgePage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [step, setStep] = useState(1);
  const [showConflict, setShowConflict] = useState(false);
  const [forged, setForged] = useState(false);

  const consistencyScore = useMemo(() => calculateConsistencyScore(form), [form]);

  const nameConflict = useMemo(
    () => form.worldName.trim().length > 0 && checkNameConflict(form.worldName),
    [form.worldName]
  );

  const genreAlignment = useMemo(
    () => (form.genre && form.foundingMyth ? checkGenreAlignment(form.foundingMyth, form.genre as Genre) : null),
    [form.foundingMyth, form.genre]
  );

  const eventCoherence = useMemo(
    () => (form.foundingMyth && form.firstMajorEvent ? checkEventCoherence(form.foundingMyth, form.firstMajorEvent) : null),
    [form.foundingMyth, form.firstMajorEvent]
  );

  const assignedAgents = useMemo(
    () => (form.genre ? GENRE_AGENTS[form.genre as Genre] || [] : []),
    [form.genre]
  );

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleValue = (value: string) => {
    setForm((prev) => {
      const current = prev.coreValues;
      if (current.includes(value)) {
        return { ...prev, coreValues: current.filter((v) => v !== value) };
      }
      if (current.length >= 5) return prev;
      return { ...prev, coreValues: [...current, value] };
    });
  };

  const canProceedStep1 = form.worldName.trim() && form.genre && form.foundingMyth.trim().length > 10 && form.coreValues.length >= 3;
  const canProceedStep2 = form.firstMajorEvent.trim() && form.keyFigure.trim() && form.artifact.trim() && form.geographicFeature.trim();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleForge = () => {
    setForged(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setStep(1);
    setForged(false);
  };

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-md pt-40 text-center">
        <Reveal>
          <span className="label text-gold">Canon Forge</span>
          <h1 className="headline-hero mt-6 text-ivory">Build Worlds That Outlive You</h1>
          <p
            className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/70"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Create civilizations. Author canon. The forge transforms your vision into persistent digital heritage.
          </p>
        </Reveal>
      </section>

      {/* Step Indicator */}
      <section className="mx-auto max-w-[800px] px-6 md:px-10">
        <Reveal>
          <div className="mb-12 flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center border text-sm transition-all duration-700 ${
                    s === step
                      ? 'border-gold bg-gold/20 text-gold'
                      : s < step
                      ? 'border-gold/50 bg-gold/10 text-gold/70'
                      : 'border-rule text-ivory/30'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 4 && (
                  <div
                    className={`mx-2 h-px flex-1 transition-all duration-700 ${
                      s < step ? 'bg-gold/50' : 'bg-rule'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mb-8 flex justify-between text-center">
            {['World Foundation', 'Canon Architecture', 'Lore Consistency', 'Forge Summary'].map((label, i) => (
              <span
                key={label}
                className={`label flex-1 ${i + 1 === step ? 'text-gold' : 'text-ivory/40'}`}
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Form Steps */}
      <section className="mx-auto max-w-[900px] px-6 md:px-10">
        {/* Step 1: World Foundation */}
        {step === 1 && (
          <Reveal>
            <div className="border border-rule bg-void-deep p-8 md:p-12">
              <div className="mb-10">
                <label className="label text-gold">World Name</label>
                <input
                  type="text"
                  value={form.worldName}
                  onChange={(e) => {
                    updateField('worldName', e.target.value);
                    setShowConflict(false);
                  }}
                  placeholder="Name your world..."
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 font-display text-xl text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                />
                {nameConflict && (
                  <p className="mt-2 text-sm text-red-400">
                    Name Conflict: &ldquo;{form.worldName}&rdquo; already exists within the established canon. Choose a different name.
                  </p>
                )}
              </div>

              <div className="mb-10">
                <label className="label text-gold">Genre</label>
                <select
                  value={form.genre}
                  onChange={(e) => updateField('genre', e.target.value as Genre)}
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory focus:border-gold focus:outline-none"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                >
                  <option value="">Select a genre...</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="mb-10">
                <label className="label text-gold">Founding Myth</label>
                <textarea
                  value={form.foundingMyth}
                  onChange={(e) => updateField('foundingMyth', e.target.value)}
                  placeholder="How did this world begin? The first story told about this place..."
                  rows={5}
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  style={{ lineHeight: '1.75' }}
                />
                {genreAlignment && form.genre && (
                  <p className={`mt-2 text-sm ${genreAlignment.aligned ? 'text-emerald-400/80' : 'text-amber-400/80'}`}>
                    {genreAlignment.aligned
                      ? `Genre aligned — ${genreAlignment.matches} of ${genreAlignment.total} thematic markers found.`
                      : `Genre misalignment — the founding myth does not match the expected themes of ${form.genre}.`}
                  </p>
                )}
              </div>

              <div className="mb-10">
                <label className="label text-gold">
                  Core Values <span className="text-ivory/40">(select 3–5)</span>
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CORE_VALUES.map((value) => {
                    const selected = form.coreValues.includes(value);
                    return (
                      <button
                        key={value}
                        onClick={() => toggleValue(value)}
                        disabled={!selected && form.coreValues.length >= 5}
                        className={`border px-4 py-2 text-sm transition-all duration-500 ${
                          selected
                            ? 'border-gold bg-gold/10 text-gold'
                            : form.coreValues.length >= 5
                            ? 'border-rule text-ivory/20 cursor-not-allowed'
                            : 'border-rule text-ivory/60 hover:border-gold/50 hover:text-gold/70'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-sm text-ivory/40">
                  {form.coreValues.length}/5 selected {form.coreValues.length < 3 && '— minimum 3 required'}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep1 || nameConflict}
                  className={`label px-10 py-4 transition-all duration-700 ${
                    canProceedStep1 && !nameConflict
                      ? 'border border-gold text-gold hover:bg-gold hover:text-void'
                      : 'border border-rule text-ivory/30 cursor-not-allowed'
                  }`}
                >
                  Continue to Canon Architecture →
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 2: Canon Architecture */}
        {step === 2 && (
          <Reveal>
            <div className="border border-rule bg-void-deep p-8 md:p-12">
              <div className="mb-10">
                <label className="label text-gold">First Major Event</label>
                <input
                  type="text"
                  value={form.firstMajorEvent}
                  onChange={(e) => updateField('firstMajorEvent', e.target.value)}
                  placeholder="What is the first significant event in this world's timeline?"
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                />
              </div>

              <div className="mb-10">
                <label className="label text-gold">Key Figure</label>
                <input
                  type="text"
                  value={form.keyFigure}
                  onChange={(e) => updateField('keyFigure', e.target.value)}
                  placeholder="Who is the first hero, founder, or antagonist?"
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                />
              </div>

              <div className="mb-10">
                <label className="label text-gold">Artifact</label>
                <input
                  type="text"
                  value={form.artifact}
                  onChange={(e) => updateField('artifact', e.target.value)}
                  placeholder="What is the first significant object of power or meaning?"
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                />
              </div>

              <div className="mb-10">
                <label className="label text-gold">Geographic Feature</label>
                <input
                  type="text"
                  value={form.geographicFeature}
                  onChange={(e) => updateField('geographicFeature', e.target.value)}
                  placeholder="What is the defining landscape of this world?"
                  className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="label border border-rule px-8 py-4 text-ivory/60 transition-all duration-700 hover:border-gold/50 hover:text-gold"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep2}
                  className={`label px-10 py-4 transition-all duration-700 ${
                    canProceedStep2
                      ? 'border border-gold text-gold hover:bg-gold hover:text-void'
                      : 'border border-rule text-ivory/30 cursor-not-allowed'
                  }`}
                >
                  Run Consistency Check →
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 3: Lore Consistency Check */}
        {step === 3 && (
          <Reveal>
            <div className="border border-rule bg-void-deep p-8 md:p-12">
              <div className="mb-10">
                <h3 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                  Lore Consistency Report
                </h3>
                <p className="mt-2 text-sm text-ivory/50">
                  The forge has analyzed your canon entry against established patterns.
                </p>
              </div>

              <div className="space-y-6">
                {/* Name Check */}
                <div className={`border p-5 ${nameConflict ? 'border-red-400/50 bg-red-400/5' : 'border-emerald-400/30 bg-emerald-400/5'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${nameConflict ? 'text-red-400' : 'text-emerald-400'}`}>
                      {nameConflict ? '✗' : '✓'}
                    </span>
                    <span className="label text-ivory">Name Uniqueness</span>
                  </div>
                  <p className="mt-2 text-sm text-ivory/60">
                    {nameConflict
                      ? `Conflict detected: "${form.worldName}" matches an existing civilization.`
                      : `"${form.worldName}" is available within the canon registry.`}
                  </p>
                </div>

                {/* Genre Alignment */}
                <div className={`border p-5 ${
                  genreAlignment?.aligned
                    ? 'border-emerald-400/30 bg-emerald-400/5'
                    : 'border-amber-400/30 bg-amber-400/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${genreAlignment?.aligned ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {genreAlignment?.aligned ? '✓' : '⚠'}
                    </span>
                    <span className="label text-ivory">Genre Alignment</span>
                  </div>
                  <p className="mt-2 text-sm text-ivory/60">
                    {genreAlignment
                      ? genreAlignment.aligned
                        ? `Founding myth aligns with ${form.genre} conventions.`
                        : `Founding myth shows weak alignment with ${form.genre}. Consider incorporating thematic keywords.`
                      : 'No genre selected.'}
                  </p>
                </div>

                {/* Event-Myth Coherence */}
                <div className={`border p-5 ${
                  eventCoherence?.coherent
                    ? 'border-emerald-400/30 bg-emerald-400/5'
                    : 'border-amber-400/30 bg-amber-400/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${eventCoherence?.coherent ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {eventCoherence?.coherent ? '✓' : '⚠'}
                    </span>
                    <span className="label text-ivory">Event-Myth Coherence</span>
                  </div>
                  <p className="mt-2 text-sm text-ivory/60">
                    {eventCoherence?.reason || 'Insufficient data for coherence analysis.'}
                  </p>
                </div>

                {/* Agent Assignment */}
                <div className="border border-gold/30 bg-gold/5 p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-gold">⟡</span>
                    <span className="label text-ivory">Assigned Agents</span>
                  </div>
                  <p className="mt-2 text-sm text-ivory/60">
                    Based on the {form.genre} genre, the following agents will tend this world:
                  </p>
                  <div className="mt-4 flex gap-4">
                    {assignedAgents.map((agentName) => {
                      const agent = AGENTS.find((a) => a.name === agentName);
                      return (
                        <div key={agentName} className="flex items-center gap-2">
                          <AgentGlyph name={agentName} size={28} stroke="#D8B36A" />
                          <div>
                            <span className="label text-gold">{agentName}</span>
                            {agent && <p className="text-xs text-ivory/40">{agent.role}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  onClick={handleBack}
                  className="label border border-rule px-8 py-4 text-ivory/60 transition-all duration-700 hover:border-gold/50 hover:text-gold"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  className="label border border-gold px-10 py-4 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
                >
                  View Forge Summary →
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 4: Forge Summary */}
        {step === 4 && !forged && (
          <Reveal>
            <div className="border border-rule bg-void-deep p-8 md:p-12">
              <div className="mb-10 text-center">
                <span className="label text-gold">Canon Preview</span>
                <h3
                  className="mt-4 font-display text-3xl text-ivory"
                  style={{ fontFamily: 'var(--font-display), serif' }}
                >
                  {form.worldName}
                </h3>
                <span className="label mt-2 inline-block text-ivory/50">{form.genre}</span>
              </div>

              {/* Founding Myth Quote */}
              <div className="mb-8 border-l-2 border-gold/50 pl-6">
                <p
                  className="font-display text-lg italic text-ivory/80"
                  style={{ fontFamily: 'var(--font-display), serif', lineHeight: '1.8' }}
                >
                  &ldquo;{form.foundingMyth}&rdquo;
                </p>
              </div>

              {/* Core Values */}
              <div className="mb-8">
                <span className="label text-gold/70">Core Values</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.coreValues.map((v) => (
                    <span key={v} className="border border-gold/30 px-3 py-1 text-sm text-gold/80">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline Entry */}
              <div className="mb-8 border border-rule p-5">
                <span className="label text-gold/70">Timeline Entry</span>
                <p className="mt-2 text-sm text-ivory/70" style={{ lineHeight: '1.7' }}>
                  <span className="text-gold">⟡</span> {form.firstMajorEvent}
                </p>
              </div>

              {/* Key Figure + Artifact */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="border border-rule p-5">
                  <span className="label text-gold/70">Key Figure</span>
                  <p className="mt-2 text-base text-ivory/80">{form.keyFigure}</p>
                </div>
                <div className="border border-rule p-5">
                  <span className="label text-gold/70">Artifact</span>
                  <p className="mt-2 text-base text-ivory/80">{form.artifact}</p>
                </div>
              </div>

              {/* Geographic Feature */}
              <div className="mb-8 border border-rule p-5">
                <span className="label text-gold/70">Defining Landscape</span>
                <p className="mt-2 text-base text-ivory/80">{form.geographicFeature}</p>
              </div>

              {/* Assigned Agents */}
              <div className="mb-8">
                <span className="label text-gold/70">Assigned Agents</span>
                <div className="mt-3 flex gap-6">
                  {assignedAgents.map((agentName) => {
                    const agent = AGENTS.find((a) => a.name === agentName);
                    return (
                      <div key={agentName} className="flex items-center gap-3">
                        <AgentGlyph name={agentName} size={32} stroke="#D8B36A" />
                        <div>
                          <span className="label text-gold">{agentName}</span>
                          {agent && <p className="text-xs text-ivory/50">{agent.desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consistency Score */}
              <div className="mb-10 border border-rule p-6 text-center">
                <span className="label text-gold/70">Canon Consistency Score</span>
                <div className="mt-4 flex items-center justify-center">
                  <div
                    className="relative flex h-28 w-28 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: consistencyScore >= 80 ? '#D8B36A' : consistencyScore >= 50 ? '#D8B36A80' : '#D8B36A40',
                    }}
                  >
                    <span
                      className="font-display text-3xl"
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        color: consistencyScore >= 80 ? '#D8B36A' : consistencyScore >= 50 ? '#D8B36A' : '#D8B36A80',
                      }}
                    >
                      {consistencyScore}%
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ivory/50">
                  {consistencyScore >= 80
                    ? 'This canon entry is ready for forging.'
                    : 'Consider completing more fields for a stronger canon entry.'}
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="label border border-rule px-8 py-4 text-ivory/60 transition-all duration-700 hover:border-gold/50 hover:text-gold"
                >
                  ← Back
                </button>
                <button
                  onClick={handleForge}
                  className="label border border-gold px-12 py-4 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
                >
                  ⟡ Forge This World
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Forged Success State */}
        {step === 4 && forged && (
          <Reveal>
            <div className="border border-gold/40 bg-void-deep p-12 text-center">
              <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-6" />
              <h3
                className="font-display text-3xl text-gold"
                style={{ fontFamily: 'var(--font-display), serif' }}
              >
                {form.worldName} Has Been Forged
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-base text-ivory/60" style={{ lineHeight: '1.75' }}>
                Your canon entry has been committed to the forge. The assigned agents — {assignedAgents.join(' & ')} — 
                are now tending to the persistence of {form.worldName}. This world will endure.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="label border border-gold px-10 py-4 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
                >
                  Forge Another World
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-void-deep">
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
