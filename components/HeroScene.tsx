'use client';

import { useRef, useEffect, useState, Component, type ReactNode } from 'react';
import * as THREE from 'three';

interface R3FErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface R3FErrorBoundaryState {
  hasError: boolean;
}

class R3FErrorBoundary extends Component<R3FErrorBoundaryProps, R3FErrorBoundaryState> {
  constructor(props: R3FErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function ConstellationField({ count = 800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = (() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  })();

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#D8B36A"
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    (async () => {
      try {
        const { Canvas, useFrame } = await import('@react-three/fiber');
        
        if (cancelled) return;

        const Scene = () => {
          useFrame(() => {});
          return (
            <>
              <ambientLight intensity={0.15} />
              <pointLight position={[10, 10, 10]} intensity={0.6} color="#D8B36A" />
              <pointLight position={[-10, -5, -10]} intensity={0.3} color="#3AE9E0" />
              <ConstellationField />
            </>
          );
        };

        setComponent(() => function R3FScene() {
          return (
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                failIfMajorPerformanceCaveat: false,
              }}
              style={{ position: 'absolute', inset: 0 }}
              dpr={[1, 2]}
            >
              <Scene />
            </Canvas>
          );
        });
      } catch {
        // R3F failed to load
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (!mounted || !Component) {
    return <div className="absolute inset-0 bg-void" />;
  }

  return (
    <R3FErrorBoundary fallback={<div className="absolute inset-0 bg-void" />}>
      <div ref={containerRef} className="absolute inset-0">
        <Component />
      </div>
    </R3FErrorBoundary>
  );
}
