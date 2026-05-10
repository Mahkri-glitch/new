import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import { Footer } from '@/components/footer';

// Define the types and data needed for the officers page
export type Officer = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};

const officers: Officer[] = [
  {
    name: 'Alex Johnson',
    role: 'President',
    photo: '/alex.jpg',
    bio: 'Senior Electrical Engineering student with experience in semiconductor fabrication.'
  },
  {
    name: 'Maria Garcia',
    role: 'Vice President',
    photo: '/maria.jpg',
    bio: 'Junior Materials Science student focused on semiconductor materials research.'
  },
  {
    name: 'David Chen',
    role: 'Treasurer',
    photo: '/david.jpg',
    bio: 'Sophomore Electrical Engineering student managing club finances and budgets.'
  },
  {
    name: 'Sarah Wilson',
    role: 'Secretary',
    photo: '/sarah.jpg',
    bio: 'Freshman Physics student handling club communications and documentation.'
  }
];

// Define the role-based color mapping
const roleBadgeColor: Record<string, string> = {
  President: 'bg-blue-500',
  'Vice President': 'bg-green-500',
  Treasurer: 'bg-yellow-500',
  Secretary: 'bg-purple-500',
  'Public Relations': 'bg-pink-500',
  'Event Coordinator': 'bg-orange-500',
  'Technical Lead': 'bg-red-500',
  'Outreach Coordinator': 'bg-indigo-500'
};

export default function OfficersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen text-white pt-32 pb-24 px-6">
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