'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface Agent3DCardProps {
  name: string;
  color: string;
  role: string;
}

function Agent3DCard({ name, color, role }: Agent3DCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const init = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create unique geometry per agent
    const col = new THREE.Color(color);

    let geometry: THREE.BufferGeometry;
    switch (name) {
      case 'Historian':
        geometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 8, 2, 3);
        break;
      case 'Archivist':
        geometry = new THREE.OctahedronGeometry(1.3, 0);
        break;
      case 'Lorekeeper':
        geometry = new THREE.IcosahedronGeometry(1.2, 0);
        break;
      case 'Oracle':
        geometry = new THREE.DodecahedronGeometry(1.2, 0);
        break;
      case 'Diplomat':
        geometry = new THREE.TorusGeometry(1, 0.15, 16, 50);
        break;
      case 'Worldbuilder':
        geometry = new THREE.ConeGeometry(1, 2, 6);
        break;
      case 'Narrator':
        geometry = new THREE.TorusKnotGeometry(0.9, 0.25, 64, 8, 3, 5);
        break;
      default:
        geometry = new THREE.SphereGeometry(1, 32, 32);
    }

    const material = new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xD8B36A,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(geometry.clone(), wireMaterial);
    wireMesh.scale.setScalar(1.05);
    scene.add(wireMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(col, 1.5, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x3AE9E0, 0.5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Particles around the shape
    const particleCount = 50;
    const particleGeom = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 6;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xD8B36A,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    let time = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;

      const targetRotX = hovered ? 0.5 : time * 0.3;
      const targetRotY = hovered ? 1.2 : time * 0.5;

      mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.05;
      wireMesh.rotation.copy(mesh.rotation);

      // Pulse scale on hover
      const targetScale = hovered ? 1.15 : 1;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      wireMesh.scale.lerp(new THREE.Vector3(targetScale * 1.05, targetScale * 1.05, targetScale * 1.05), 0.05);

      // Float
      mesh.position.y = Math.sin(time * 2) * 0.1;
      wireMesh.position.y = mesh.position.y;

      // Rotate particles
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      // Emissive pulse on hover
      material.emissiveIntensity = hovered ? 0.6 + Math.sin(time * 4) * 0.2 : 0.3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireMaterial.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, [name, color, hovered]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200px] w-full cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}

export default Agent3DCard;
