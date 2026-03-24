'use client';

import { motion } from 'framer-motion';

import type { Feature } from '@/components/types';

type FeatureGridProps = {
  items: Feature[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.1, duration: 0.45 }}
          whileHover={{ y: -8 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/60"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
        </motion.article>
      ))}
    </div>
  );
}
