import { CheckIcon } from '@/lib/icons';
import { checklistItems } from '@/lib/data';

export function NewMemberPreview() {
  return (
    <section className="py-20 sm:py-32 border-b border-white/5 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-6">New to SCRO?</h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-md">
              Whether you are just getting started or already interested in semiconductors, SCRO is built to help you learn,
              connect, and grow.
            </p>
            <a href="/new-members" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFD51E] px-8 text-base font-semibold text-black transition-all hover:bg-[#e6c01b] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,213,30,0.3)]">
              Go to New Member Page
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Quick Start Checklist</h3>
            <ul className="space-y-5">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-center gap-4 text-base text-zinc-300">
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
