import type { Metadata } from 'next';

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
        <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]" />
        {children}
      </body>
    </html>
  );
}
