'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from '@/lib/icons';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-[rgba(255,213,30,0.25)] bg-black/92 backdrop-blur'
          : 'border-transparent bg-[rgba(0,0,0,0.45)] backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="SCRO homepage">
          <Image src="/scro-logo.svg" alt="SCRO @ UCF logo" width={36} height={36} className="rounded-md border border-[rgba(255,213,30,0.5)]" />
          <span className="text-sm font-bold tracking-wide text-[var(--scro-white)]">SCRO @ UCF</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-sm font-medium text-[rgba(255,255,255,0.92)] transition hover:text-[var(--scro-gold)]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--scro-gold)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/#contact">Join SCRO</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md p-2 text-[var(--scro-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--scro-gold)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-[rgba(255,213,30,0.2)] bg-black md:hidden"
          >
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--scro-white)] hover:bg-[rgba(255,213,30,0.12)]"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/#contact" className="w-full" onClick={() => setOpen(false)}>
                Join SCRO
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
