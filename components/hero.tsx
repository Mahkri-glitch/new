import Image from 'next/image';

const badges = ['Student-Led', 'Career-Focused', 'Semiconductor Community'];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <Image src="/scro-logo.png" alt="SCRO @ UCF logo" width={32} height={32} className="rounded-md" />
              <span className="text-sm font-semibold tracking-wide text-zinc-400">SCRO @ UCF</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Semiconductor Career Readiness Organization
            </h1>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
              A student organization focused on semiconductor industry exposure, technical learning, professional development,
              and career readiness at the University of Central Florida.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#contact" className="inline-flex h-11 items-center justify-center rounded-lg bg-[#FFD51E] px-8 text-sm font-semibold text-black transition-colors hover:bg-[#e6c01b]">
                Join SCRO
              </a>
              <a href="#events" className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-8 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white">
                View Events
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-full aspect-square relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <Image
              src="/scro-logo.png"
              alt="SCRO @ UCF"
              fill
              className="object-cover opacity-90"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
