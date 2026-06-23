'use client';

import { useRef, useMemo, useEffect, useState, Component, type ReactNode } from 'react';
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

function ConstellationField({ count = 600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useEffect(() => {
    if (!mounted || !points.current) return;
    let animId: number;
    const animate = () => {
      if (points.current) {
        points.current.rotation.y += 0.0008;
        points.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.02;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mounted]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D8B36A"
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !group.current) return;
    let animId: number;
    const animate = () => {
      if (group.current) {
        group.current.rotation.y += 0.0003;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mounted]);

  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 5,
      ] as [number, number, number],
      scale: 0.05 + Math.random() * 0.1,
      color: i % 2 === 0 ? '#D8B36A' : '#3AE9E0',
      speed: 0.001 + Math.random() * 0.002,
    }));
  }, []);

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    (async () => {
      try {
        const { Canvas } = await import('@react-three/fiber');

        if (cancelled) return;

        const Scene = () => (
          <>
            <ambientLight intensity={0.12} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#D8B36A" />
            <pointLight position={[-10, -5, -10]} intensity={0.25} color="#3AE9E0" />
            <ConstellationField />
            <FloatingOrbs />
          </>
        );

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
      <div className="absolute inset-0">
        <Component />
      </div>
    </R3FErrorBoundary>
  );
}
