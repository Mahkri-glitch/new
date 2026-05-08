'use client';

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
  President: 'bg-[#FFD51E] text-black border border-[#FFD51E]/20',
  'Vice President': 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
  Treasurer: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
  Secretary: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
};

export default function OfficersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 relative z-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Meet the Officers
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            The people building SCRO from the ground up — connecting students with the semiconductor industry at UCF.
          </p>
        </div>

        {/* Officers grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {officers.map((officer) => (
            <div
              key={officer.name}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 shadow-xl"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] overflow-hidden p-2 pb-0">
                <div className="relative w-full h-full rounded-t-xl overflow-hidden">
                  <Image
                    src={officer.photo}
                    alt={officer.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Role badge */}
                <div className="absolute top-5 left-5">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm ${roleBadgeColor[officer.role]}`}>
                    {officer.role}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">{officer.name}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{officer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
