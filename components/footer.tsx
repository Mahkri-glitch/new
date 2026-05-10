import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12 -mx-4 -sm:mx-6 -lg:mx-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/scro-logo.png" alt="SCRO @ UCF logo" width={28} height={28} className="rounded" />
              <p className="font-semibold text-zinc-100 text-sm tracking-wide">SCRO @ UCF</p>
            </div>
            <p className="text-none text-sm text-zinc-500 leading-relaxed">
              Semiconductor Career Readiness Organization helping students explore technical and professional pathways at the University of Central Florida.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100 mb-5">Resources</p>
            <ul className="space-y-4 text-sm text-zinc-500">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-100 mb-5">Connect</p>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>
                <a href="mailto:scro.ucf@gmail.com" className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="https://discord.gg/hFK2s8eh" target="_blank" rel="noreferrer noopener" className="hover:text-white transition-colors">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} SCRO @ UCF. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}