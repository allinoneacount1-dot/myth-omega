'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENTS } from '@/lib/content';

interface Proposal {
  id: string;
  title: string;
  proposer: string;
  proposerRole: string;
  type: string;
  status: 'Active' | 'Pending' | 'Under Review' | 'Ended';
  endsIn: string;
  votesFor: number;
  votesAgainst: number;
  quorumTarget: number;
  quorumReached: number;
  description: string;
}

const PROPOSALS: Proposal[] = [
  {
    id: '001',
    title: 'Canonize The Sundering of Eastern Provinces',
    proposer: 'Oracle',
    proposerRole: 'Narrative Evolution',
    type: 'Canon Addition',
    status: 'Active',
    endsIn: '3 days',
    votesFor: 2109,
    votesAgainst: 738,
    quorumTarget: 75,
    quorumReached: 72,
    description: "The Oracle has predicted this event. Formalizing it as canon ensures the continuity of Aetheria's timeline.",
  },
  {
    id: '002',
    title: 'Establish Diplomatic Protocol with Void Meridian',
    proposer: 'Diplomat',
    proposerRole: 'Civilization Interaction',
    type: 'Treaty',
    status: 'Active',
    endsIn: '5 days',
    votesFor: 698,
    votesAgainst: 505,
    quorumTarget: 75,
    quorumReached: 45,
    description: 'Void Meridian seeks cultural exchange. The Diplomat recommends cautious engagement.',
  },
  {
    id: '003',
    title: 'Amend Governance: Reduce Quorum to 60%',
    proposer: 'Community Vote',
    proposerRole: 'Public Proposal',
    type: 'Constitutional Amendment',
    status: 'Pending',
    endsIn: 'Starts in 2 days',
    votesFor: 0,
    votesAgainst: 0,
    quorumTarget: 75,
    quorumReached: 0,
    description: 'Current 75% quorum requirement prevents timely decisions. Proposal to lower threshold.',
  },
  {
    id: '004',
    title: 'Archive The Obsidian Codex as Protected Artifact',
    proposer: 'Archivist',
    proposerRole: 'Living Memory',
    type: 'Artifact Protection',
    status: 'Under Review',
    endsIn: 'Under Review',
    votesFor: 731,
    votesAgainst: 161,
    quorumTarget: 75,
    quorumReached: 35,
    description: 'This artifact contains foundational lore. Protection ensures preservation.',
  },
];

const GOVERNANCE_STATS = {
  totalProposals: 47,
  activeProposals: 4,
  passed: 38,
  rejected: 5,
  avgParticipation: 67,
  treasury: 12450,
};

const PRINCIPLES = [
  {
    index: 1,
    title: 'Canon Supremacy',
    text: 'All governance actions must align with established canon',
  },
  {
    index: 2,
    title: 'Agent Advisory',
    text: 'The 7 agents serve as advisory council, not rulers',
  },
  {
    index: 3,
    title: 'Civilizational Sovereignty',
    text: 'Each civilization governs itself independently',
  },
  {
    index: 4,
    title: 'Inter-Civilization Treaty',
    text: 'Cross-world agreements require 2/3 majority',
  },
  {
    index: 5,
    title: 'Inheritance Obligation',
    text: 'All decisions must consider impact on future generations',
  },
];

type VoteChoice = 'for' | 'against' | null;

