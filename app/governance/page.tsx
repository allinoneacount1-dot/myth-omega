'use client';
import { Navigation } from '@/components/Navigation';
import { Reveal } from '@/components/Reveal';
import { SectionDivider } from '@/components/SectionDivider';
import { AGENTS } from '@/lib/content';
import { AgentGlyph } from '@/components/agent-glyphs';
import { MythMark } from '@/components/glyphs';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PROPOSALS = [
  { id: 1, title: 'Add "The Shattered Isles" to Aetheria canon', author: 'Oracle', status: 'active', votes: { for: 1247, against: 89 }, deadline: '3 days' },
  { id: 2, title: 'Establish diplomatic channel with Ember Accord', author: 'Diplomat', status: 'active', votes: { for: 892, against: 234 }, deadline: '5 days' },
  { id: 3, title: 'Archive obsolete chapter 4.2 (The False Spring)', author: 'Archivist', status: 'passed', votes: { for: 2103, against: 156 }, deadline: 'Ended' },
  { id: 4, title: 'Fund Worldbuilder expansion: The Crimson Depths', author: 'Worldbuilder', status: 'active', votes: { for: 567, against: 421 }, deadline: '7 days' },
  { id: 5, title: 'Ratify the Canon Amendment VII (Inheritance Protocol)', author: 'Lorekeeper', status: 'passed', votes: { for: 3410, against: 78 }, deadline: 'Ended' },
];

export default function GovernancePage() {
  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Hero */}
      <section className="section-md pt-40 text-center">
        <Reveal>
          <span className="label text-gold">Decide the Future</span>
          <h1 className="headline-hero mt-6 text-ivory">Governance</h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/70" style={{ fontFamily: 'var(--font-display), serif' }}>
            Every holder of MYTH holds a vote in the next chapter of a shared story.
          </p>
        </Reveal>
      </section>

      {/* Proposals */}
      <section className="section-md mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-6">
            <span className="label text-gold">Active Proposals</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">{PROPOSALS.filter(p => p.status === 'active').length} active</span>
          </div>
        </Reveal>

        <div className="space-y-4">
          {PROPOSALS.map((proposal, i) => {
            const totalVotes = proposal.votes.for + proposal.votes.against;
            const forPercent = (proposal.votes.for / totalVotes) * 100;

            return (
              <Reveal key={proposal.id} delay={i * 0.06}>
                <motion.article
                  className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`label ${proposal.status === 'active' ? 'text-gold' : 'text-green-400'}`}>
                          {proposal.status === 'active' ? '● ACTIVE' : '✓ PASSED'}
                        </span>
                        <span className="label text-ivory/30">#{proposal.id}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                        {proposal.title}
                      </h3>
                      <p className="mt-1 label text-ivory/40">
                        Proposed by <span className="text-gold/70">{proposal.author}</span> · {proposal.deadline}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="label text-ivory/40">Votes</p>
                        <p className="mt-1 font-mono text-sm text-gold">
                          {proposal.votes.for.toLocaleString()} for · {proposal.votes.against.toLocaleString()} against
                        </p>
                      </div>
                      <div className="h-10 w-10">
                        <svg viewBox="0 0 36 36" className="h-full w-full">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(247,244,238,0.1)" strokeWidth="2" />
                          <circle
                            cx="18" cy="18" r="15.9" fill="none"
                            stroke={proposal.status === 'active' ? '#D8B36A' : '#00B4A8'}
                            strokeWidth="2"
                            strokeDasharray={`${forPercent} ${100 - forPercent}`}
                            strokeDashoffset="0"
                            transform="rotate(-90 18 18)"
                          />
                          <text x="18" y="20" textAnchor="middle" fill="#F7F4EE" fontSize="8" fontFamily="monospace">
                            {Math.round(forPercent)}%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* Agents Overview */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">The Seven</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">07 / 07</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.name} delay={i * 0.05}>
                <article className="group flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/40">
                  <div className="mb-8 text-gold transition-transform duration-700 group-hover:scale-110">
                    <AgentGlyph name={agent.name} size={56} stroke="currentColor" />
                  </div>
                  <h4 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</h4>
                  <p className="mt-1 label text-gold/60">{agent.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.65' }}>{agent.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">Shape the Future</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-lg italic text-ivory/70" style={{ fontFamily: 'var(--font-display), serif' }}>
            Your voice matters. Your vote shapes civilizations.
          </p>
          <Link href="/civilization" className="label mt-10 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
            Explore Civilizations<span aria-hidden="true">→</span>
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