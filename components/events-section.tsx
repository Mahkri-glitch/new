import { CalendarClockIcon, MapPinIcon } from '@/lib/icons';
import { events } from '@/lib/data';

export function EventsSection() {
  return (
    <section id="events" className="py-20 sm:py-24 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight">Past Events</h2>
          <p className="mt-2 text-zinc-400">Take a look at what we've been up to.</p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.title}
              className="rounded-xl border border-zinc-800 bg-[#111] p-6 hover:border-zinc-700 transition-colors flex flex-col"
            >
              <div className="mb-4">
                <span className="inline-flex rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">
                  {event.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">{event.title}</h3>
              <div className="space-y-2 text-sm text-zinc-400 mb-6">
                <p className="flex items-center gap-2">
                  <CalendarClockIcon className="h-4 w-4 text-zinc-500" /> 
                  {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-zinc-500" /> 
                  {event.location}
                </p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-grow">{event.description}</p>
              <div>
                <a href={event.ctaHref} className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-800 bg-transparent px-4 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors">
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
