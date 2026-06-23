import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#05070B',
        'void-deep': '#02030A',
        gold: { DEFAULT: '#D8B36A', deep: '#A88B4F' },
        ivory: { DEFAULT: '#F7F4EE', muted: '#9A9389' },
        sapphire: '#10213A',
        cyan: { DEFAULT: '#3AE9E0' },
        ember: { DEFAULT: '#A33A4A' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        mythic: '-0.02em',
        label: '0.18em',
      },
      transitionTimingFunction: {
        mythic: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reveal: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        cinematic: '2400ms',
        reveal: '1400ms',
      },
    },
  },
  plugins: [],
};
export default config;