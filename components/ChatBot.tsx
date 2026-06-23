'use client';

import { useState, useRef, useEffect } from 'react';
import { MythMark } from '@/components/glyphs';

interface Message {
  id: string;
  role: 'user' | 'oracle';
  text: string;
  time: string;
}

function getOracleResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.match(/\b(hi|hello|hey|halo|oi|greetings)\b/)) {
    return 'Greetings, traveler. I am the MYTH Oracle. Ask me about civilizations, agents, canon, governance, or the Culture Engine.';
  }
  if (lower.includes('myth') && (lower.includes('what') || lower.includes('about') || lower.includes('is'))) {
    return 'MYTH is the first Culture Engine — a system that enables collective imagination, identity, stories, values, symbols, rituals, governance, and history to evolve as persistent digital civilizations.';
  }
  if (lower.includes('civilization') || lower.includes('aetheria') || lower.includes('chronos') || lower.includes('amber') || lower.includes('void') || lower.includes('ember') || lower.includes('silent bloom')) {
    return 'Six civilizations exist in the MYTH network: Aetheria (Mythic Fantasy), Chronos Veil (Sci-Fi Noir), The Amber Highlands (Epic Saga), Void Meridian (Cosmic Horror), Ember Accord (Political Drama), and Silent Bloom (Pastoral Mystery). Each is tended by dedicated agents.';
  }
  if (lower.includes('agent') || lower.includes('historian') || lower.includes('archivist') || lower.includes('lorekeeper') || lower.includes('oracle') || lower.includes('diplomat') || lower.includes('worldbuilder') || lower.includes('narrator')) {
    return 'Seven agents tend the civilizations: Historian (Continuity Keeper), Archivist (Living Memory), Lorekeeper (Canon Guardian), Oracle (Narrative Evolution), Diplomat (Civilization Interaction), Worldbuilder (Universe Expansion), and Narrator (Living Events).';
  }
  if (lower.includes('canon') || lower.includes('lore')) {
    return 'Canon is the living memory of a civilization. It is passed down, forked, merged, and reinterpreted across generations. The Lorekeeper protects its integrity while the Oracle suggests its natural evolution.';
  }
  if (lower.includes('governance') || lower.includes('vote') || lower.includes('proposal')) {
    return 'Governance in MYTH operates through five principles: Canon Supremacy, Agent Advisory, Civilizational Sovereignty, Inter-Civilization Treaty, and Inheritance Obligation. Vote on proposals, resolve conflicts, and shape constitutional frameworks.';
  }
  if (lower.includes('token') || lower.includes('$myth') || lower.includes('myth token')) {
    return '$MYTH is the participation layer of a living civilization. It is not a passive asset or yield instrument. Holding MYTH is holding a vote in the next chapter of a shared story.';
  }
  if (lower.includes('score') || lower.includes('culture score') || lower.includes('ranking')) {
    return 'The Culture Score measures civilization richness across five dimensions: Canon Depth (30%), Agent Activity (25%), Governance Participation (20%), Lore Consistency (15%), and Member Engagement (10%). The Amber Highlands currently leads with 92.';
  }
  return 'I am the MYTH Oracle. I speak of civilizations, canon, agents, and culture. Ask me about Aetheria, the Seven Agents, Governance, or the Culture Engine itself.';
}

function formatTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'oracle',
      text: 'Greetings, traveler. I am the MYTH Oracle. Ask me about civilizations, agents, canon, governance, or the Culture Engine.',
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: input.trim(),
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getOracleResponse(userMsg.text);
      const oracleMsg: Message = {
        id: `oracle-${Date.now()}`,
        role: 'oracle',
        text: response,
        time: formatTime(),
      };
      setMessages((prev) => [...prev, oracleMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center border border-gold/50 bg-void-deep backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold/10 hover:scale-110 group"
        style={{ borderRadius: '50%', boxShadow: isOpen ? 'none' : '0 0 20px rgba(216,179,106,0.15)' }}
        aria-label="Open MYTH Oracle"
      >
        <MythMark size={24} stroke={isOpen ? '#FF4D00' : '#D8B36A'} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[99] flex flex-col border border-rule bg-void-deep backdrop-blur-xl"
          style={{
            width: 'min(380px, calc(100vw - 48px))',
            maxHeight: 'min(520px, calc(100vh - 200px))',
            borderRadius: '12px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(216,179,106,0.08)',
            animation: 'chatSlideUp 0.25s ease-out',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rule px-4 py-3">
            <div className="flex items-center gap-3">
              <MythMark size={20} stroke="#D8B36A" />
              <span className="label text-gold">MYTH Oracle</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-ivory/40 transition-colors hover:text-ivory"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: '200px' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gold/15 text-ivory'
                      : 'bg-sapphire/15 text-ivory/90'
                  }`}
                  style={{ borderRadius: '12px', borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px', borderBottomLeftRadius: msg.role === 'user' ? '12px' : '4px' }}
                >
                  <p className="text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>{msg.text}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-ivory/30">{msg.time}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-sapphire/15 px-4 py-3" style={{ borderRadius: '12px', borderBottomLeftRadius: '4px' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ivory/50">Oracle is reading</span>
                    <span className="flex gap-0.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60" style={{ animation: 'chatDot 1.4s infinite 0s' }} />
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60" style={{ animation: 'chatDot 1.4s infinite 0.2s' }} />
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60" style={{ animation: 'chatDot 1.4s infinite 0.4s' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-rule px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask the Oracle..."
                className="flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/30 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center border border-gold/40 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 disabled:opacity-30 disabled:hover:border-gold/40 disabled:hover:bg-transparent"
                style={{ borderRadius: '8px' }}
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12L13 7L1 2L4 7L1 12Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
