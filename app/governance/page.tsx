'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CIVILIZATION_PROFILES } from '@/lib/civilizations';
import { PROPOSAL_TYPES } from '@/lib/governance';

export default function GovernancePage() {
  const [selectedCiv, setSelectedCiv] = useState<string | null>(null);

  const allProposals = Object.values(CIVILIZATION_PROFILES).flatMap((civ) =>
    civ.governance.proposals.map((p) => ({ ...p, civName: civ.name, civColor: civ.color }))
  );

  const filtered = selectedCiv
    ? allProposals.filter((p) => p.civName === CIVILIZATION_PROFILES[selectedCiv]?.name)
    : allProposals;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Governance Hub</h1>
          <p className="mt-1 text-sm text-ivory/50">Proposals, voting, and delegation</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCiv(null)}
            className={`label px-3 py-1.5 border text-xs ${!selectedCiv ? 'border-gold/50 bg-gold/5 text-gold' : 'border-rule text-ivory/40'}`}
          >All</button>
          {Object.values(CIVILIZATION_PROFILES).map((civ) => (
            <button
              key={civ.slug}
              onClick={() => setSelectedCiv(civ.slug)}
              className={`label px-3 py-1.5 border text-xs ${selectedCiv === civ.slug ? 'border-gold/50 bg-gold/5 text-gold' : 'border-rule text-ivory/40'}`}
            >{civ.name}</button>
          ))}
        </div>

        {/* Proposals */}
        <div className="space-y-3">
          {filtered.map((proposal, i) => {
            const totalVotes = proposal.votesFor + proposal.votesAgainst;
            const forPct = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
            const quorumPct = Math.min(100, (totalVotes / proposal.quorum) * 100);

            return (
              <div key={i} className="border border-rule bg-void-deep p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: proposal.civColor }} />
                    <div>
                      <h3 className="text-sm font-medium text-ivory/90">{proposal.title}</h3>
                      <p className="label text-ivory/40">{proposal.civName}</p>
                    </div>
                  </div>
                  <span className={`label text-xs px-2 py-0.5 border ${
                    proposal.status === 'voting' ? 'text-gold border-gold/30' :
                    proposal.status === 'passed' ? 'text-teal border-teal/30' :
                    proposal.status === 'rejected' ? 'text-ember border-ember/30' :
                    'text-ivory/30 border-rule'
                  }`}>{proposal.status}</span>
                </div>
                <p className="mt-2 text-xs text-ivory/60">{proposal.description}</p>
                {(proposal.status === 'voting' || proposal.status === 'passed' || proposal.status === 'rejected') && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-teal">{proposal.votesFor} For</span>
                      <span className="text-ember">{proposal.votesAgainst} Against</span>
                    </div>
                    <div className="relative h-2 bg-rule/20 rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-teal/70 rounded-full" style={{ width: `${forPct}%` }} />
                    </div>
                    <p className="label text-ivory/30">Quorum: {quorumPct.toFixed(0)}% ({totalVotes}/{proposal.quorum})</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
