'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export function MolecularLattice({
  className,
  autoRotate = true,
}: {
  className?: string;
  autoRotate?: boolean;
} = {}) {
  // Test version: just return a visible colored div to test mounting
  return (
    <div
      className={cn(
        'fixed inset-0 z-[10] bg-[#00ff00]', // Bright green background
        className
      )}
    />
  );
}