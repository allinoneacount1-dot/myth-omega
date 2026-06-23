'use client';

import { useEffect, useState, useRef } from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'particles' | 'gradient' | 'glyph';
  flip?: boolean;
  color?: string;
}

export function SectionDivider({ variant = 'wave', flip = false, color = '#D8B36A' }: SectionDividerProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1.5s ease, transform 1.5s ease',
  };

  if (variant === 'wave') {
    return (
      <div ref={ref} style={style} className={`overflow-hidden ${flip ? 'rotate-180' : ''}`}>
        <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: '80px' }}>
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
          />
          <path
            d="M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.4"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80;
                M0,60 C240,120 480,40 720,60 C960,120 1200,40 1440,60;
                M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80
              "
            />
          </path>
        </svg>
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div ref={ref} style={style} className="overflow-hidden py-8">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: '60px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <circle
              key={i}
              cx={72 * (i + 1)}
              cy={30 + Math.sin(i * 0.8) * 15}
              r={1 + Math.random() * 1.5}
              fill={color}
              opacity={0.3 + Math.random() * 0.4}
            >
              <animate
                attributeName="opacity"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
                values="0.2;0.8;0.2"
              />
            </circle>
          ))}
          <line x1="0" y1="30" x2="1440" y2="30" stroke={color} strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>
    );
  }

  if (variant === 'glyph') {
    return (
      <div ref={ref} style={style} className="overflow-hidden py-6">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: '40px' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="20%" stopColor={color} stopOpacity="0.5" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="80%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="20" x2="1440" y2="20" stroke="url(#lineGrad)" strokeWidth="1" />
          <circle cx="720" cy="20" r="4" fill={color} opacity="0.8">
            <animate attributeName="r" dur="3s" repeatCount="indefinite" values="3;6;3" />
            <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.5;1;0.5" />
          </circle>
          <circle cx="680" cy="20" r="2" fill={color} opacity="0.4" />
          <circle cx="760" cy="20" r="2" fill={color} opacity="0.4" />
        </svg>
      </div>
    );
  }

  // gradient variant (default)
  return (
    <div ref={ref} style={style} className="overflow-hidden">
      <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ display: 'block', height: '80px' }}>
        <defs>
          <linearGradient id="gradGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor={color} stopOpacity="0.3" />
            <stop offset="70%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="38" width="1440" height="4" fill="url(#gradGrad)" />
      </svg>
    </div>
  );
}
