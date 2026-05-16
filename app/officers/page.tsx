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
  President: 'bg-scro-gold text-black shadow-[0_0_15px_rgba(255,201,4,0.4)]',
  'Vice President': 'bg-black/50 text-scro-gold border border-scro-gold/30 backdrop-blur-md',
  Treasurer: 'bg-black/50 text-scro-gold border border-scro-gold/30 backdrop-blur-md',
  Secretary: 'bg-black/50 text-scro-gold border border-scro-gold/30 backdrop-blur-md',
};

export default function OfficersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-scro-gold/5 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-20 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter mb-6 uppercase italic text-white">
            Meet the Officers
          </h1>
          <div className="h-1.5 w-32 bg-scro-gold mb-8" />
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed font-medium">
            The people building <span className="text-white font-bold tracking-widest uppercase">SCRO</span> from the ground up — connecting students with the semiconductor industry at <span className="text-scro-gold">UCF</span>.
          </p>
        </div>

        {/* Officers grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {officers.map((officer) => (
            <div
              key={officer.name}
              className="group flex flex-col rounded-2xl overflow-hidden bg-[#0a0a0a] border border-scro-gold/10 transition-all duration-500 hover:border-scro-gold/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(255,201,4,0.2)] will-change-transform"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] bg-black border-b border-scro-gold/10 overflow-hidden">
                <Image
                  src={officer.photo}
                  alt={officer.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Role badge */}
                <div className="absolute top-5 left-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${roleBadgeColor[officer.role]}`}>
                    {officer.role}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-white group-hover:text-scro-gold transition-colors">{officer.name}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-medium">{officer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
