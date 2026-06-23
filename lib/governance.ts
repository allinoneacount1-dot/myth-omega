// MYTH Governance — proposal and voting types

export interface GovernanceProposal {
  id: string;
  civilization: string;
  title: string;
  description: string;
  type: 'constitutional' | 'canon' | 'treasury' | 'diplomatic' | 'agent';
  status: 'draft' | 'voting' | 'passed' | 'rejected' | 'executed';
  proposer: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  quorum: number;
  deadline: string;
  createdAt: string;
}

export interface Vote {
  voter: string;
  proposalId: string;
  choice: 'for' | 'against' | 'abstain';
  weight: number;
  timestamp: string;
}

export interface Delegation {
  delegator: string;
  delegate: string;
  scope: 'all' | 'constitutional' | 'canon' | 'treasury';
  active: boolean;
}

export const PROPOSAL_TYPES = [
  { value: 'constitutional', label: 'Constitutional', description: 'Changes to the civilization\'s governing framework' },
  { value: 'canon', label: 'Canon', description: 'Additions or modifications to official lore' },
  { value: 'treasury', label: 'Treasury', description: 'Allocation of civilization funds' },
  { value: 'diplomatic', label: 'Diplomatic', description: 'Inter-civilization treaties and relations' },
  { value: 'agent', label: 'Agent', description: 'Agent assignment and capability changes' },
] as const;

export function calculateVoteResult(votes: { for: number; against: number; abstain: number }, quorum: number): {
  passed: boolean;
  totalVotes: number;
  forPercentage: number;
  quorumReached: boolean;
} {
  const totalVotes = votes.for + votes.against + votes.abstain;
  const quorumReached = totalVotes >= quorum;
  const forPercentage = totalVotes > 0 ? (votes.for / totalVotes) * 100 : 0;
  const passed = quorumReached && forPercentage > 50;

  return { passed, totalVotes, forPercentage, quorumReached };
}

export function generateProposalId(): string {
  return `prop-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
