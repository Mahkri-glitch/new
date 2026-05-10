"use client";
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

// Define the types and data needed for the gallery
export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'First GBM - March 2026',
    description: 'Our first general body meeting introducing the club and its mission.',
    imageUrl: '/gallery-gbm1.png',
    date: 'March 24, 2026'
  },
  {
    id: '2',
    title: 'Second GBM - April 2026',
    description: 'Our second general body meeting with guest speakers and activities.',
    imageUrl: '/gallery-gbm2.png',
    date: 'April 14, 2026'
  }
];

// Simple component for displaying gallery items
function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer rounded-lg border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-zinc-100 mb-2">{item.title}</h3>
        <p className="text-sm text-zinc-400">{item.description}</p>
        <p className="text-xs text-zinc-500 mt-2">{item.date}</p>
      </div>
    </div>
  );
}

// Simple lightbox component for displaying selected item
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative max-w-4xl max-h-[80vh]">
        <button onClick={onClose} className="absolute top-2 right-2 text-zinc-400 hover:text-white">
          ✕
        </button>
        <img src={item.imageUrl} alt={item.title} className="rounded-lg border border-zinc-800" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
          <h3 className="font-semibold text-zinc-100 mb-2">{item.title}</h3>
          <p className="text-sm text-zinc-400">{item.description}</p>
          <p className="text-xs text-zinc-500">{item.date}</p>
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
      <main className="min-h-screen text-white pt-32 pb-24 px-6">
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
          {galleryItems.map(item => (
            <GalleryCard key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      </main>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </>
  );
}