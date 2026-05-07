'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    event: 'GBM 1 — First General Body Meeting',
    date: 'March 24, 2026',
  },
  {
    id: 2,
    src: '/gallery-gbm2.png',
    caption: 'GBM 2 brought the energy — officer elections for 2026–27 were held, a SkyWater industry speaker joined us, we ran a semiconductor pitch competition, and closed it all out with free pizza.',
    event: 'GBM 2 — Elections & Speaker Night',
    date: 'April 14, 2026',
  },
];

function MacOSWindow({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden border border-[rgba(255,213,30,0.12)] bg-[#111] shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:border-[rgba(255,213,30,0.35)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.8)] transition-all duration-300"
    >
      {/* macOS title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-[rgba(255,255,255,0.06)]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.5)]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.5)]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
        <span className="ml-auto text-[0.65rem] text-[rgba(255,255,255,0.35)] font-medium tracking-wide truncate max-w-[160px]">
          {item.event}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <Image
          src={item.src}
          alt={item.event}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Click hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <span className="text-white text-xs font-semibold tracking-widest uppercase bg-[rgba(0,0,0,0.6)] px-4 py-2 rounded-full border border-[rgba(255,213,30,0.4)]">
            View Caption
          </span>
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2.5 bg-[#161616] border-t border-[rgba(255,255,255,0.05)]">
        <p className="text-[0.7rem] text-[rgba(255,213,30,0.6)] font-medium">{item.date}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl rounded-xl overflow-hidden border border-[rgba(255,213,30,0.2)] shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
        >
          {/* macOS title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[rgba(255,255,255,0.08)]">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-125 transition-all" aria-label="Close" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-auto text-[0.7rem] text-[rgba(255,255,255,0.45)] font-medium">{item.event}</span>
            <button onClick={onClose} className="ml-3 text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-video bg-black">
            <Image src={item.src} alt={item.event} fill className="object-cover" />
          </div>

          {/* Caption */}
          <div className="bg-[#111] px-6 py-5">
            <p className="text-[0.7rem] text-[#FFD51E] uppercase tracking-widest font-bold mb-2">{item.date}</p>
            <p className="text-[rgba(255,255,255,0.75)] text-sm leading-relaxed">{item.caption}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GalleryPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-transparent text-white pt-28 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#FFD51E] text-xs uppercase tracking-[0.25em] font-bold mb-4"
          >
            SCRO @ UCF
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-[rgba(255,255,255,0.55)] text-lg max-w-xl mx-auto"
          >
            A look back at our events, meetings, and moments from the SCRO community.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryItems.map((item) => (
            <MacOSWindow key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      </main>

      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}

      <Footer />
    </>
  );
}
