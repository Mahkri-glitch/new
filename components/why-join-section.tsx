'use client';

import { motion } from 'framer-motion';

import { benefits } from '@/lib/data';
import { SectionMotion } from '@/components/section-motion';

export function WhyJoinSection() {
  return (
    <SectionMotion className="bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[var(--scro-white)] sm:text-4xl">Why Join SCRO?</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[rgba(255,213,30,0.28)] bg-[rgba(255,213,30,0.04)] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_12px_32px_rgba(255,213,30,0.1)]"
              >
                <Icon className="h-5 w-5 text-[var(--scro-gold)]" />
                <h3 className="mt-3 text-base font-semibold text-[var(--scro-white)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.72)]">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionMotion>
  );
}
