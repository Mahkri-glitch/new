import { CalendarClockIcon, MapPinIcon } from '@/lib/icons';
import { events } from '@/lib/data';

export function EventsSection() {
  return (
    <section id="events" className="py-20 sm:py-32 border-b border-white/5 relative z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Past Events</h2>
          <p className="mt-3 text-lg text-zinc-400">Take a look at what we've been up to.</p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/[0.07] transition-all flex flex-col shadow-lg"
            >
              <div className="mb-6">
                <span className="inline-flex rounded-full bg-[#FFD51E]/10 border border-[#FFD51E]/20 px-3 py-1.5 text-xs font-bold text-[#FFD51E]">
                  {event.date}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{event.title}</h3>
              <div className="space-y-3 text-sm text-zinc-300 mb-8">
                <p className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <CalendarClockIcon className="h-4 w-4 text-zinc-400" /> 
                  </div>
                  {event.time}
                </p>
                <p className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPinIcon className="h-4 w-4 text-zinc-400" /> 
                  </div>
                  {event.location}
                </p>
              </div>
              <p className="text-base text-zinc-400 leading-relaxed mb-8 flex-grow">{event.description}</p>
              <div>
                <a href={event.ctaHref} className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 text-sm font-medium text-white hover:bg-white/10 transition-colors">
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
