'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type LatticeAtom = { position: [number, number, number]; type: 'Si' | 'C' | 'I' };

const LATTICE_COUNT = 10;
const CELL_SIZE = 3.2;
const ATOM_RADIUS = 0.9;

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

        atoms[z][x][y].push({ position: [x * CELL_SIZE, y * CELL_SIZE, z * CELL_SIZE], type: 'Si' });

        if (isTetra) {
          atoms[z][x][y].push({ position: [x * CELL_SIZE + tetraOffset, y * CELL_SIZE + tetraOffset, z * CELL_SIZE + tetraOffset], type: 'Si' });
        }

        if (Math.random() < 0.06 && z > 1 && z < LATTICE_COUNT - 2) {
          const tetraPos = [x * CELL_SIZE + tetraOffset, y * CELL_SIZE + tetraOffset, z * CELL_SIZE + tetraOffset];
          if (!atoms[z][x][y].some((a) =>
            Math.abs(a.position[0] - tetraPos[0]) < CELL_SIZE / 2.5 &&
            Math.abs(a.position[1] - tetraPos[1]) < CELL_SIZE / 2.5 &&
            Math.abs(a.position[2] - tetraPos[2]) < CELL_SIZE / 2.5
          )) {
            atoms[z][x][y].push({ position: tetraPos, type: 'C' });
          }
        }

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
    scene.fog = new THREE.Fog(0x020202, 180, 500);

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 7000);
    camera.position.set(0, 160, 520);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x020202, 0);
    container.appendChild(renderer.domElement);

    const lattice = generateLattice();
    latticeRef.current = lattice as unknown as any;
    const atomGeometry = new THREE.SphereGeometry(ATOM_RADIUS, 12, 12);

    // Main bright light
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(100, 100, 100);
    scene.add(mainLight);

    // Warm gold light from back-left
    const goldLight = new THREE.PointLight(0xFFD51E, 2.5, 700);
    goldLight.position.set(-80, -100, -80);
    scene.add(goldLight);

    // Cool blue light from front-right
    const blueLight = new THREE.PointLight(0x66aaff, 1.5, 700);
    blueLight.position.set(120, 80, 120);
    scene.add(blueLight);

    // Side lighting for depth
    const sideLight = new THREE.DirectionalLight(0xccddff, 0.5);
    sideLight.position.set(-180, 150, 50);
    scene.add(sideLight);

    const ambient = new THREE.AmbientLight(0x555566, 0.7);
    scene.add(ambient);

    const pointBlue = new THREE.PointLight(0x8899aa, 0.6, 600);
    pointBlue.position.set(100, -150, 100);
    scene.add(pointBlue);

    const materials = new Map<string, THREE.MeshStandardMaterial>();

    const getAtomMaterial = (type: LatticeAtom['type'], i: number) => {
      const key = `${type}-${i % 2}`;
      if (materials.has(key)) {
        return materials.get(key)!;
      }

      const isEven = i % 2 === 0;
      let emissiveHex = 0x151515;
      let emissiveIntensity = 0.25;
      let baseColorHex = isEven ? 0xd5d5d5 : 0xa5a5a5;
      let baseOpacity = 0.92;

      if (type === 'C') {
        emissiveHex = 0x665500;
        emissiveIntensity = 0.8;
        baseColorHex = 0xFFE040;
        baseOpacity = 0.98;
      } else if (type === 'I') {
        emissiveHex = 0x770000;
        emissiveIntensity = 0.6;
        baseColorHex = 0xff8888;
        baseOpacity = 0.94;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: baseColorHex,
        transparent: true,
        opacity: baseOpacity,
        roughness: 0.15,
        metalness: type === 'C' ? 0.9 : 0.1,
        emissive: emissiveHex,
        emissiveIntensity,
      });
      materials.set(key, mat);
      return mat;
    };

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: rect.height - (e.clientY - rect.top),
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

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
        targetRotationRef.current.y = time * 0.2;
        targetRotationRef.current.x = (time * 0.1) % (Math.PI * 2) - Math.PI;
      }

      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.02;
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.02;

      scene.rotation.y = rotationRef.current.y;
      scene.rotation.x = rotationRef.current.x;

      atomsRef.current.forEach((atom, i) => {
        atom.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.04);
      });

      if (mouseRef.current.x > 0) {
        const mousePos = new THREE.Vector3(mouseRef.current.x * 2 - width / 2, mouseRef.current.y * 2 - height / 2, 0);
        atomsRef.current.forEach((atom) => {
          const dist = atom.position.distanceTo(mousePos);
          if (dist < 400) {
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
        'absolute inset-0 z-0',
        className
      )}
    />
  );
}
