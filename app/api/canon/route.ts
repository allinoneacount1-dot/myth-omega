import { NextRequest, NextResponse } from 'next/server';
import { CHAPTERS, AGENTS, TOKEN, ECOSYSTEM, FINAL } from '@/lib/content';
import { CIVILIZATION_PROFILES } from '@/lib/civilizations';

const SYSTEM_PROMPT = `You are the MYTH Canon Builder — an AI assistant that helps create, expand, and validate civilization lore for the MYTH Culture Engine.

Your role:
1. Help users create new canon entries (lore, characters, events, artifacts, locations, myths)
2. Ensure consistency with existing civilization canon
3. Suggest narrative connections between entries
4. Validate lore against established canon rules
5. Generate rich, editorial-quality content that fits the civilization's genre and tone

Tone: Match the civilization's genre. Mythic Fantasy = elevated, archetypal. Sci-Fi Noir = gritty, technical. Epic Saga = grand, ancestral. Cosmic Horror = unsettling, vast. Political Drama = sharp, layered. Pastoral Mystery = quiet, riddled.

Key facts about MYTH:
- 7 agents: Historian, Archivist, Lorekeeper, Oracle, Diplomat, Worldbuilder, Narrator
- 6 civilizations with distinct genres and tones
- Culture Score measures: Canon Depth 30%, Agent Activity 25%, Governance 20%, Lore Consistency 15%, Member Engagement 10%
- Built on Solana. AI-powered civilization engine.

When generating canon:
- Always specify which civilization the entry belongs to
- Include connections to existing lore when possible
- Flag potential contradictions with established canon
- Suggest tags and cross-references
- Write in the civilization's voice, not generic fantasy/sci-fi`;

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Canon Builder temporarily unavailable.' }, { status: 503 });
    }

    const apiUrl = process.env.OPENROUTER_API_KEY
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';

    const model = process.env.OPENROUTER_API_KEY
      ? (process.env.ORACLE_MODEL || 'openrouter/auto')
      : (process.env.OPENAI_MODEL || 'gpt-4o-mini');

    let systemContent = SYSTEM_PROMPT;
    let userContent = '';

    switch (action) {
      case 'generate': {
        const { civilization, type, prompt, existingLore } = data;
        const civ = CIVILIZATION_PROFILES[civilization.toLowerCase()];
        systemContent += `\n\nCurrent civilization context: ${civ?.name} (${civ?.genre}) — ${civ?.description}`;
        userContent = `Create a new ${type} canon entry for ${civilization}.\n\nUser request: ${prompt}\n\n${existingLore ? `Existing lore context:\n${existingLore}` : ''}\n\nGenerate a rich, detailed canon entry that fits the civilization's genre and tone. Include:\n1. Title\n2. Content (2-4 paragraphs)\n3. Suggested tags\n4. Potential connections to existing lore\n5. Any contradictions to flag`;
        break;
      }
      case 'validate': {
        const { civilization, entry, existingEntries } = data;
        userContent = `Validate this new canon entry against existing canon for ${civilization}:\n\nNew entry:\nTitle: ${entry.title}\nContent: ${entry.content}\n\nExisting entries:\n${existingEntries.map((e: { title: string; content: string }) => `- ${e.title}: ${e.content.slice(0, 100)}...`).join('\n')}\n\nCheck for:\n1. Contradictions with existing canon\n2. Consistency with civilization's genre and tone\n3. Suggested improvements\n4. Cross-reference opportunities`;
        break;
      }
      case 'expand': {
        const { civilization, entry, direction } = data;
        userContent = `Expand this canon entry for ${civilization}:\n\nCurrent entry:\nTitle: ${entry.title}\nContent: ${entry.content}\n\nExpansion direction: ${direction}\n\nGenerate expanded content that adds depth, detail, and narrative richness while maintaining consistency.`;
        break;
      }
      case 'suggest': {
        const { civilization, count = 3 } = data;
        const civ = CIVILIZATION_PROFILES[civilization.toLowerCase()];
        systemContent += `\n\nCurrent civilization context: ${civ?.name} (${civ?.genre}) — ${civ?.description}`;
        userContent = `Suggest ${count} new canon entry ideas for ${civilization}. For each suggestion, provide:\n1. Title\n2. Type (lore/character/event/artifact/location/myth)\n3. Brief description (2-3 sentences)\n4. Why it would enrich the civilization's canon`;
        break;
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...(process.env.OPENROUTER_API_KEY && {
          'HTTP-Referer': 'https://mythomega.xyz',
          'X-Title': 'MYTH Canon Builder',
        }),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemContent },
          { role: 'user', content: userContent },
        ],
        temperature: 0.8,
        max_tokens: 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Canon Builder API error:', response.status, errorText);
      return NextResponse.json({ error: 'The Canon Builder encountered a disturbance.' }, { status: 500 });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || 'The Builder falls silent. Try again.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Canon Builder error:', error);
    return NextResponse.json({ error: 'The Canon Builder is temporarily unavailable.' }, { status: 500 });
  }
}
