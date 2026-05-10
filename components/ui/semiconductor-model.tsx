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
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x00aaff, 1);
    fillLight.position.set(-5, 2, -5);
    scene.add(fillLight);

    // Generate a synthetic semiconductor model (layers)
    const layerCount = 5;
    const layerThickness = 0.1;
    const size = 2;

    for (let i = 0; i < layerCount; i++) {
      const geometry = new THREE.BoxGeometry(size, layerThickness, size);

      // Alternate colors for layers (Silicon grey, Gold contacts, etc)
      let color = 0x444444;
      if (i === 0) color = 0x222222; // Substrate
      if (i === layerCount - 1) color = 0xFFD700; // Top contacts

      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9
      });

      const mesh = new THREE.Mesh(geometry, material);
      const yPos = (i - (layerCount - 1) / 2) * (layerThickness * 2);
      mesh.position.set(0, yPos, 0);

      // For "explosion", we'll move them along their Y axis
      const direction = new THREE.Vector3(0, i > (layerCount-1)/2 ? 1 : -1, 0);

      partsRef.current.push({
        mesh,
        originalPos: mesh.position.clone(),
        direction: direction,
      });

      scene.add(mesh);
    }

    const raycaster = new THREE.Raycaster();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = new THREE.Vector2(
        ((e.clientX - rect.left) / width) * 2 - 1,
        -((e.clientY - rect.top) / height) * 2 + 1,
      );
    };

    container.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      scene.rotation.y += delta * 0.1;

      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        isHovered.current = true;
      } else {
        if (Math.abs(mouseRef.current.x) > 0.6 || Math.abs(mouseRef.current.y) > 0.6) {
            isHovered.current = false;
        }
      }

      const targetProgress = isHovered.current ? 1 : 0;
      explosionProgress.current += (targetProgress - explosionProgress.current) * 0.1;

      partsRef.current.forEach(({ mesh, originalPos, direction }) => {
        const explosionDistance = 1.5;
        const targetPos = originalPos.clone().add(direction.clone().multiplyScalar(explosionDistance * explosionProgress.current));
        mesh.position.lerp(targetPos, 0.1);
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
