'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import * as THREE from 'three';

export function SemiconductorModel({
  className,
}: {
  className?: string;
} = {}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const explosionProgress = useRef(0);
  const partsRef = useRef<{ mesh: THREE.Mesh; originalPos: THREE.Vector3; direction: THREE.Vector3 }[]>([]);
  const mouseRef = useRef(new THREE.Vector2());
  const isHovered = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 25);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 10); // Higher angle for better perspective
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dramatic Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xFFD700, 5, 10); // Gold accent
    accentLight.position.set(2, 2, 2);
    scene.add(accentLight);

    const rimLight = new THREE.SpotLight(0x00aaff, 10); // Tech blue rim
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Synthetic "Silicon Wafer" Model
    const layers = 7;
    const radius = 3;
    const thickness = 0.05;

    for (let i = 0; i < layers; i++) {
      // Main wafer disk
      const geometry = new THREE.CylinderGeometry(radius, radius, thickness, 64);

      let color = 0x2a2a2a; // Dark silicon
      if (i === 0) color = 0x1a1a1a; // Base
      if (i === layers - 1) color = 0xFFD700; // Gold circuitry layer

      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85
      });

      const mesh = new THREE.Mesh(geometry, material);
      const yPos = (i - (layers - 1) / 2) * 0.2;
      mesh.position.set(0, yPos, 0);

      // Explosion direction: push layers away from center Y
      const direction = new THREE.Vector3(0, i > (layers-1)/2 ? 1 : -1, 0);

      partsRef.current.push({
        mesh,
        originalPos: mesh.position.clone(),
        direction: direction,
      });

      scene.add(mesh);
    }

    // Add some "circuits" as small cubes around the wafer
    for (let j = 0; j < 20; j++) {
        const circGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const circMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.5 });
        const circMesh = new THREE.Mesh(circGeo, circMat);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * radius;
        const x = Math.cos(angle) * dist;
        const z = Math.sin(angle) * dist;
        const y = (Math.random() - 0.5) * 1;

        circMesh.position.set(x, y, z);
        const direction = new THREE.Vector3(x, y, z).normalize();

        partsRef.current.push({
            mesh: circMesh,
            originalPos: circMesh.position.clone(),
            direction: direction,
        });
        scene.add(circMesh);
    }

    const raycaster = new THREE.Raycaster();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.set(
        ((e.clientX - rect.left) / width) * 2 - 1,
        -((e.clientY - rect.top) / height) * 2 + 1,
      );
    };

    container.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow, cinematic rotation
      scene.rotation.y += delta * 0.05;
      scene.rotation.z = Math.sin(time * 0.2) * 0.1;

      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        isHovered.current = true;
      } else {
        if (Math.abs(mouseRef.current.x) > 0.7 || Math.abs(mouseRef.current.y) > 0.7) {
            isHovered.current = false;
        }
      }

      const targetProgress = isHovered.current ? 1 : 0;
      explosionProgress.current += (targetProgress - explosionProgress.current) * 0.05;

      partsRef.current.forEach(({ mesh, originalPos, direction }) => {
        const explosionDistance = 2.5;
        const targetPos = originalPos.clone().add(direction.clone().multiplyScalar(explosionDistance * explosionProgress.current));
        mesh.position.lerp(targetPos, 0.08);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={cn(
        'fixed inset-0 z-[-2]',
        className
      )}
    />
  );
}
