import { missionCards } from '@/lib/data';

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden border-b border-scro-gold/10">
      {/* Add a subtle gold background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-scro-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_20px_rgba(255,201,4,0.1)]">
            About <span className="text-scro-gold">SCRO @ UCF</span>
          </h2>
          <div className="h-1.5 w-24 bg-scro-gold mx-auto mt-6 mb-8" />
          <p className="mt-8 mx-auto max-w-3xl text-zinc-400 text-xl leading-relaxed font-medium">
            SCRO @ UCF is a premier student organization for those interested in semiconductors and microelectronics. We
            bridge the gap between academia and industry through hands-on learning and professional development.
          </p>
        </div>

        <div className="mb-24 rounded-[2.5rem] border border-scro-gold/20 bg-gradient-to-br from-[#0a0a0a] to-black p-10 sm:p-16 shadow-[0_0_50px_rgba(255,201,4,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-scro-gold shadow-[0_0_20px_rgba(255,201,4,0.4)]" />
          <p className="text-white text-xl md:text-2xl font-bold text-center max-w-4xl mx-auto leading-relaxed italic group-hover:scale-[1.01] transition-transform duration-500">
            &quot;Our mission is to empower the next generation of semiconductor leaders through specialized education, 
            exclusive industry partnerships, and a high-impact technical community.&quot;
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {missionCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-scro-gold/10 bg-[#0a0a0a] p-10 hover:bg-scro-gold/5 hover:border-scro-gold/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_-12px_rgba(255,201,4,0.2)] backdrop-blur-sm"
              >
                <div className="mb-8 inline-flex p-5 rounded-2xl bg-scro-gold/10 text-scro-gold group-hover:bg-scro-gold group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,201,4,0.1)] group-hover:shadow-[0_0_30px_rgba(255,201,4,0.4)] group-hover:rotate-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-scro-gold transition-colors">{item.title}</h3>
                <p className="text-base text-zinc-400 leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
