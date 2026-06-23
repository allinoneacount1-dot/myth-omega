'use client';

import { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { CANON_TYPES } from '@/lib/canon';
import { CIVILIZATION_PROFILES } from '@/lib/civilizations';

interface CanonEntry {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  connections: string[];
  contradictions: string[];
}

export default function CanonBuilderPage() {
  const [selectedCiv, setSelectedCiv] = useState('aetheria');
  const [selectedType, setSelectedType] = useState('lore');
  const [prompt, setPrompt] = useState('');
  const [generatedEntry, setGeneratedEntry] = useState<CanonEntry | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [action, setAction] = useState<'generate' | 'validate' | 'suggest'>('generate');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const civ = CIVILIZATION_PROFILES[selectedCiv];

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Describe what you want to create');
      return;
    }
    setIsGenerating(true);
    setError('');
    setGeneratedEntry(null);

    try {
      const res = await fetch('/api/canon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          data: {
            civilization: selectedCiv,
            type: selectedType,
            prompt: prompt.trim(),
          },
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      if (action === 'suggest') {
        setSuggestions(data.content.split('\n').filter((l: string) => l.trim()));
      } else {
        setGeneratedEntry({
          id: `canon-${Date.now()}`,
          title: '',
          content: data.content,
          type: selectedType,
          tags: [],
          connections: [],
          contradictions: [],
        });
      }
    } catch {
      setError('The Canon Builder encountered a disturbance. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, selectedCiv, selectedType, action]);

  return (
    <main className="bg-void text-ivory min-h-screen">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-sm pt-16 text-center">
        <Reveal>
          <span className="label text-gold">Lore Creation Tool</span>
          <h1 className="headline-hero mt-6 text-ivory">Canon Builder</h1>
          <p className="mx-auto mt-6 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl" style={{ fontFamily: 'var(--font-display), serif' }}>
            Create, expand, and validate civilization lore with AI assistance. Build worlds that outlive you.
          </p>
        </Reveal>
      </section>

      <SectionDivider variant="glyph" />

      {/* Builder Interface */}
      <section className="section-md mx-auto max-w-[900px] px-6 md:px-10">
        <Reveal>
          <div className="border border-rule bg-void-deep p-8 md:p-12">
            {/* Civilization Selector */}
            <div className="mb-8">
              <label className="label text-gold/70">Civilization</label>
              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                {Object.values(CIVILIZATION_PROFILES).map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setSelectedCiv(c.slug)}
                    className={`border p-3 text-left transition-all duration-300 ${
                      selectedCiv === c.slug ? 'border-gold/50 bg-gold/5' : 'border-rule hover:border-gold/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-sm text-ivory/90">{c.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Civ Context */}
            {civ && (
              <div className="mb-8 border border-rule bg-void p-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: civ.color }} />
                  <span className="label" style={{ color: civ.color }}>{civ.genre}</span>
                  <span className="label text-ivory/30">•</span>
                  <span className="text-sm text-ivory/60">{civ.tagline}</span>
                </div>
              </div>
            )}

            {/* Action Tabs */}
            <div className="mb-8 flex gap-2">
              {(['generate', 'suggest', 'validate'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAction(a)}
                  className={`label px-4 py-2 border transition-all duration-300 ${
                    action === a ? 'border-gold/50 bg-gold/5 text-gold' : 'border-rule text-ivory/40 hover:text-ivory/70'
                  }`}
                >
                  {a === 'generate' ? '✨ Generate' : a === 'suggest' ? '💡 Suggest' : '🔍 Validate'}
                </button>
              ))}
            </div>

            {/* Type Selector */}
            {action !== 'validate' && (
              <div className="mb-8">
                <label className="label text-gold/70">Entry Type</label>
                <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                  {CANON_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setSelectedType(t.value)}
                      className={`flex items-center gap-2 border p-3 text-left transition-all duration-300 ${
                        selectedType === t.value ? 'border-gold/50 bg-gold/5' : 'border-rule hover:border-gold/30'
                      }`}
                    >
                      <span>{t.icon}</span>
                      <span className="text-sm text-ivory/90">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt */}
            <div className="mb-8">
              <label className="label text-gold/70">
                {action === 'generate' ? 'Describe what you want to create' : action === 'suggest' ? 'How many ideas?' : 'Paste canon entry to validate'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  action === 'generate'
                    ? 'e.g. A legendary sword forged in the heart of a dying star, wielded by the first Highlander...'
                    : action === 'suggest'
                    ? '3'
                    : 'Paste your canon entry here for validation...'
                }
                rows={action === 'suggest' ? 1 : 5}
                className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                style={{ lineHeight: '1.75' }}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="label w-full border border-gold px-8 py-4 text-gold transition-all duration-500 hover:bg-gold hover:text-void disabled:opacity-30"
            >
              {isGenerating ? 'The Builder is crafting...' : action === 'generate' ? 'Generate Canon Entry' : action === 'suggest' ? 'Get Suggestions' : 'Validate Entry'}
            </button>

            {error && <p className="mt-4 text-sm text-ember">{error}</p>}
          </div>
        </Reveal>

        {/* Generated Output */}
        {generatedEntry && (
          <Reveal>
            <div className="mt-8 border border-rule bg-void-deep p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="label text-gold">Generated Entry</span>
                <span className="label border border-rule px-2 py-0.5 text-ivory/40">{generatedEntry.type}</span>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-ivory/85 whitespace-pre-wrap" style={{ lineHeight: '1.8' }}>
                  {generatedEntry.content}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="label border border-rule px-4 py-2 text-ivory/60 transition-colors hover:border-gold/40 hover:text-gold">
                  📋 Copy
                </button>
                <button className="label border border-rule px-4 py-2 text-ivory/60 transition-colors hover:border-gold/40 hover:text-gold">
                  💾 Save to Archive
                </button>
                <button className="label border border-rule px-4 py-2 text-ivory/60 transition-colors hover:border-gold/40 hover:text-gold">
                  🔄 Regenerate
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <Reveal>
            <div className="mt-8 border border-rule bg-void-deep p-8">
              <span className="label text-gold">Suggested Canon Entries</span>
              <div className="mt-4 space-y-3">
                {suggestions.map((s, i) => (
                  <div key={i} className="border border-rule bg-void p-4">
                    <p className="text-sm text-ivory/80 whitespace-pre-wrap">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-void-deep mt-16">
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
