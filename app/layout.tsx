import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MolecularLattice } from '@/components/ui/molecular-lattice';

import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'SCRO @ UCF',
  description: 'Semiconductor Career Readiness Organization at the University of Central Florida.',
  icons: {
    icon: '/scro-logo.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Molecular lattice background - visible on all pages */}
        <MolecularLattice autoRotate={true} className="fixed inset-0 z-[-3]" />
        {/* Readability overlay - very subtle to let molecular lattice show through */}
        <div className="fixed inset-0 z-[-2] bg-black/5"></div>
        {/* Main content area */}
        <div className="relative z-[0] min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}