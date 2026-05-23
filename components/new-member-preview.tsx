import { CheckIcon } from '@/lib/icons';
import { checklistItems } from '@/lib/data';

export function NewMemberPreview() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden border-b border-scro-gold/10 bg-gradient-to-b from-black to-[#0a0800]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              New to <span className="text-scro-gold drop-shadow-[0_0_15px_rgba(255,201,4,0.4)]">SCRO</span>?
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-10 max-w-md">
              Whether you are just getting started or already interested in semiconductors, SCRO is built to help you learn,
              connect, and grow.
            </p>
            <a href="/new-members" className="inline-flex h-12 items-center justify-center rounded-xl bg-scro-gold px-8 text-base font-bold text-black transition-all hover:bg-scro-gold-dark hover:scale-105 shadow-[0_0_20px_rgba(255,201,4,0.3)] hover:shadow-[0_0_30px_rgba(255,201,4,0.5)]">
              Get Started
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-scro-gold/40 to-transparent blur-lg opacity-50" />
            <div className="relative rounded-3xl border border-scro-gold/30 bg-black/80 backdrop-blur-xl p-10 shadow-[0_0_40px_rgba(255,201,4,0.1)]">
              <h3 className="text-sm font-bold text-scro-gold mb-8 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-scro-gold animate-pulse" />
                Quick Start Checklist
              </h3>
              <ul className="space-y-6">
                {checklistItems.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-base text-zinc-200 font-medium">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-scro-gold/20 text-scro-gold border border-scro-gold/30">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
