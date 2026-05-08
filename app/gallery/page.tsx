'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  event: string;
  date: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/gallery-gbm1.png',
    caption: 'Our first General Body Meeting — an industry speaker from UCF presented on Semiconductor Education and Readiness Pathways, introducing students to degree programs, research labs, and career tracks in the semiconductor space.',
    event: 'First General Body Meeting',
    date: 'March 24, 2026',
  },
  {
    id: 2,
    src: '/gallery-gbm2.png',
    caption: 'GBM 2 brought the energy — officer elections for 2026–27 were held, a SkyWater industry speaker joined us, we ran a semiconductor pitch competition, and closed it all out with free pizza.',
    event: 'Elections & Speaker Night',
    date: 'April 14, 2026',
  },
];

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/20 transition-all shadow-xl flex flex-col"
    >
      <div className="relative w-full aspect-video overflow-hidden p-2 pb-0">
        <div className="relative w-full h-full rounded-t-xl overflow-hidden">
          <Image
            src={item.src}
            alt={item.event}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-lg font-bold text-white tracking-tight">{item.event}</h3>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">{item.caption}</p>
        <div className="mt-auto">
          <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <span className="text-sm font-bold text-white tracking-wide">{item.event}</span>
          <button onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full flex-grow bg-black/50 min-h-[300px]">
          <Image src={item.src} alt={item.event} fill className="object-contain" />
        </div>

        <div className="px-8 py-6 bg-[#0f0f0f] border-t border-white/5">
          <p className="text-xs font-bold text-[#FFD51E] mb-3 uppercase tracking-widest">{item.date}</p>
          <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">{item.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 relative z-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Gallery
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            A look back at our events, meetings, and moments from the SCRO community.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      </main>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}

      <Footer />
    </>
  );
}
