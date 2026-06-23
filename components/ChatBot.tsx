'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MythMark } from '@/components/glyphs';
import { AgentGlyph } from '@/components/agent-glyphs';
import { AGENTS } from '@/lib/content';

interface Message {
  id: string;
  role: 'user' | 'oracle' | 'agent' | 'system';
  text: string;
  time: string;
  agent?: string;
}

type ChatMode = 'oracle' | 'agent';

function formatTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

const SUGGESTIONS = [
  'Tell me about the seven agents',
  'How does the Culture Score work?',
  'What civilizations exist in MYTH?',
  'How do I build a civilization?',
  'Explain $MYTH token utility',
  'What is the Culture Engine?',
];

const AGENT_COLORS: Record<string, string> = {
  Historian: '#D8B36A',
  Archivist: '#3AE9E0',
  Lorekeeper: '#9B4DFF',
  Oracle: '#FFD700',
  Diplomat: '#00B4A8',
  Worldbuilder: '#FF4D00',
  Narrator: '#A33A4A',
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('oracle');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'oracle',
      text: 'Greetings, traveler. I am the MYTH Oracle. Ask me about civilizations, agents, canon, governance, or the Culture Engine. You may also speak directly with any of the Seven Agents.',
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentPicker, setShowAgentPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

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
        role: m.role === 'oracle' || m.role === 'agent' ? 'assistant' : m.role,
        content: m.text,
      }));

    try {
      const endpoint = mode === 'agent' && selectedAgent
        ? '/api/agents'
        : '/api/oracle';

      const body = mode === 'agent' && selectedAgent
        ? { agent: selectedAgent, messages: [...conversationHistory, { role: 'user', content: text.trim() }] }
        : { messages: [...conversationHistory, { role: 'user', content: text.trim() }] };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();
      const reply = data.reply || 'The Oracle falls silent. Please try again.';

      const agentName = data.agent || (mode === 'agent' ? selectedAgent : 'Oracle');
      const responseRole = mode === 'agent' ? 'agent' : 'oracle';

      const responseMsg: Message = {
        id: `response-${Date.now()}`,
        role: responseRole,
        text: reply,
        time: formatTime(),
        agent: agentName || undefined,
      };

      setMessages((prev) => [...prev, responseMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'system',
        text: 'The Oracle encountered a disturbance. Please try again in a moment.',
        time: formatTime(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages, mode, selectedAgent]);

  const handleSend = () => {
    sendMessage(input);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const switchToAgent = (agentName: string) => {
    setSelectedAgent(agentName);
    setMode('agent');
    setShowAgentPicker(false);
    const agent = AGENTS.find((a) => a.name === agentName);
    const introMsg: Message = {
      id: `agent-intro-${Date.now()}`,
      role: 'agent',
      text: `I am the ${agentName}, ${agent?.role || 'agent of MYTH'}. I stand ready to assist with ${agent?.desc.slice(0, 80).toLowerCase()}... What would you like to discuss?`,
      time: formatTime(),
      agent: agentName,
    };
    setMessages((prev) => [...prev, introMsg]);
  };

  const switchToOracle = () => {
    setMode('oracle');
    setSelectedAgent(null);
    setShowAgentPicker(false);
  };

  const isEmpty = messages.length <= 1;

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
          className="fixed bottom-24 right-6 z-[99] flex flex-col overflow-hidden border border-rule bg-void-deep backdrop-blur-xl"
          style={{
            width: 'min(420px, calc(100vw - 48px))',
            height: 'min(600px, calc(100vh - 200px))',
            borderRadius: '12px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(216,179,106,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rule px-4 py-3">
            <div className="flex items-center gap-3">
              {mode === 'agent' && selectedAgent ? (
                <>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${AGENT_COLORS[selectedAgent] || '#D8B36A'}20` }}
                  >
                    <AgentGlyph name={selectedAgent} size={18} stroke={AGENT_COLORS[selectedAgent] || '#D8B36A'} />
                  </div>
                  <div className="flex flex-col">
                    <span className="label text-gold">{selectedAgent}</span>
                    <span className="text-[9px] uppercase tracking-wider text-ivory/40">
                      {AGENTS.find((a) => a.name === selectedAgent)?.role}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <MythMark size={20} stroke="#D8B36A" />
                  <span className="label text-gold">MYTH Oracle</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Agent Picker Toggle */}
              <button
                onClick={() => setShowAgentPicker(!showAgentPicker)}
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  showAgentPicker ? 'text-gold' : 'text-ivory/40 hover:text-ivory'
                }`}
                title="Switch Agent"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="4" r="2" />
                  <circle cx="3" cy="12" r="2" />
                  <circle cx="13" cy="12" r="2" />
                  <path d="M8 6v2M5 10l3-2 3 2" />
                </svg>
              </button>
              {/* Close */}
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
          </div>

          {/* Agent Picker Dropdown */}
          {showAgentPicker && (
            <div className="border-b border-rule bg-void-deep p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="label text-ivory/50">Speak with an Agent</span>
                {mode === 'agent' && (
                  <button onClick={switchToOracle} className="label text-gold/60 hover:text-gold">
                    ← Back to Oracle
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {AGENTS.map((agent) => (
                  <button
                    key={agent.name}
                    onClick={() => switchToAgent(agent.name)}
                    className={`flex items-center gap-2 border p-2 text-left transition-all duration-300 ${
                      selectedAgent === agent.name && mode === 'agent'
                        ? 'border-gold/50 bg-gold/5'
                        : 'border-rule hover:border-gold/30'
                    }`}
                    style={{ borderRadius: '6px' }}
                  >
                    <AgentGlyph name={agent.name} size={16} stroke={AGENT_COLORS[agent.name]} />
                    <div>
                      <p className="text-xs text-ivory/90">{agent.name}</p>
                      <p className="text-[9px] text-ivory/40">{agent.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gold/15 text-ivory'
                      : msg.role === 'agent'
                      ? 'text-ivory/90'
                      : msg.role === 'system'
                      ? 'bg-ember/10 text-ember/80 border border-ember/20'
                      : 'bg-sapphire/15 text-ivory/90'
                  }`}
                  style={{
                    borderRadius: '12px',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                    borderBottomLeftRadius: msg.role === 'user' ? '12px' : '4px',
                    ...(msg.role === 'agent' && msg.agent
                      ? { backgroundColor: `${AGENT_COLORS[msg.agent] || '#D8B36A'}10`, borderLeft: `2px solid ${AGENT_COLORS[msg.agent] || '#D8B36A'}40` }
                      : {}),
                  }}
                >
                  {msg.agent && msg.role === 'agent' && (
                    <p className="mb-1 label" style={{ color: AGENT_COLORS[msg.agent] || '#D8B36A' }}>
                      {msg.agent}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ lineHeight: '1.6' }}>{msg.text}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-ivory/30">{msg.time}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-sapphire/15 px-4 py-3" style={{ borderRadius: '12px', borderBottomLeftRadius: '4px' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ivory/50">
                      {mode === 'agent' && selectedAgent ? `${selectedAgent} is` : 'Oracle is'} contemplating
                    </span>
                    <span className="flex gap-0.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '200ms' }} />
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '400ms' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {isEmpty && (
            <div className="border-t border-rule px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
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
          <div className="border-t border-rule px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={mode === 'agent' && selectedAgent ? `Ask the ${selectedAgent}...` : 'Ask the Oracle...'}
                className="flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/30 outline-none"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
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
