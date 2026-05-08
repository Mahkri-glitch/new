import { benefits } from '@/lib/data';

export function WhyJoinSection() {
  return (
    <section className="py-20 sm:py-24 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight">Why Join SCRO?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-xl border border-zinc-800 bg-[#111] p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="mb-4 text-zinc-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
