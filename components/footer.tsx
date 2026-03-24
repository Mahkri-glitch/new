import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,213,30,0.35)] bg-black py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/scro-logo.svg" alt="SCRO @ UCF logo" width={36} height={36} />
            <p className="font-semibold text-[var(--scro-white)]">SCRO @ UCF</p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-[rgba(255,255,255,0.75)]">
            Semiconductor Career Readiness Organization helping students explore technical and professional pathways.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--scro-gold)]">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-[rgba(255,255,255,0.85)]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-[var(--scro-gold)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--scro-gold)]">Connect</p>
          <ul className="mt-3 space-y-2 text-sm text-[rgba(255,255,255,0.85)]">
            <li>
              <a href="mailto:scro.ucf@gmail.com" className="hover:text-[var(--scro-gold)]">
                scro.ucf@gmail.com
              </a>
            </li>
            <li>
              <a href="https://discord.gg/hFK2s8eh" target="_blank" rel="noreferrer noopener" className="hover:text-[var(--scro-gold)]">
                Join Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-[rgba(255,255,255,0.6)]">© {new Date().getFullYear()} SCRO @ UCF. All rights reserved.</p>
    </footer>
  );
}
