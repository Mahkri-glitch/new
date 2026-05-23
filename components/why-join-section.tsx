import { benefits } from '@/lib/data';

export function WhyJoinSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden border-b border-scro-gold/10">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-scro-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_20px_rgba(255,201,4,0.1)]">
            Why Join <span className="text-scro-gold">SCRO</span>?
          </h2>
          <div className="h-1.5 w-24 bg-scro-gold mx-auto mt-6" />
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-scro-gold/10 bg-[#0a0a0a] p-10 hover:bg-scro-gold/5 hover:border-scro-gold/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_-12px_rgba(255,201,4,0.2)] backdrop-blur-sm"
              >
                <div className="mb-8 inline-flex p-5 rounded-2xl bg-gradient-to-br from-scro-gold/20 to-scro-gold/5 border border-scro-gold/20 text-scro-gold shadow-[0_0_20px_rgba(255,201,4,0.1)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
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
