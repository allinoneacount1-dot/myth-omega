'use client';

interface ParallaxLayerProps {
  variant?: 'rings' | 'pyramid' | 'helix';
  color?: string;
}

export function ParallaxLayer({ variant = 'rings', color = '#D8B36A' }: ParallaxLayerProps) {
  if (variant === 'pyramid') {
    return (
      <div className="pointer-events-none overflow-hidden py-16 opacity-30">
        <svg viewBox="0 0 200 120" className="mx-auto w-48" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="pyramidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polygon points="100,10 180,110 20,110" fill="url(#pyramidGrad)" stroke={color} strokeWidth="0.5" opacity="0.5">
            <animate attributeName="opacity" dur="6s" repeatCount="indefinite" values="0.3;0.6;0.3" />
          </polygon>
          <line x1="100" y1="10" x2="100" y2="110" stroke={color} strokeWidth="0.3" opacity="0.3" />
          <line x1="20" y1="110" x2="100" y2="60" stroke={color} strokeWidth="0.3" opacity="0.2" />
          <line x1="180" y1="110" x2="100" y2="60" stroke={color} strokeWidth="0.3" opacity="0.2" />
        </svg>
      </div>
    );
  }

  if (variant === 'helix') {
    return (
      <div className="pointer-events-none overflow-hidden py-16 opacity-30">
        <svg viewBox="0 0 200 120" className="mx-auto w-48" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="helixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M60,10 Q100,30 140,10 Q100,50 60,70 Q100,90 140,70 Q100,110 60,110" fill="none" stroke={color} strokeWidth="1" opacity="0.5">
            <animate attributeName="stroke-dashoffset" dur="8s" repeatCount="indefinite" values="0;200" />
            <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.2;0.5;0.2" />
          </path>
          <path d="M140,10 Q100,30 60,10 Q100,50 140,70 Q100,90 60,70 Q100,110 140,110" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
            <animate attributeName="stroke-dashoffset" dur="8s" repeatCount="indefinite" values="200;0" />
            <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.1;0.3;0.1" />
          </path>
          {[10, 40, 70, 100].map((y, i) => (
            <circle key={i} cx="100" cy={y} r="2" fill={color} opacity="0.4">
              <animate attributeName="r" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" values={`${1 + i * 0.3};${3 + i * 0.5};${1 + i * 0.3}`} />
              <animate attributeName="opacity" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" values="0.2;0.7;0.2" />
            </circle>
          ))}
        </svg>
      </div>
    );
  }

  // rings (default)
  return (
    <div className="pointer-events-none overflow-hidden py-16 opacity-30">
      <svg viewBox="0 0 200 120" className="mx-auto w-48" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="ringGrad">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="70%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {[30, 45, 60].map((r, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="60"
            rx={r}
            ry={r * 0.35}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity={0.3 + i * 0.1}
            strokeDasharray={`${4 + i * 2} ${4 + i}`}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 100 60`}
              to={`${i % 2 === 0 ? 360 : -360} 100 60`}
              dur={`${12 + i * 4}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" dur={`${4 + i}s`} repeatCount="indefinite" values={`${0.15 + i * 0.1};${0.4 + i * 0.1};${0.15 + i * 0.1}`} />
          </ellipse>
        ))}
        <circle cx="100" cy="60" r="3" fill={color} opacity="0.5">
          <animate attributeName="r" dur="3s" repeatCount="indefinite" values="2;4;2" />
          <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.3;0.7;0.3" />
        </circle>
      </svg>
    </div>
  );
}

export default ParallaxLayer;
