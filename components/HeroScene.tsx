'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

function useMouseParallax(intensity = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [intensity]);

  return offset;
}

function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const mouse = useMouseParallax(0.03);

  const init = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // === Particle Field (Stars) ===
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 80;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;

      // Gold to cyan gradient
      const t = Math.random();
      colors[i3] = 0.847 * (1 - t) + 0.227 * t;     // R
      colors[i3 + 1] = 0.702 * (1 - t) + 0.914 * t; // G
      colors[i3 + 2] = 0.416 * (1 - t) + 0.878 * t; // B

      sizes[i] = Math.random() * 0.15 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // === Wireframe Globe (Monument Core) ===
    const globeGeometry = new THREE.IcosahedronGeometry(5, 2);
    const globeWireframe = new THREE.WireframeGeometry(globeGeometry);
    const globeMaterial = new THREE.LineBasicMaterial({
      color: 0xD8B36A,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const globe = new THREE.LineSegments(globeWireframe, globeMaterial);
    scene.add(globe);

    // === Inner Glowing Core ===
    const coreGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xD8B36A,
      transparent: true,
      opacity: 0.15,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // === Orbital Rings ===
    const ringGeometry = new THREE.TorusGeometry(8, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x3AE9E0,
      transparent: true,
      opacity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(10, 0.015, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xD8B36A, transparent: true, opacity: 0.2 })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 3;
    scene.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(12, 0.01, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x9B4DFF, transparent: true, opacity: 0.15 })
    );
    ring3.rotation.y = Math.PI / 2.5;
    ring3.rotation.x = Math.PI / 5;
    scene.add(ring3);

    // === Floating Orbs (Agent Representatives) ===
    const orbs: THREE.Mesh[] = [];
    const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const orbColors = [0xD8B36A, 0x3AE9E0, 0x9B4DFF, 0xA33A4A, 0x00B4A8, 0xFF4D00, 0xA88B4F];

    for (let i = 0; i < 7; i++) {
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: orbColors[i],
        transparent: true,
        opacity: 0.6,
      });
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      const angle = (i / 7) * Math.PI * 2;
      const radius = 14 + Math.random() * 3;
      orb.position.x = Math.cos(angle) * radius;
      orb.position.y = (Math.random() - 0.5) * 8;
      orb.position.z = Math.sin(angle) * radius;
      orb.userData = { angle, speed: 0.001 + Math.random() * 0.002, offset: Math.random() * Math.PI * 2 };
      scene.add(orb);
      orbs.push(orb);
    }

    // === Animation Loop ===
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate globe
      globe.rotation.y += 0.002;
      globe.rotation.x += 0.001;

      // Pulse core
      const pulse = 1 + Math.sin(time * 2) * 0.1;
      core.scale.setScalar(pulse);
      (core.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(time * 2) * 0.05;

      // Rotate rings
      ring1.rotation.z += 0.003;
      ring2.rotation.x += 0.002;
      ring3.rotation.z += 0.001;

      // Animate orbs
      orbs.forEach((orb) => {
        const d = orb.userData as { angle: number; speed: number; offset: number };
        d.angle += d.speed;
        orb.position.y += Math.sin(time + d.offset) * 0.005;
        orb.position.x = Math.cos(d.angle) * 14;
        orb.position.z = Math.sin(d.angle) * 14;
      });

      // Rotate particles slowly
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      // Mouse parallax
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouse.x * 5 - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (-mouse.y * 5 - cameraRef.current.position.y) * 0.02;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, [mouse.x, mouse.y]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-void" />;
  }

  return (
    <div className="absolute inset-0">
      <HeroCanvas />
    </div>
  );
}
