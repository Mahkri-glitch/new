'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { navLinks } from '@/lib/data';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = navLinks.filter((l) => l.label !== 'Home');

  return (
    <>
      {/* Desktop */}
      <header className="fixed top-0 inset-x-0 z-50 hidden sm:block border-b border-scro-gold/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="SCRO homepage" className="flex items-center gap-3 group">
            <Image src="/scro-logo.png" alt="SCRO @ UCF" width={28} height={28} className="rounded transition-transform group-hover:scale-110" />
            <span className="text-sm font-bold tracking-widest text-white group-hover:text-scro-gold transition-colors uppercase">SCRO</span>
          </Link>

          <nav className="flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-semibold text-zinc-400 hover:text-scro-gold transition-all hover:scale-105">
                {link.label}
              </Link>
            ))}
            <a 
              href="https://discord.gg/F9PTT3FJFS" 
              target="_blank" 
              rel="noreferrer noopener" 
              className="text-sm font-bold text-black bg-scro-gold px-5 py-2 rounded-full hover:bg-scro-gold-dark transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,201,4,0.3)] hover:shadow-[0_0_20px_rgba(255,201,4,0.5)]"
            >
              Join Discord
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile */}
      <header className="fixed top-0 inset-x-0 z-50 sm:hidden border-b border-scro-gold/10 bg-black/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/scro-logo.png" alt="SCRO @ UCF" width={24} height={24} className="rounded" />
            <span className="text-sm font-bold tracking-widest text-white uppercase">SCRO</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="text-scro-gold hover:text-white p-2 -mr-2 transition-colors"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <nav className="border-t border-scro-gold/10 bg-black/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-zinc-300 hover:text-scro-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/F9PTT3FJFS"
              target="_blank"
              rel="noreferrer noopener"
              className="text-base font-bold text-black bg-scro-gold px-4 py-3 rounded-xl hover:bg-scro-gold-dark transition-all text-center mt-2 shadow-[0_0_15px_rgba(255,201,4,0.2)]"
            >
              Join Discord
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
