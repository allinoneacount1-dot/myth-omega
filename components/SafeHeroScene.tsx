'use client';

import dynamic from 'next/dynamic';

const HeroScene = dynamic(async () => (await import('./HeroScene')).HeroScene, {
  ssr: false,
  loading: () => null,
});

export default HeroScene;
