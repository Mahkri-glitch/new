'use client';

import { motion } from 'framer-motion';

import { missionCards } from '@/lib/data';
import { SectionMotion } from '@/components/section-motion';

export function AboutSection() {
  return (
    <SectionMotion id="about" className="bg-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[var(--scro-white)] sm:text-4xl">About SCRO @ UCF</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[rgba(255,255,255,0.78)]">
          SCRO @ UCF is a student organization for students interested in semiconductors and related technology fields. We
          help members build technical awareness, industry familiarity, and professional readiness. Interdisciplinary
          students are welcome, beginners are welcome, and we support exploration across microelectronics, devices,
          fabrication, materials, and career pathways.
        </p>
        <div className="mt-6 rounded-2xl border border-[rgba(255,213,30,0.3)] bg-[rgba(255,213,30,0.05)] p-5">
          <p className="text-sm font-medium text-[rgba(255,255,255,0.9)]">
            Our mission is to help students explore and prepare for opportunities in the semiconductor industry through
            education, professional development, and community.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {missionCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[rgba(255,213,30,0.28)] bg-[rgba(255,213,30,0.04)] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_12px_32px_rgba(255,213,30,0.1)]"
              >
                <Icon className="h-6 w-6 text-[var(--scro-gold)]" />
                <h3 className="mt-3 text-lg font-semibold text-[var(--scro-white)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[rgba(255,255,255,0.72)]">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionMotion>
  );
}
