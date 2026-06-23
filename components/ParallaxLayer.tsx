'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface ParallaxLayerProps {
  scrollOffset?: number;
  variant?: 'rings' | 'pyramid' | 'helix';
  color?: string;
}

function ParallaxLayer({ scrollOffset = 0, variant = 'rings', color = '#D8B36A' }: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const init = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const col = new THREE.Color(color);
    let mesh: THREE.Mesh | THREE.LineSegments;

    switch (variant) {
      case 'pyramid': {
        const geo = new THREE.ConeGeometry(2, 4, 4);
        const mat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.2, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.4,
        });
        mesh = new THREE.Mesh(geo, mat);
        break;
      }
      case 'helix': {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-2, -3, 0), new THREE.Vector3(2, -1, 1), new THREE.Vector3(-1, 1, -1),
          new THREE.Vector3(2, 3, 0), new THREE.Vector3(-1, 4, 1),
        ]);
        const geo = new THREE.TubeGeometry(curve, 50, 0.15, 8, false);
        const mat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.3, metalness: 0.7, roughness: 0.2, transparent: true, opacity: 0.5,
        });
        mesh = new THREE.Mesh(geo, mat);
        break;
      }
      default: { // rings
        const geo = new THREE.TorusGeometry(2.5, 0.05, 16, 100);
        const mat = new THREE.MeshStandardMaterial({
          color: col, emissive: col, emissiveIntensity: 0.2, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.4,
        });
        mesh = new THREE.Mesh(geo, mat);
        break;
      }
    }

    scene.add(mesh);

    // Ambient + point light
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const light = new THREE.PointLight(col, 1, 20);
    light.position.set(5, 5, 5);
    scene.add(light);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [variant, color]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  const parallaxY = scrollOffset * 0.3;
  const parallaxX = Math.sin(scrollOffset * 0.001) * 2;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        opacity: 0.6,
      }}
    />
  );
}

export { ParallaxLayer };
export default ParallaxLayer;
