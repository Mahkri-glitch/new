'use client';

import { motion } from 'framer-motion';
import { CalendarClockIcon, MapPinIcon } from '@/lib/icons';
import { CalendarClock, MapPin } from 'lucide-react';

import { events } from '@/lib/data';
import { SectionMotion } from '@/components/section-motion';
import { Button } from '@/components/ui/button';

export function EventsSection() {
  return (
    <SectionMotion id="events" className="bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[var(--scro-white)] sm:text-4xl">Upcoming Events</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-[rgba(255,213,30,0.36)] bg-[rgba(255,213,30,0.06)] p-6 shadow-[0_12px_30px_rgba(255,213,30,0.14)]"
            >
              <p className="inline-flex rounded-full border border-[rgba(255,213,30,0.5)] px-3 py-1 text-xs font-medium text-[var(--scro-gold)]">
                {event.date}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-[var(--scro-white)]">{event.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-[rgba(255,255,255,0.88)]">
                <p className="flex items-center gap-2">
                  <CalendarClockIcon className="h-4 w-4 text-[var(--scro-gold)]" /> {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-[var(--scro-gold)]" /> {event.location}
                  <CalendarClock className="h-4 w-4 text-[var(--scro-gold)]" /> {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--scro-gold)]" /> {event.location}
                </p>
              </div>
              <p className="mt-4 text-sm text-[rgba(255,255,255,0.84)]">{event.description}</p>
              <Button href={event.ctaHref} className="mt-5" aria-label={`${event.ctaLabel} for ${event.title}`}>
                {event.ctaLabel}
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
