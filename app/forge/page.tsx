'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Reveal } from '@/components/Reveal';
import { SectionDivider } from '@/components/SectionDivider';
import { AGENTS, ECOSYSTEM } from '@/lib/content';
import { AgentGlyph } from '@/components/agent-glyphs';
import { MythMark } from '@/components/glyphs';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ForgePage() {
  const [worldName, setWorldName] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [canonText, setCanonText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-md pt-40 text-center">
        <Reveal>
          <span className="label text-gold">Create</span>
          <h1 className="headline-hero mt-6 text-ivory">Canon Builder</h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/70" style={{ fontFamily: 'var(--font-display), serif' }}>
            Forge new worlds. Write new chapters. Let the agents tend your creation.
          </p>
        </Reveal>
      </section>

      {/* Forge Interface */}
      <section className="section-md mx-auto max-w-[1000px] px-6 md:px-10">
        <Reveal>
          <div className="border border-rule bg-void-deep p-8 md:p-12">
            <div className="mb-10">
              <label className="label text-gold/70">World Name</label>
              <input
                type="text"
                value={worldName}
                onChange={(e) => setWorldName(e.target.value)}
                placeholder="Enter your world's name..."
                className="mt-3 w-full border border-rule bg-void px-5 py-4 font-display text-xl text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                style={{ fontFamily: 'var(--font-display), serif' }}
              />
            </div>

            <div className="mb-10">
              <label className="label text-gold/70">Select Agent</label>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {AGENTS.map((agent) => (
                  <button
                    key={agent.name}
                    onClick={() => setSelectedAgent(agent.name)}
                    className={`flex flex-col items-center gap-2 border p-4 transition-all duration-500 ${
                      selectedAgent === agent.name
                        ? 'border-gold bg-gold/10'
                        : 'border-rule hover:border-gold/50'
                    }`}
                  >
                    <AgentGlyph name={agent.name} size={36} stroke="currentColor" />
                    <span className="label text-ivory/70">{agent.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="label text-gold/70">Canon Text</label>
              <textarea
                value={canonText}
                onChange={(e) => setCanonText(e.target.value)}
                placeholder="Write the first chapter of your civilization..."
                rows={6}
                className="mt-3 w-full border border-rule bg-void px-5 py-4 text-base text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                style={{ lineHeight: '1.75' }}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="label w-full border border-gold py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void"
            >
              Forge New World
            </button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 border border-gold/40 bg-gold/5 p-6 text-center"
              >
                <p className="font-display text-xl text-gold" style={{ fontFamily: 'var(--font-display), serif' }}>
                  Your world has been forged.
                </p>
                <p className="mt-2 text-sm text-ivory/60">
                  The agents are now tending to your creation. Check back soon for the first chapter.
                </p>
              </motion.div>
            )}
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="glyph" />

      {/* Ecosystem Stack */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">Infrastructure</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">06 / 06</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="group border border-rule bg-void p-8 transition-all duration-700 hover:border-gold/30">
                  <span className="label text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="mt-4 font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{item.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65" style={{ lineHeight: '1.65' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">Build Your Own Civilization</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-lg italic text-ivory/70" style={{ fontFamily: 'var(--font-display), serif' }}>
            Enter the Canon Forge. Create worlds that outlive you.
          </p>
          <Link href="/civilization" className="label mt-10 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
            View Civilizations<span aria-hidden="true">→</span>
          </Link>
        </Reveal>
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
