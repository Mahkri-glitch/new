'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import * as THREE from 'three';

type AtomPosition = [number, number, number];
type LatticeAtom = { position: AtomPosition; type: 'Si' | 'C' | 'I' };

const LATTICE_COUNT = 5; // Subtle lattice count for performance and clarity
const CELL_SIZE = 3.5;
const ATOM_RADIUS = 0.4;

function generateLattice(): LatticeAtom[][][] {
  const atoms: any[][][][] = [];

  for (let z = 0; z < LATTICE_COUNT; z++) {
    atoms[z] = [];
    for (let x = 0; x < LATTICE_COUNT; x++) {
      atoms[z][x] = [];
      for (let y = 0; y < LATTICE_COUNT; y++) {
        atoms[z][x][y] = [];
        const tetraOffset = CELL_SIZE / 4;
        const isTetra = (x + y + z) % 2 === 0;

        // Silicon atoms (lattice points) - diamond cubic structure
        atoms[z][x][y].push({ position: [x * CELL_SIZE, y * CELL_SIZE, z * CELL_SIZE], type: 'Si' });

        if (isTetra) {
          atoms[z][x][y].push({ position: [x * CELL_SIZE + tetraOffset, y * CELL_SIZE + tetraOffset, z * CELL_SIZE + tetraOffset], type: 'Si' });
        }

        // Carbon doping (substitutional - SCRO gold)
        if (Math.random() < 0.02 && z > 0 && z < LATTICE_COUNT - 1) {
          const tetraPos = [x * CELL_SIZE + tetraOffset, y * CELL_SIZE + tetraOffset, z * CELL_SIZE + tetraOffset];
          if (!atoms[z][x][y].some((a) =>
            Math.abs(a.position[0] - tetraPos[0]) < CELL_SIZE / 2.5 &&
            Math.abs(a.position[1] - tetraPos[1]) < CELL_SIZE / 2.5 &&
            Math.abs(a.position[2] - tetraPos[2]) < CELL_SIZE / 2.5
          )) {
            atoms[z][x][y].push({ position: tetraPos, type: 'C' });
          }
        }

        // Interstitial defects (red)
        if (Math.random() < 0.003 && z > 0 && z < LATTICE_COUNT - 1) {
          const defectPos = [x * CELL_SIZE + 1.2, y * CELL_SIZE + 1.2, z * CELL_SIZE + 1.2];
          if (!atoms[z][x][y].some((a) =>
            Math.abs(a.position[0] - defectPos[0]) < 0.7 &&
            Math.abs(a.position[1] - defectPos[1]) < 0.7 &&
            Math.abs(a.position[2] - defectPos[2]) < 0.7
          )) {
            atoms[z][x][y].push({ position: defectPos, type: 'I' });
          }
        }
      }
    }
  }

  return atoms as unknown as LatticeAtom[][][];
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
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const latticeRef = useRef<any[][][][]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene - optimized for subtle background visualization
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // Very subtle fog for depth perception
    scene.fog = new THREE.Fog(0x000000, 12, 25);

    // Create camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 30);
    camera.position.set(0, 2.5, 7);
    camera.lookAt(0, 0, 0);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Add lighting for soft, scientific visualization
    // Very soft ambient base
    const ambientLight = new THREE.AmbientLight(0x080808, 0.2);
    scene.add(ambientLight);

    // Main soft light
    const mainLight = new THREE.DirectionalLight(0xe0e0e0, 0.3);
    mainLight.position.set(1, 1.5, 1);
    scene.add(mainLight);

    // Cool fill light
    const fillLight = new THREE.DirectionalLight(0xc0d0ff, 0.15);
    fillLight.position.set(-1, 1, -1);
    scene.add(fillLight);

    // Subtle rim light
    const rimLight = new THREE.DirectionalLight(0xf0f0f0, 0.1);
    rimLight.position.set(0, 0, 1.5);
    scene.add(rimLight);

    // Generate lattice
    const lattice = generateLattice();
    latticeRef.current = lattice as unknown as any;
    const atomGeometry = new THREE.SphereGeometry(ATOM_RADIUS, 6, 6);

    // Materials cache
    const materials = new Map<string, THREE.MeshStandardMaterial>();

    const getAtomMaterial = (type: LatticeAtom['type'], i: number) => {
      const key = `${type}-${i % 3}`;
      if (materials.has(key)) {
        return materials.get(key)!;
      }

      let baseColorHex = 0x909090;
      let emissiveHex = 0x050505;
      let emissiveIntensity = 0.06;
      let opacity = 0.7;
      let metalness = 0.05;
      let roughness = 0.4;

      if (type === 'C') {
        // Carbon doping - visible but subtle SCRO gold
        baseColorHex = 0xFFD700; // Gold
        emissiveHex = 0x100a00;
        emissiveIntensity = 0.1;
        opacity = 0.75;
        metalness = 0.5;
        roughness = 0.25;
      } else if (type === 'I') {
        // Interstitial defects - subtle indication
        baseColorHex = 0xff6b6b; // Soft red
        emissiveHex = 0x080202;
        emissiveIntensity = 0.08;
        opacity = 0.72;
        metalness = 0.02;
        roughness = 0.5;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: baseColorHex,
        transparent: true,
        opacity,
        roughness,
        metalness,
        emissive: emissiveHex,
        emissiveIntensity,
      });
      materials.set(key, mat);
      return mat;
    };

    // Create atoms with proper centering
    const offset = (LATTICE_COUNT * CELL_SIZE) / 2 - CELL_SIZE / 2;

    for (let z = 0; z < LATTICE_COUNT; z++) {
      for (let x = 0; x < LATTICE_COUNT; x++) {
        for (let y = 0; y < LATTICE_COUNT; y++) {
          (lattice[z][x][y] as unknown as LatticeAtom[]).forEach((atom) => {
            const mat = getAtomMaterial(atom.type, atom.position[0] + atom.position[1] + atom.position[2]);
            const mesh = new THREE.Mesh(atomGeometry, mat);
            mesh.position.set(
              atom.position[0] - offset,
              atom.position[1] - offset,
              atom.position[2] - offset
            );
            atomsRef.current.push(mesh);
            scene.add(mesh);
          });
        }
      }
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: rect.height - (e.clientY - rect.top),
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Click to explode
    container.addEventListener('click', () => {
      atomsRef.current.forEach((atom) => {
        atom.position.x += (Math.random() - 0.5) * 2;
        atom.position.y += (Math.random() - 0.5) * 2;
        atom.position.z += (Math.random() - 0.5) * 2;
      });
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (autoRotate) {
        targetRotationRef.current.y = time * 0.06;
        targetRotationRef.current.x = (time * 0.03) % (Math.PI * 2) - Math.PI;
      }

      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.015;
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.015;

      scene.rotation.y = rotationRef.current.y;
      scene.rotation.x = rotationRef.current.x;

      // Very subtle breathing/pulsing
      atomsRef.current.forEach((atom, i) => {
        const pulse = Math.sin(time * 0.5 + i * 0.07) * 0.004;
        atom.scale.setScalar(1 + pulse);
      });

      // Mouse attraction
      if (mouseRef.current.x > 0) {
        const mousePos = new THREE.Vector3(
          (mouseRef.current.x / width - 0.5) * 4,
          (0.5 - mouseRef.current.y / height) * 4,
          0
        );
        atomsRef.current.forEach((atom: any) => {
          const dist = atom.position.distanceTo(mousePos);
          if (dist < 1.8) {
            atom.position.lerp(mousePos, 0.004);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      atomsRef.current = [];
    };
  }, [autoRotate]);

  return (
    <div
      ref={mountRef}
      className={cn(
        'fixed inset-0 z-[-2]', // Behind overlay but visible through it
        className
      )}
    />
  );
}