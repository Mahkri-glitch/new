'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const officers = [
  {
    name: 'Leeann Louis',
    role: 'President',
    bio: 'Leading SCRO @ UCF with a passion for building community and opening doors for students to explore the semiconductor industry.',
    photo: '/officer-leeann.png',
  },
  {
    name: 'Maahir Rani',
    role: 'Vice President',
    bio: 'Driving operations and helping shape the vision for SCRO\'s events, partnerships, and member experience.',
    photo: '/officer-maahir.png',
  },
  {
    name: 'Mikayla Python',
    role: 'Treasurer',
    bio: 'Managing club finances and ensuring SCRO can bring meaningful resources and opportunities to every member.',
    photo: '/officer-mikayla.png',
  },
  {
    name: 'Mohannad Kamyani',
    role: 'Secretary',
    bio: 'Keeping SCRO organized and members informed, from meeting notes to communications and club records.',
    photo: '/officer-mohannad.png',
  },
];

const roleBadgeColor: Record<string, string> = {
  President: 'bg-[#FFD51E] text-black',
  'Vice President': 'bg-[rgba(255,213,30,0.15)] text-[#FFD51E] border border-[rgba(255,213,30,0.4)]',
  Treasurer: 'bg-[rgba(255,213,30,0.15)] text-[#FFD51E] border border-[rgba(255,213,30,0.4)]',
  Secretary: 'bg-[rgba(255,213,30,0.15)] text-[#FFD51E] border border-[rgba(255,213,30,0.4)]',
};

export default function OfficersPage() {
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
            SCRO @ UCF — 2025–2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Meet the Officers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-[rgba(255,255,255,0.55)] text-lg max-w-xl mx-auto"
          >
            The people building SCRO from the ground up — connecting students with the semiconductor industry at UCF.
          </motion.p>
        </div>

        {/* Officers grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {officers.map((officer, i) => (
            <motion.div
              key={officer.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0f0f0f] border border-[rgba(255,213,30,0.1)] hover:border-[rgba(255,213,30,0.35)] transition-colors duration-300"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src={officer.photo}
                  alt={officer.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[rgba(0,0,0,0.1)] to-transparent" />

                {/* Role badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[0.65rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${roleBadgeColor[officer.role]}`}>
                    {officer.role}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pt-4 pb-6 flex flex-col gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white">{officer.name}</h2>
                <p className="text-[0.8rem] text-[rgba(255,255,255,0.5)] leading-relaxed">{officer.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
