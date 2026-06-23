'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENTS } from '@/lib/content';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  text: string;
  time: string;
}

function formatTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

const AGENT_COLORS: Record<string, string> = {
  Historian: '#D8B36A',
  Archivist: '#3AE9E0',
  Lorekeeper: '#9B4DFF',
  Oracle: '#FFD700',
  Diplomat: '#00B4A8',
  Worldbuilder: '#FF4D00',
  Narrator: '#A33A4A',
};

const AGENT_SUGGESTIONS: Record<string, string[]> = {
  Historian: [
    'How do I maintain canon consistency across chapters?',
    'What happens when two civilizations share a timeline?',
    'How do I resolve a contradiction in my lore?',
  ],
  Archivist: [
    'How should I structure my civilization\'s knowledge base?',
    'What artifacts should I preserve for future generations?',
    'How do I make my archive queryable?',
  ],
  Lorekeeper: [
    'How do I distinguish canon from fan fiction?',
    'What happens when someone breaks canon?',
    'How do I handle retcons without breaking immersion?',
  ],
  Oracle: [
    'What should happen next in my civilization?',
    'Predict the next major event for my world',
    'How do I foreshadow a major plot twist?',
  ],
  Diplomat: [
    'How do I negotiate a treaty between civilizations?',
    'What happens when two canons conflict?',
    'How do I facilitate cross-civilization collaboration?',
  ],
  Worldbuilder: [
    'Help me design a new geography for my world',
    'How do I create a consistent magic system?',
    'What makes a world feel alive and expansive?',
  ],
  Narrator: [
    'How do I create engaging daily events?',
    'What makes a community feel connected to their world?',
    'How do I design seasonal storytelling?',
  ],
};

