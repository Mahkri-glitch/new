'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

// Silicon crystal lattice atoms (4 bonded in tetrahedral arrangement)
interface LatticeAtom {
  position: [number, number, number];
  type: 'Si' | 'C' | 'I'; // Si=Silicon, C=Carbon (doping), I=Interstitial
}

interface LatticePoint {
  x: number;
  y: number;
  z: number;
  atoms: LatticeAtom[];
}

const LATTICE_ORIGIN = [0, 0, 0];
const BOND_LENGTH = 2.35; // ~2.35 Angstroms for Si-Si
const CELL_SIZE = 4.71; // ~4.71 Angstroms for diamond cubic
const LATTICE_COUNT = 12; // Number of unit cells
const ATOM_RADIUS_BASE = 0.6; // Radius relative to cell size
const BALLSTICK_RADIUS = 0.08;

// Generate silicon diamond cubic lattice
function generateLattice(count: number): LatticePoint[][][] {
  const points: LatticePoint[][][] = [];
  const origin = LATTICE_ORIGIN;

  for (let z = 0; z < count; z++) {
    points[z] = [];
    for (let x = 0; x < count; x++) {
      points[z][x] = [];
      for (let y = 0; y < count; y++) {
        const pos = [x * CELL_SIZE - (origin[0] * CELL_SIZE), y * CELL_SIZE - (origin[1] * CELL_SIZE), z * CELL_SIZE - (origin[2] * CELL_SIZE)];
        points[z][x][y] = { x: pos[0], y: pos[1], z: pos[2], atoms: [] };
      }
    }
  }

  // Add atoms to lattice points (tetrahedral arrangement)
  for (let z = 0; z < count; z++) {
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // Primary lattice atom (Si at corners)
        points[z][x][y].atoms.push({ position: [x * CELL_SIZE, y * CELL_SIZE, z * CELL_SIZE], type: 'Si' });
        // Tetrahedral positions (alternate lattice points)
        if ((x + y + z) % 2 === 0) {
          points[z][x][y].atoms.push({
            position: [
              x * CELL_SIZE + CELL_SIZE / 4,
              y * CELL_SIZE + CELL_SIZE / 4,
              z * CELL_SIZE + CELL_SIZE / 4,
            ],
            type: 'Si',
          });
        }
        // Random carbon doping (simulating doping)
        if (Math.random() < 0.03 && z > 2 && z < count - 3) {
          points[z][x][y].atoms.push({
            position: [
              x * CELL_SIZE + CELL_SIZE / 4,
              y * CELL_SIZE + CELL_SIZE / 4,
              z * CELL_SIZE + CELL_SIZE / 4,
            ],
            type: 'C',
          });
        }
        // Occasional interstitial (defect)
        if (Math.random() < 0.01 && z > 2 && z < count - 3) {
          points[z][x][y].atoms.push({
            position: [
              x * CELL_SIZE + 1.5,
              y * CELL_SIZE + 1.5,
              z * CELL_SIZE + 1.5,
            ],
            type: 'I',
          });
        }
      }
    }
  }
  return points;
}

