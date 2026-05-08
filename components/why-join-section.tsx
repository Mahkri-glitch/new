import { benefits } from '@/lib/data';

export function WhyJoinSection() {
  return (
    <section className="py-20 sm:py-32 border-b border-white/5 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Why Join SCRO?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div className="mb-6 text-zinc-300">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