export default function AgentChatPage({ params }: { params: Promise<{ agent: string }> }) {
  const router = useRouter();
  const [agentName, setAgentName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    params.then((p) => {
      if (cancelled) return;
      const name = decodeURIComponent(p.agent);
      setAgentName(name);
      const agent = AGENTS.find((a) => a.name.toLowerCase() === name.toLowerCase());
      if (agent) {
        setMessages([
          {
            id: 'welcome',
            role: 'agent',
            text: `I am the ${agent.name}, ${agent.role}. ${agent.desc}. What would you like to discuss?`,
            time: formatTime(),
          },
        ]);
      }
    });
    return () => { cancelled = true; };
  }, [params]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const agent = AGENTS.find((a) => a.name.toLowerCase() === agentName.toLowerCase());
  const agentColor = agent ? AGENT_COLORS[agent.name] || '#D8B36A' : '#D8B36A';

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping || !agent) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const conversationHistory = messages
      .filter((m) => m.role !== 'system')
      .slice(-10)
      .map((m) => ({
        role: m.role === 'agent' ? 'assistant' : m.role,
        content: m.text,
      }));

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: agent.name,
          messages: [...conversationHistory, { role: 'user', content: text.trim() }],
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const reply = data.reply || 'The agent falls silent. Please try again.';

      setMessages((prev) => [
        ...prev,
        {
          id: `agent-${Date.now()}`,
          role: 'agent',
          text: reply,
          time: formatTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'system',
          text: 'The agent encountered a disturbance. Please try again.',
          time: formatTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!agent) {
    return (
      <main className="bg-void text-ivory">
        <Navigation />
        <section className="section-lg pt-40 text-center">
          <h1 className="headline-section text-ivory">Agent Not Found</h1>
          <p className="mt-6 text-ivory/60">The agent you&apos;re looking for doesn&apos;t exist in the MYTH network.</p>
          <Link href="/agents" className="label mt-8 inline-flex items-center gap-3 border border-gold px-8 py-4 text-gold">
            View All Agents<span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    );
  }

  const suggestions = AGENT_SUGGESTIONS[agent.name] || [];

  return (
    <main className="bg-void text-ivory">
      <Navigation />
      <SectionDivider variant="particles" />

      {/* Agent Header */}
      <section className="section-sm pt-40 text-center">
        <Reveal>
          <div className="mx-auto flex flex-col items-center">
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center border"
              style={{ borderColor: `${agentColor}40`, backgroundColor: `${agentColor}10` }}
            >
              <AgentGlyph name={agent.name} size={48} stroke={agentColor} />
            </div>
            <span className="label text-gold">{agent.role}</span>
            <h1 className="headline-hero mt-4 text-ivory">{agent.name}</h1>
            <p
              className="mx-auto mt-6 max-w-2xl font-display text-lg italic text-ivory/70 md:text-xl"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              {agent.desc}
            </p>
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="glyph" />

      {/* Chat Interface */}
      <section className="section-md mx-auto max-w-[800px] px-6 md:px-10">
        <Reveal>
          <div
            className="border border-rule bg-void-deep"
            style={{ borderRadius: '12px' }}
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-rule px-6 py-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: `${agentColor}20` }}
              >
                <AgentGlyph name={agent.name} size={18} stroke={agentColor} />
              </div>
              <div>
                <span className="label" style={{ color: agentColor }}>{agent.name}</span>
                <p className="text-[10px] text-ivory/40">Online • {agent.role}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="max-h-[400px] overflow-y-auto px-6 py-6 space-y-4" style={{ minHeight: '250px' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-gold/15 text-ivory'
                        : msg.role === 'system'
                        ? 'bg-ember/10 text-ember/80 border border-ember/20'
                        : 'text-ivory/90'
                    }`}
                    style={{
                      borderRadius: '12px',
                      borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                      borderBottomLeftRadius: msg.role === 'user' ? '12px' : '4px',
                      ...(msg.role === 'agent'
                        ? { backgroundColor: `${agentColor}08`, borderLeft: `2px solid ${agentColor}30` }
                        : {}),
                    }}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ lineHeight: '1.65' }}>{msg.text}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-ivory/30">{msg.time}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3"
                    style={{ borderRadius: '12px', borderBottomLeftRadius: '4px', backgroundColor: `${agentColor}08` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ivory/50">{agent.name} is contemplating</span>
                      <span className="flex gap-0.5">
                        {[0, 200, 400].map((delay) => (
                          <span
                            key={delay}
                            className="inline-block h-1.5 w-1.5 rounded-full animate-bounce"
                            style={{ backgroundColor: `${agentColor}90`, animationDelay: `${delay}ms` }}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && suggestions.length > 0 && (
              <div className="border-t border-rule px-6 py-4">
                <span className="label text-ivory/40">Suggested questions</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="border border-rule px-3 py-1.5 text-xs text-ivory/60 transition-all duration-300 hover:border-gold/40 hover:text-gold"
                      style={{ borderRadius: '6px' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-rule px-6 py-4">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder={`Ask the ${agent.name}...`}
                  className="flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/30 outline-none"
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="flex h-9 w-9 items-center justify-center border transition-all duration-300 disabled:opacity-30"
                  style={{
                    borderRadius: '8px',
                    borderColor: input.trim() ? `${agentColor}60` : 'rgba(247,244,238,0.15)',
                    color: agentColor,
                  }}
                  aria-label="Send message"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12L13 7L1 2L4 7L1 12Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="wave" />

      {/* Other Agents */}
      <section className="section-sm mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="label text-gold">The Seven Agents</span>
            <h2 className="headline-editorial mt-4 text-ivory">Speak with Another Agent</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {AGENTS.filter((a) => a.name !== agent.name).map((a, i) => (
            <Reveal key={a.name} delay={i * 0.05}>
              <button
                onClick={() => router.push(`/agents/${a.name.toLowerCase()}`)}
                className="group w-full border border-rule bg-void-deep p-6 text-left transition-all duration-500 hover:border-gold/30"
              >
                <AgentGlyph name={a.name} size={32} stroke={AGENT_COLORS[a.name]} />
                <h4 className="mt-4 font-display text-lg text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                  {a.name}
                </h4>
                <p className="mt-1 label text-ivory/40">{a.role}</p>
              </button>
            </Reveal>
          ))}
        </div>
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
