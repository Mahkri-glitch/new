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
      <header className="fixed top-0 inset-x-0 z-50 hidden sm:block border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="SCRO homepage" className="flex items-center gap-3">
            <Image src="/scro-logo.png" alt="SCRO @ UCF" width={24} height={24} className="rounded" />
            <span className="text-sm font-semibold tracking-wide text-zinc-100">SCRO</span>
          </Link>

          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <a href="https://discord.gg/F9PTT3FJFS" target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-black bg-[#FFD51E] px-5 py-2 rounded-full hover:bg-[#e6c01b] transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,213,30,0.2)]">
              Join Discord
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile */}
      <header className="fixed top-0 inset-x-0 z-50 sm:hidden border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/scro-logo.png" alt="SCRO @ UCF" width={24} height={24} className="rounded" />
            <span className="text-sm font-semibold tracking-wide text-zinc-100">SCRO</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="text-zinc-400 hover:text-white p-2 -mr-2"
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <nav className="border-t border-white/5 bg-[#050505] px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/F9PTT3FJFS"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-semibold text-black bg-[#FFD51E] px-4 py-3 rounded-full hover:bg-[#e6c01b] transition-colors inline-block text-center mt-2 shadow-[0_0_15px_rgba(255,213,30,0.2)]"
            >
              Join Discord
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
