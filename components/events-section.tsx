import { CalendarClockIcon, MapPinIcon } from '@/lib/icons';
import { events } from '@/lib/data';

export function EventsSection() {
  return (
    <section id="events" className="py-24 sm:py-32 relative overflow-hidden border-b border-scro-gold/10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-scro-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_20px_rgba(255,201,4,0.1)]">
            Upcoming <span className="text-scro-gold">Events</span>
          </h2>
          <div className="h-1.5 w-24 bg-scro-gold mx-auto mt-6 mb-8" />
          <p className="text-zinc-400 text-xl font-medium">Join our high-impact sessions and build your industry network.</p>
        </div>
        
        <div className="grid gap-10 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.title}
              className="group rounded-[2.5rem] border border-scro-gold/10 bg-[#0a0a0a] p-10 hover:border-scro-gold/40 transition-all duration-500 flex flex-col hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(255,201,4,0.2)] backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-scro-gold opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_20px_rgba(255,201,4,0.4)]" />
              
              <div className="mb-8 flex justify-between items-start">
                <span className="inline-flex rounded-full bg-scro-gold text-black px-6 py-2 text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,201,4,0.3)]">
                  {event.date}
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-scro-gold transition-colors leading-tight italic">{event.title}</h3>
              
              <div className="space-y-4 text-base text-zinc-300 mb-10 font-bold">
                <p className="flex items-center gap-4 group-hover:text-white transition-colors">
                  <div className="p-2 rounded-lg bg-scro-gold/10 text-scro-gold group-hover:bg-scro-gold group-hover:text-black transition-all">
                    <CalendarClockIcon className="h-5 w-5" /> 
                  </div>
                  {event.time}
                </p>
                <p className="flex items-center gap-4 group-hover:text-white transition-colors">
                  <div className="p-2 rounded-lg bg-scro-gold/10 text-scro-gold group-hover:bg-scro-gold group-hover:text-black transition-all">
                    <MapPinIcon className="h-5 w-5" /> 
                  </div>
                  {event.location}
                </p>
              </div>
              
              <p className="text-base text-zinc-400 leading-relaxed mb-10 flex-grow font-medium group-hover:text-zinc-300 transition-colors">{event.description}</p>
              
              <div>
                <a 
                  href={event.ctaHref} 
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-scro-gold px-10 text-sm font-black text-black hover:bg-scro-gold-dark hover:scale-[1.05] transition-all duration-300 shadow-[0_0_20px_rgba(255,201,4,0.2)] hover:shadow-[0_0_35px_rgba(255,201,4,0.5)] uppercase tracking-widest"
                >
                  {event.ctaLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