export function MolecularLattice({
  className,
  autoRotate = true,
}: {
  className?: string;
  autoRotate?: boolean;
} = {}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const atomsRef = useRef<THREE.Mesh[]>([]);
  const bondsRef = useRef<THREE.Line[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 600, 1200);

    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
      1,
      10000
    );
    camera.position.set(0, 300, 600);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
    renderer.setSize(width, height);
    renderer.setClearColor(0x0a0a0a, 0);
    container.appendChild(renderer.domElement);

    // Create lattice
    const lattice = generateLattice(LATTICE_COUNT);
    const latticeObjects: { type: 'atom' | 'bond'; mesh?: THREE.Mesh | THREE.Line }[] = [];

    const atomGeometry = new THREE.SphereGeometry(ATOM_RADIUS_BASE, 16, 16);
    const bondMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.25,
      depthTest: false,
    });

    const getAtomColor = (type: LatticeAtom['type']) => {
      switch (type) {
        case 'Si': return new THREE.Color('#a0a0a0');
        case 'C': return new THREE.Color('#FFD51E');
        case 'I': return new THREE.Color('#ff4444');
      }
    };

    // Create bond material
    const materialMap = {
      SiSi: new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.3 }),
      SiC: new THREE.LineBasicMaterial({ color: 0xFFD51E, transparent: true, opacity: 0.5 }),
      SiI: new THREE.LineBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.4 }),
    };

    // Process each lattice point
    for (let z = 0; z < LATTICE_COUNT; z++) {
      for (let x = 0; x < LATTICE_COUNT; x++) {
        for (let y = 0; y < LATTICE_COUNT; y++) {
          const point = lattice[z][x][y];

          point.atoms.forEach((atom) => {
            const atomMesh = new THREE.Mesh(
              atomGeometry,
              new THREE.MeshStandardMaterial({
                color: getAtomColor(atom.type),
                transparent: true,
                opacity: atom.type === 'Si' ? 0.8 : 0.9,
                roughness: 0.6,
                metalness: 0.1,
              })
            );

            atomMesh.position.set(atom.position[0], atom.position[1], atom.position[2]);
            atomMesh.userData = { type: atom.type, originalPosition: atom.position };
            atomsRef.current.push(atomMesh);
            latticeObjects.push({ type: 'atom', mesh: atomMesh });
          });

          // Add bonds between atoms at same point
          const primaryAtom = point.atoms.find((a) => a.position[0] === x * CELL_SIZE);
          if (primaryAtom) {
            point.atoms.slice(1).forEach((secondaryAtom) => {
              if (
                Math.abs(primaryAtom.position[0] - secondaryAtom.position[0]) < CELL_SIZE / 2 &&
                Math.abs(primaryAtom.position[1] - secondaryAtom.position[1]) < CELL_SIZE / 2 &&
                Math.abs(primaryAtom.position[2] - secondaryAtom.position[2]) < CELL_SIZE / 2
              ) {
                // Check if bond should exist
                const dx = primaryAtom.position[0] - secondaryAtom.position[0];
                const dy = primaryAtom.position[1] - secondaryAtom.position[1];
                const dz = primaryAtom.position[2] - secondaryAtom.position[2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist <= BOND_LENGTH * 1.5) {
                  const bondGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(primaryAtom.position[0], primaryAtom.position[1], primaryAtom.position[2]),
                    new THREE.Vector3(secondaryAtom.position[0], secondaryAtom.position[1], secondaryAtom.position[2]),
                  ]);

                  const bondMaterialType =
                    primaryAtom.type === 'C' ? 'SiC' :
                    secondaryAtom.type === 'C' ? 'SiC' :
                    primaryAtom.type === 'I' ? 'SiI' :
                    secondaryAtom.type === 'I' ? 'SiI' : 'SiSi';

                  const bond = new THREE.Line(bondGeometry, materialMap[bondMaterialType as keyof typeof materialMap] || materialMap['SiSi']);
                  bondsRef.current.push(bond);
                  latticeObjects.push({ type: 'bond', mesh: bond });
                }
              }
            });
          }
        }
      }
    }

    // Ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffd51e, 0.3);
    dirLight2.position.set(-100, -100, -100);
    scene.add(dirLight2);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: rect.height - (e.clientY - rect.top),
      };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', () => {
      // Explode atoms on click
      atomsRef.current.forEach((atom, i) => {
        atom.position.x = atom.userData.originalPosition[0] + (Math.random() - 0.5) * 400;
        atom.position.y = atom.userData.originalPosition[1] + (Math.random() - 0.5) * 400;
        atom.position.z = atom.userData.originalPosition[2] + (Math.random() - 0.5) * 400;
      });
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Auto-rotate
      if (autoRotate) {
        targetRotationRef.current.y = time * 0.3;
        targetRotationRef.current.x = (time * 0.15) % Math.PI * 2 - Math.PI;
      }

      // Smooth rotation
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.05;
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.05;

      // Apply rotation
      scene.rotation.y = rotationRef.current.y;
      scene.rotation.x = rotationRef.current.x;

      // Pulse atoms
      atomsRef.current.forEach((atom, i) => {
        const baseSize = i % 3 === 0 ? 1.0 : 0.9;
        atom.scale.set(
          baseSize + Math.sin(time * 3 + i) * 0.05,
          baseSize + Math.sin(time * 3 + i) * 0.05,
          baseSize + Math.sin(time * 3 + i) * 0.05
        );
      });

      // Mouse interaction: attract atoms towards mouse
      if (mouseRef.current.x > 0) {
        const mouseVector = new THREE.Vector3(
          mouseRef.current.x * 2 - width / 2,
          mouseRef.current.y * 2 - height / 2,
          0
        );
        atomsRef.current.forEach((atom) => {
          const distance = atom.position.distanceTo(new THREE.Vector3(mouseVector.x, mouseVector.y, 0));
          if (distance < 400) {
            atom.position.lerp(new THREE.Vector3(mouseVector.x, mouseVector.y, atom.position.z), 0.01);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      atomsRef.current = [];
      bondsRef.current = [];
    };
  }, [autoRotate]);

  return (
    <div
      ref={mountRef}
      className={cn(
        'absolute inset-0 z-[-1] pointer-events-auto',
        className
      )}
    />
  );
}
