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
      className="group cursor-pointer rounded-xl overflow-hidden border border-zinc-800 bg-[#111] hover:border-zinc-700 transition-colors flex flex-col"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <Image
          src={item.src}
          alt={item.event}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-sm font-semibold text-zinc-100">{item.event}</h3>
          <span className="text-xs font-medium text-zinc-500 whitespace-nowrap">{item.date}</span>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{item.caption}</p>
      </div>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-xl overflow-hidden border border-zinc-800 bg-black flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#111]">
          <span className="text-sm font-medium text-zinc-300">{item.event}</span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full flex-grow bg-zinc-950 min-h-[300px]">
          <Image src={item.src} alt={item.event} fill className="object-contain" />
        </div>

        <div className="px-6 py-5 border-t border-zinc-800 bg-[#111]">
          <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">{item.date}</p>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">{item.caption}</p>
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
      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Gallery
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            A look back at our events, meetings, and moments from the SCRO community.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
