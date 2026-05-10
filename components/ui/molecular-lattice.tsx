'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type AtomPosition = [number, number, number];
type LatticeAtom = { position: AtomPosition; type: 'Si' | 'C' | 'I' };

const LATTICE_COUNT = 10;
const CELL_SIZE = 3.5;
const ATOM_RADIUS = 1.0;

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

        // Silicon atoms
        atoms[z][x][y].push({ position: [x * CELL_SIZE, y * CELL_SIZE, z * CELL_SIZE], type: 'Si' });

        if (isTetra) {
          atoms[z][x][y].push({ position: [x * CELL_SIZE + tetraOffset, y * CELL_SIZE + tetraOffset, z * CELL_SIZE + tetraOffset], type: 'Si' });
        }

        // Carbon doping (gold - SCRO!)
        if (Math.random() < 0.05 && z > 1 && z < LATTICE_COUNT - 2) {
          const tetraPos = [x * CELL_SIZE + tetraOffset, y * CELL_SIZE + tetraOffset, z * CELL_SIZE + tetraOffset];
          if (!atoms[z][x][y].some((a) =>
            Math.abs(a.position[0] - tetraPos[0]) < CELL_SIZE / 2.5 &&
            Math.abs(a.position[1] - tetraPos[1]) < CELL_SIZE / 2.5 &&
            Math.abs(a.position[2] - tetraPos[2]) < CELL_SIZE / 2.5
          )) {
            atoms[z][x][y].push({ position: tetraPos, type: 'C' });
          }
        }

        // Red interstitial defects
        if (Math.random() < 0.01 && z > 1 && z < LATTICE_COUNT - 2) {
          const defectPos = [x * CELL_SIZE + 1.2, y * CELL_SIZE + 1.2, z * CELL_SIZE + 1.2];
          if (!atoms[z][x][y].some((a) =>
            Math.abs(a.position[0] - defectPos[0]) < 0.8 &&
            Math.abs(a.position[1] - defectPos[1]) < 0.8 &&
            Math.abs(a.position[2] - defectPos[2]) < 0.8
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

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 200, 550);

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 8000);
    camera.position.set(0, 180, 550);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x050505, 0);
    container.appendChild(renderer.domElement);

    const lattice = generateLattice();
    latticeRef.current = lattice as unknown as any;
    const atomGeometry = new THREE.SphereGeometry(ATOM_RADIUS, 10, 10);

    // Lighting setup for visibility
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(150, 150, 150);
    scene.add(dirLight);

    const goldLight = new THREE.PointLight(0xFFD51E, 2.0, 800);
    goldLight.position.set(-100, -100, -100);
    scene.add(goldLight);

    const sideLight = new THREE.DirectionalLight(0x6688cc, 0.4);
    sideLight.position.set(-150, 150, 50);
    scene.add(sideLight);

    const ambient = new THREE.AmbientLight(0x444455, 0.6);
    scene.add(ambient);

    const pointLight2 = new THREE.PointLight(0x8888ff, 0.5, 700);
    pointLight2.position.set(100, -150, 100);
    scene.add(pointLight2);

    // Materials cache
    const materials = new Map<string, THREE.MeshStandardMaterial>();

    const getAtomMaterial = (type: LatticeAtom['type'], i: number) => {
      const key = `${type}-${i % 2}`;
      if (materials.has(key)) {
        return materials.get(key)!;
      }

      const isEven = i % 2 === 0;

      let emissive = 0x1a1a1a;
      let emissiveIntensity = 0.3;
      let baseColorHex = 0xe0e0e0;

      if (type === 'C') {
        emissive = 0x554400;
        emissiveIntensity = 0.7;
        baseColorHex = 0xFFE045;
      } else if (type === 'I') {
        emissive = 0x660000;
        emissiveIntensity = 0.5;
        baseColorHex = 0xff7777;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: baseColorHex,
        transparent: true,
        opacity: type === 'C' ? 0.98 : 0.9,
        roughness: 0.2,
        metalness: type === 'C' ? 0.9 : 0.15,
        emissive,
        emissiveIntensity,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      });
      materials.set(key, mat);
      return mat;
    };

    // Create atoms
    for (let z = 0; z < LATTICE_COUNT; z++) {
      for (let x = 0; x < LATTICE_COUNT; x++) {
        for (let y = 0; y < LATTICE_COUNT; y++) {
          (lattice[z][x][y] as unknown as LatticeAtom[]).forEach((atom) => {
            const mat = getAtomMaterial(atom.type, atom.position[0] + atom.position[1] + atom.position[2]);
            const mesh = new THREE.Mesh(atomGeometry, mat);
            mesh.position.set(...atom.position);
            atomsRef.current.push(mesh);
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
        atom.position.x += (Math.random() - 0.5) * 350;
        atom.position.y += (Math.random() - 0.5) * 350;
        atom.position.z += (Math.random() - 0.5) * 350;
      });
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (autoRotate) {
        targetRotationRef.current.y = time * 0.22;
        targetRotationRef.current.x = (time * 0.11) % (Math.PI * 2) - Math.PI;
      }

      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.025;
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.025;

      scene.rotation.y = rotationRef.current.y;
      scene.rotation.x = rotationRef.current.x;

      // Subtle breathing
      atomsRef.current.forEach((atom, i) => {
        atom.scale.setScalar(1 + Math.sin(time * 1.8 + i) * 0.03);
      });

      // Mouse attraction
      if (mouseRef.current.x > 0) {
        const mousePos = new THREE.Vector3(mouseRef.current.x * 2 - width / 2, mouseRef.current.y * 2 - height / 2, 0);
        atomsRef.current.forEach((atom: any) => {
          const dist = atom.position.distanceTo(mousePos);
          if (dist < 350) {
            atom.position.lerp(mousePos, 0.003);
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
        'fixed inset-0 z-[-1]',
        className
      )}
    />
  );
}
