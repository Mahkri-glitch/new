import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
        <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]" />
        {children}
      </body>
    </html>
  );
}
