import { NextRequest, NextResponse } from 'next/server';
import { generateProposalId, calculateVoteResult } from '@/lib/governance';

// In-memory store for demo — in production this would be on-chain or database
const proposals: Map<string, any> = new Map();
const votes: Map<string, any[]> = new Map();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const civilization = searchParams.get('civilization');

  const allProposals = Array.from(proposals.values());
  const filtered = civilization
    ? allProposals.filter((p) => p.civilization === civilization)
    : allProposals;

  return NextResponse.json({ proposals: filtered });
}

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case 'create': {
        const { civilization, title, description, type, proposer, quorum } = data;
        const id = generateProposalId();
        const proposal = {
          id,
          civilization,
          title,
          description,
          type,
          status: 'voting',
          proposer,
          votes: { for: 0, against: 0, abstain: 0 },
          quorum: quorum || 100,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
        };
        proposals.set(id, proposal);
        votes.set(id, []);
        return NextResponse.json({ proposal });
      }

      case 'vote': {
        const { proposalId, voter, choice, weight = 1 } = data;
        const proposal = proposals.get(proposalId);
        if (!proposal) {
          return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
        }
        if (proposal.status !== 'voting') {
          return NextResponse.json({ error: 'Proposal is not in voting phase' }, { status: 400 });
        }

        const proposalVotes = votes.get(proposalId) || [];
        const existingVote = proposalVotes.find((v) => v.voter === voter);

        if (existingVote) {
          // Update existing vote
          proposal.votes[existingVote.choice] -= existingVote.weight;
          existingVote.choice = choice;
          existingVote.weight = weight;
          existingVote.timestamp = new Date().toISOString();
        } else {
          proposalVotes.push({ voter, proposalId, choice, weight, timestamp: new Date().toISOString() });
        }

        proposal.votes[choice] += weight;
        votes.set(proposalId, proposalVotes);

        // Check if proposal should pass/fail
        const result = calculateVoteResult(proposal.votes, proposal.quorum);
        if (result.quorumReached && result.forPercentage > 50) {
          proposal.status = 'passed';
        } else if (result.quorumReached && result.forPercentage <= 50) {
          proposal.status = 'rejected';
        }

        proposals.set(proposalId, proposal);
        return NextResponse.json({ proposal, result });
      }

      case 'delegate': {
        const { delegator, delegate, scope } = data;
        return NextResponse.json({
          delegation: {
            delegator,
            delegate,
            scope,
            active: true,
            createdAt: new Date().toISOString(),
          },
        });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Governance error:', error);
    return NextResponse.json({ error: 'Governance system temporarily unavailable.' }, { status: 500 });
  }
}
