import Image from 'next/image';

const badges = ['Student-Led', 'Career-Focused', 'Semiconductor Community'];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden border-b border-white/5">
      {/* Subtle modern developer grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Image src="/scro-logo.png" alt="SCRO @ UCF logo" width={20} height={20} className="rounded-sm" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">Welcome to SCRO @ UCF</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 max-w-4xl leading-[1.1]">
            Semiconductor Career Readiness <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD51E] to-[#FFB000]">Organization</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            A student-led community focused on semiconductor industry exposure, technical learning, professional development,
            and career readiness at the University of Central Florida.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
            <a href="#contact" className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-[#FFD51E] px-8 text-base font-semibold text-black transition-all hover:bg-[#e6c01b] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,213,30,0.3)]">
              Join SCRO
            </a>
            <a href="#events" className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:text-white">
              View Events
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {badges.map((badge) => (
              <span key={badge} className="inline-flex items-center rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
