'use client';

import { motion } from 'framer-motion';

import type { Testimonial } from '@/components/types';

type TestimonialGridProps = {
  items: Testimonial[];
};

export function TestimonialGrid({ items }: TestimonialGridProps) {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.figure
          key={item.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          viewport={{ once: true, amount: 0.35 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
        >
          <blockquote className="text-sm leading-relaxed text-slate-300">“{item.quote}”</blockquote>
          <figcaption className="mt-5 border-t border-slate-800 pt-4">
            <p className="font-medium text-white">{item.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.role}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
