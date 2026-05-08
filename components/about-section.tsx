import { missionCards } from '@/lib/data';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32 border-b border-white/5 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">About SCRO @ UCF</h2>
          <p className="mt-6 max-w-3xl text-lg text-zinc-400 leading-relaxed">
            SCRO @ UCF is a student organization for students interested in semiconductors and related technology fields. We
            help members build technical awareness, industry familiarity, and professional readiness. Interdisciplinary
            students are welcome, beginners are welcome, and we support exploration across microelectronics, devices,
            fabrication, materials, and career pathways.
          </p>
        </div>

        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl">
          <p className="text-zinc-200 font-medium text-lg leading-relaxed">
            Our mission is to help students explore and prepare for opportunities in the semiconductor industry through
            education, professional development, and community.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {missionCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div className="mb-6 text-zinc-300">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="h-6 w-6" />
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
