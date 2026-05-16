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
      className="group cursor-pointer rounded-2xl overflow-hidden border border-scro-gold/10 bg-[#0a0a0a] hover:border-scro-gold/40 transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,201,4,0.15)]"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-black border-b border-scro-gold/10">
        <Image
          src={item.src}
          alt={item.event}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-base font-bold text-white group-hover:text-scro-gold transition-colors">{item.event}</h3>
          <span className="text-[10px] font-bold text-scro-gold bg-scro-gold/10 px-2 py-0.5 rounded border border-scro-gold/20 uppercase tracking-widest whitespace-nowrap">{item.date}</span>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed group-hover:text-zinc-300 transition-colors">{item.caption}</p>
      </div>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-3xl overflow-hidden border border-scro-gold/20 bg-[#050505] flex flex-col max-h-[90vh] shadow-[0_0_100px_rgba(255,201,4,0.1)]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-scro-gold/10 bg-[#0a0a0a]">
          <span className="text-sm font-bold text-scro-gold tracking-widest uppercase">{item.event}</span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative w-full flex-grow bg-black min-h-[300px]">
          <Image src={item.src} alt={item.event} fill className="object-contain" />
        </div>

        <div className="px-8 py-6 border-t border-scro-gold/10 bg-[#0a0a0a]">
          <p className="text-[10px] font-bold text-scro-gold mb-3 uppercase tracking-[0.2em]">{item.date}</p>
          <p className="text-base text-zinc-300 leading-relaxed max-w-3xl font-medium">{item.caption}</p>
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
      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-scro-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-6 uppercase italic text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Gallery
          </h1>
          <div className="h-1 w-24 bg-scro-gold mb-8" />
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed font-medium">
            A look back at our events, meetings, and moments from the <span className="text-scro-gold">SCRO @ UCF</span> community.
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
