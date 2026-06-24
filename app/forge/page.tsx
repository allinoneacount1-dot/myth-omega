'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { CANON_TYPES } from '@/lib/canon';
import { CIVILIZATION_PROFILES } from '@/lib/civilizations';

export default function ForgePage() {
  const [selectedCiv, setSelectedCiv] = useState('aetheria');
  const [selectedType, setSelectedType] = useState('lore');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [action, setAction] = useState<'generate' | 'validate' | 'suggest'>('generate');

  const civ = CIVILIZATION_PROFILES[selectedCiv];

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) { setError('Describe what you want to create'); return; }
    setIsGenerating(true);
    setError('');
    setGeneratedContent('');

    try {
      const res = await fetch('/api/canon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: { civilization: selectedCiv, type: selectedType, prompt: prompt.trim() } }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setGeneratedContent(data.content);
    } catch {
      setError('The Canon Builder encountered a disturbance. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, selectedCiv, selectedType, action]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Canon Forge</h1>
          <p className="mt-1 text-sm text-ivory/50">AI-assisted lore creation tool</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Civilization Selector */}
            <div className="border border-rule bg-void-deep p-4">
              <label className="label text-gold/70">Civilization</label>
              <select
                value={selectedCiv}
                onChange={(e) => setSelectedCiv(e.target.value)}
                className="mt-2 w-full border border-rule bg-void px-3 py-2 text-ivory text-sm focus:border-gold focus:outline-none"
              >
                {Object.values(CIVILIZATION_PROFILES).map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name} ({c.genre})</option>
                ))}
              </select>
            </div>

            {/* Action */}
            <div className="border border-rule bg-void-deep p-4">
              <label className="label text-gold/70">Action</label>
              <div className="mt-2 flex gap-2">
                {(['generate', 'suggest', 'validate'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAction(a)}
                    className={`label flex-1 py-2 border text-xs transition-all ${action === a ? 'border-gold/50 bg-gold/5 text-gold' : 'border-rule text-ivory/40'}`}
                  >
                    {a === 'generate' ? '✨ Gen' : a === 'suggest' ? '💡 Suggest' : '🔍 Validate'}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="border border-rule bg-void-deep p-4">
              <label className="label text-gold/70">Entry Type</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {CANON_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedType(t.value)}
                    className={`flex items-center gap-2 border p-2 text-left text-xs transition-all ${selectedType === t.value ? 'border-gold/50 bg-gold/5' : 'border-rule/30'}`}
                  >
                    <span>{t.icon}</span>
                    <span className="text-ivory/80">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Prompt */}
            <div className="border border-rule bg-void-deep p-4">
              <label className="label text-gold/70">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                rows={4}
                className="mt-2 w-full border border-rule bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="label text-ivory/30">{prompt.length} characters</span>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="label border border-gold px-6 py-2 text-gold transition-all hover:bg-gold hover:text-void disabled:opacity-30"
                >
                  {isGenerating ? 'Forging...' : 'Generate'}
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-ember">{error}</p>}
            </div>

            {/* Output */}
            {generatedContent && (
              <div className="border border-rule bg-void-deep p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="label text-gold/70">Generated Output</span>
                  <div className="flex gap-2">
                    <button className="label text-xs border border-rule px-3 py-1 text-ivory/50 hover:text-gold">Copy</button>
                    <button className="label text-xs border border-rule px-3 py-1 text-ivory/50 hover:text-gold">Save</button>
                  </div>
                </div>
                <div className="border border-rule/30 bg-void p-4 max-h-96 overflow-y-auto">
                  <p className="text-sm text-ivory/85 whitespace-pre-wrap leading-relaxed">{generatedContent}</p>
                </div>
              </div>
            )}

            {/* Civ Context */}
            {civ && (
              <div className="border border-rule bg-void-deep p-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: civ.color }} />
                  <span className="text-sm text-ivory/90">{civ.name}</span>
                  <span className="label text-ivory/30">{civ.genre}</span>
                </div>
                <p className="mt-2 text-xs text-ivory/60 leading-relaxed">{civ.tagline}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
