'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import GradientMenu from '@/components/ui/gradient-menu';
import { navLinks } from '@/lib/data';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = navLinks.filter((l) => l.label !== 'Home');

  return (
    <>
      {/* Desktop: logo pill + gradient menu */}
      <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2 hidden sm:flex items-center gap-3">
        <Link
          href="/"
          aria-label="SCRO homepage"
          className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-[rgba(8,8,8,0.82)] border border-[rgba(255,213,30,0.2)] backdrop-blur-md"
        >
          <Image src="/scro-logo.png" alt="SCRO @ UCF" width={24} height={24} className="rounded-md" />
          <span className="text-[0.65rem] font-black tracking-[0.2em] text-white uppercase">SCRO</span>
        </Link>

        <GradientMenu />
      </header>

      {/* Mobile: floating pill with hamburger */}
      <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2 sm:hidden flex flex-col items-center w-[calc(100%-2rem)]">
        <div
          className={`flex w-full items-center justify-between px-4 py-3 bg-[rgba(8,8,8,0.82)] border border-[rgba(255,213,30,0.2)] backdrop-blur-md transition-[border-radius] duration-300 ${
            isOpen ? 'rounded-2xl' : 'rounded-full'
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src="/scro-logo.png" alt="SCRO @ UCF" width={22} height={22} className="rounded-md" />
            <span className="text-[0.65rem] font-black tracking-[0.2em] text-white uppercase">SCRO</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex h-8 w-8 items-center justify-center text-[rgba(255,255,255,0.75)]"
          >
            {isOpen ? (
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown */}
        <div
          className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[400px] pt-3 opacity-100' : 'pointer-events-none max-h-0 pt-0 opacity-0'
          }`}
        >
          <nav className="flex w-full flex-col items-center gap-2 bg-[rgba(8,8,8,0.82)] border border-[rgba(255,213,30,0.2)] backdrop-blur-md rounded-2xl px-4 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-center text-sm text-[rgba(255,255,255,0.65)] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://discord.gg/F9PTT3FJFS"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 w-full rounded-full bg-[#FFD51E] py-2.5 text-center text-sm font-bold text-black hover:bg-[#CCAA18] transition-colors"
            >
              Join Discord
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
