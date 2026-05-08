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
  President: 'bg-white text-black',
  'Vice President': 'bg-zinc-800 text-zinc-300',
  Treasurer: 'bg-zinc-800 text-zinc-300',
  Secretary: 'bg-zinc-800 text-zinc-300',
};

export default function OfficersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Meet the Officers
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            The people building SCRO from the ground up — connecting students with the semiconductor industry at UCF.
          </p>
        </div>

        {/* Officers grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {officers.map((officer) => (
            <div
              key={officer.name}
              className="flex flex-col rounded-xl overflow-hidden bg-[#111] border border-zinc-800 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] bg-zinc-900 border-b border-zinc-800">
                <Image
                  src={officer.photo}
                  alt={officer.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                {/* Role badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded ${roleBadgeColor[officer.role]}`}>
                    {officer.role}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-2">
                <h2 className="text-base font-semibold text-zinc-100">{officer.name}</h2>
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
