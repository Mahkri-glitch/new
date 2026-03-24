'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

const badges = ['Student-Led', 'Career-Focused', 'Semiconductor Community'];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,213,30,0.12),transparent_35%),linear-gradient(to_right,rgba(255,213,30,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,213,30,0.08)_1px,transparent_1px)] bg-[size:100%_100%,36px_36px,36px_36px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Image src="/scro-logo.svg" alt="SCRO @ UCF logo" width={86} height={86} className="rounded-xl border border-[rgba(255,213,30,0.5)] bg-black/80 p-2" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="text-3xl font-extrabold leading-tight text-[var(--scro-white)] sm:text-4xl lg:text-5xl"
          >
            Semiconductor Career Readiness Organization at UCF
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base text-[rgba(255,255,255,0.9)]"
          >
            A student organization focused on semiconductor industry exposure, technical learning, professional development,
            and career readiness.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="max-w-2xl text-sm text-[rgba(255,255,255,0.78)]"
          >
            SCRO @ UCF connects students interested in semiconductors, microelectronics, materials, fabrication, and related
            careers through community, events, and growth opportunities.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="flex flex-wrap gap-3">
            <Button href="#contact">Join SCRO</Button>
            <Button href="#events" variant="outline">
              View Events
            </Button>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2 pt-2">
            {badges.map((badge) => (
              <li key={badge} className="rounded-full border border-[rgba(255,213,30,0.35)] px-3 py-1 text-xs text-[var(--scro-gold)]">
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.24, duration: 0.55 }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-[rgba(255,213,30,0.45)] bg-[rgba(0,0,0,0.9)] p-4 shadow-[0_14px_45px_rgba(255,213,30,0.22)]"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1], opacity: [0.88, 1, 0.88] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/scro-logo.png"
                alt="Animated SCRO @ UCF logo"
                width={560}
                height={560}
                priority
                className="h-auto w-full rounded-xl object-cover drop-shadow-[0_0_22px_rgba(255,213,30,0.35)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