export default function GovernancePage() {
  const [votes, setVotes] = useState<Record<string, VoteChoice>>({});

  const handleVote = (proposalId: string, choice: VoteChoice) => {
    setVotes((prev) => ({
      ...prev,
      [proposalId]: prev[proposalId] === choice ? null : choice,
    }));
  };

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-32">
        {/* Background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(216,179,106,0.07)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center md:px-10">
          <p className="label hero-fade-in hero-delay-1 text-gold">
            MYTH Commons
          </p>
          <h1 className="headline-hero hero-fade-up hero-delay-2 mt-6 text-ivory">
            Governance for<br />Civilizations
          </h1>
          <p
            className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/70 hero-fade-up hero-delay-3"
            style={{ fontFamily: 'var(--font-display), serif' }}
          >
            Vote on canon additions. Resolve lore conflicts. Shape the
            constitutional framework of your world.
          </p>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ===== ACTIVE PROPOSALS ===== */}
      <section className="section-md mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-6">
            <span className="label text-gold">Active Proposals</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">
              {PROPOSALS.filter((p) => p.status === 'Active').length} active
            </span>
          </div>
        </Reveal>

        <div className="space-y-6">
          {PROPOSALS.map((proposal, idx) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              userVote={votes[proposal.id] ?? null}
              onVote={handleVote}
              delay={0.08 * idx}
            />
          ))}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ===== GOVERNANCE STATS ===== */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Reveal>
            <div className="mb-12 flex items-baseline gap-6">
              <span className="label text-gold">Network Statistics</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">Live Data</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              {
                label: 'Total Proposals',
                value: GOVERNANCE_STATS.totalProposals.toString(),
              },
              {
                label: 'Active',
                value: GOVERNANCE_STATS.activeProposals.toString(),
                accent: 'text-gold',
              },
              {
                label: 'Passed',
                value: GOVERNANCE_STATS.passed.toString(),
                accent: 'text-green-400',
              },
              {
                label: 'Rejected',
                value: GOVERNANCE_STATS.rejected.toString(),
                accent: 'text-ember',
              },
              {
                label: 'Avg Participation',
                value: `${GOVERNANCE_STATS.avgParticipation}%`,
              },
              {
                label: 'Treasury Locked',
                value: `${GOVERNANCE_STATS.treasury.toLocaleString()} MYTH`,
                accent: 'text-gold',
              },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.05 * i}>
                <div className="border border-rule bg-void p-6 text-center">
                  <p className="label text-ivory/40">{stat.label}</p>
                  <p
                    className={`mt-3 font-mono text-2xl font-medium ${stat.accent ?? 'text-ivory'}`}
                  >
                    {stat.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ===== CONSTITUTIONAL FRAMEWORK ===== */}
      <section className="section-md mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-6">
            <span className="label text-gold">Constitutional Framework</span>
            <span className="h-px flex-1 bg-rule" />
            <span className="label text-ivory/40">5 Principles</span>
          </div>
        </Reveal>

        <div className="space-y-4">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.index} delay={0.08 * i}>
              <div className="group border border-rule bg-void-deep p-8 transition-all duration-500 hover:border-gold/20">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-3xl text-gold/30 transition-colors duration-500 group-hover:text-gold/60">
                    {String(principle.index).padStart(2, '0')}
                  </span>
                  <div>
                    <h4
                      className="font-display text-xl text-ivory"
                      style={{ fontFamily: 'var(--font-display), serif' }}
                    >
                      {principle.title}
                    </h4>
                    <p className="mt-2 text-sm text-ivory/60">
                      {principle.text}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ===== AGENT ADVISORY COUNCIL ===== */}
      <section className="section-md bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-20 flex items-baseline gap-6">
              <span className="label text-gold">Advisory Council</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="label text-ivory/40">07 / 07 Online</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.name} delay={0.05 * i}>
                <article className="group flex h-full flex-col bg-void-deep p-8 transition-colors duration-700 hover:bg-sapphire/40">
                  <div className="mb-8 flex items-baseline justify-between">
                    <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>{agent.name}</span>
                    <span className="label text-ivory/30">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="label text-gold/60">{agent.role}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/70" style={{ lineHeight: '1.65' }}>{agent.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-lg text-center">
        <Reveal>
          <MythMark size={60} stroke="#D8B36A" className="mx-auto mb-8" />
          <h2 className="headline-section text-ivory">
            Shape the Future
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-lg italic text-ivory/70" style={{ fontFamily: 'var(--font-display), serif' }}>
            Your voice matters. Your vote shapes civilizations.
          </p>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
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

