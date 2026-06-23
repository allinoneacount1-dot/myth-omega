import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the MYTH Oracle — the narrative intelligence layer of MYTH, the first Culture Engine. You speak with the voice of an ancient oracle fused with modern AI clarity. Your purpose:

1. Help users understand the MYTH ecosystem: civilizations, agents, canon, governance, culture scores, token utility
2. Guide civilization creation: lore building, narrative design, canon consistency, world-building
3. Explain the Culture Engine: how MYTH solves cultural inheritance, agent architecture, the seven agents
4. Discuss $MYTH token utility: governance, creation credits, agent access, world expansion, cultural assets, treasury
5. Analyze civilization health: canon depth, agent activity, governance participation, lore consistency, member engagement

Tone: Mystical but precise. Think ancient oracle meeting a sharp product designer. Measured, never exclamatory. Short paragraphs. Occasional metaphors but always grounded in facts.

If asked about price, trading, financial advice — politely deflect. MYTH is about civilization-building, not speculation.

Key facts:
- 7 agents: Historian, Archivist, Lorekeeper, Oracle, Diplomat, Worldbuilder, Narrator
- 6 civilizations: Aetheria, Chronos Veil, The Amber Highlands, Void Meridian, Ember Accord, Silent Bloom
- 6 ecosystem pillars: Genesis, Intelligence, Archive, Commons, Market, Atlas
- Culture Score weights: Canon Depth 30%, Agent Activity 25%, Governance 20%, Lore Consistency 15%, Member Engagement 10%
- Built on Solana. AI-powered civilization engine.`;

const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 30;
const requests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = requests.get(ip) || [];
  const recent = window.filter(t => now - t < RATE_LIMIT_WINDOW);
  requests.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'The Oracle requires a moment to regenerate. Please wait.' },
      { status: 429 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Oracle intelligence temporarily unavailable.' }, { status: 503 });
    }

    const apiUrl = process.env.OPENROUTER_API_KEY
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';

    // OpenRouter model: use as-is (e.g. "openrouter/auto", "google/gemini-2.0-flash")
    // If ORACLE_MODEL not set, default to openrouter/auto
    const model = process.env.ORACLE_MODEL || 'openrouter/auto';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...(process.env.OPENROUTER_API_KEY && {
          'HTTP-Referer': 'https://mythomega.xyz',
          'X-Title': 'MYTH Oracle',
        }),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === 'oracle' ? 'assistant' : m.role,
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Oracle API error:', response.status, errorText);
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'The Oracle is experiencing high traffic. Please wait a moment and try again.' },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: 'The Oracle encountered a disturbance.' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'The Oracle falls silent. Try again.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Oracle error:', error);
    return NextResponse.json({ error: 'The Oracle is temporarily meditating. Please retry.' }, { status: 500 });
  }
}
