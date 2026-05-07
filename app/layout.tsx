import type { Metadata } from 'next';

import { DottedSurface } from '@/components/ui/dotted-surface';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCRO @ UCF',
  description: 'Semiconductor Career Readiness Organization at the University of Central Florida.',
  icons: {
    icon: '/scro-logo.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DottedSurface />
        {children}
      </body>
    </html>
  );
}