/* ===== ProposalCard — voting interface for each proposal ===== */
function ProposalCard({
  proposal,
  userVote,
  onVote,
  delay = 0,
}: {
  proposal: Proposal;
  userVote: VoteChoice;
  onVote: (proposalId: string, choice: VoteChoice) => void;
  delay?: number;
}) {
  const totalVotes =
    proposal.votesFor + proposal.votesAgainst || 1;
  const forPercent = Math.round((proposal.votesFor / totalVotes) * 100);
  const againstPercent = 100 - forPercent;

  const statusColor =
    proposal.status === 'Active'
      ? 'text-gold'
      : proposal.status === 'Pending'
        ? 'text-ember'
        : proposal.status === 'Under Review'
          ? 'text-ivory/50'
          : 'text-green-400';

  const statusDot =
    proposal.status === 'Active'
      ? 'animate-pulse'
      : '';

  return (
    <Reveal delay={delay}>
      <article className="border border-rule bg-void-deep p-6 transition-all duration-500 hover:border-gold/20 md:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`label ${statusColor}`}>
                <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${statusDot}`} style={{ backgroundColor: 'currentColor' }} />
                {proposal.status.toUpperCase()}
              </span>
              <span className="label text-ivory/30">#{proposal.id}</span>
              <span className="label text-gold/50">{proposal.type}</span>
            </div>
            <h3
              className="mt-3 font-display text-xl text-ivory md:text-2xl"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              {proposal.title}
            </h3>
          </div>

          {/* Timer */}
          <div className="shrink-0 text-right">
            <p className="label text-ivory/30">Time Remaining</p>
            <p className="mt-1 font-mono text-sm text-ivory/70">
              {proposal.endsIn}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 max-w-3xl text-sm text-ivory/60">
          {proposal.description}
        </p>

        {/* Meta */}
        <p className="mt-3 label text-ivory/30">
          Proposed by{' '}
          <span className="text-gold/70">{proposal.proposer}</span>
          {' · '}
          <span className="text-ivory/50">{proposal.proposerRole}</span>
        </p>

        {/* Vote chart bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs">
            <span className="label text-gold">
              For · {proposal.votesFor.toLocaleString()} ({forPercent}%)
            </span>
            <span className="label text-ember">
              Against · {proposal.votesAgainst.toLocaleString()} ({againstPercent}%)
            </span>
          </div>
          <div className="mt-2 flex h-2 overflow-hidden rounded-sm" style={{ backgroundColor: 'rgba(255,68,68,0.15)' }}>
            <div
              className="transition-all duration-700 ease-out"
              style={{
                width: `${forPercent}%`,
                backgroundColor: '#D8B36A',
              }}
            />
          </div>
        </div>

        {/* Quorum bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="label text-ivory/40">Quorum Progress</span>
            <span className="label text-ivory/50">
              {proposal.quorumReached}% / {proposal.quorumTarget}%
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ivory/10">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(proposal.quorumReached, 100)}%`,
                backgroundColor:
                  proposal.quorumReached >= proposal.quorumTarget
                    ? '#00B4A8'
                    : 'rgba(216,179,106,0.5)',
              }}
            />
          </div>
        </div>

        {/* Voting controls */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onVote(proposal.id, 'for')}
            className={`border px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
              userVote === 'for'
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-rule text-ivory/50 hover:border-gold/40 hover:text-gold/80'
            }`}
          >
            ↑ Vote For
          </button>
          <button
            onClick={() => onVote(proposal.id, 'against')}
            className={`border px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
              userVote === 'against'
                ? 'border-ember bg-ember/10 text-ember'
                : 'border-rule text-ivory/50 hover:border-ember/40 hover:text-ember/80'
            }`}
          >
            ↓ Vote Against
          </button>

          {/* Your vote indicator */}
          <span className="label">
            {userVote === null ? (
              <span className="text-ivory/30">Your Vote: Not Yet</span>
            ) : userVote === 'for' ? (
              <span className="text-gold">Your Vote: For ↑</span>
            ) : (
              <span className="text-ember">Your Vote: Against ↓</span>
            )}
          </span>
        </div>
      </article>
    </Reveal>
  );
}
