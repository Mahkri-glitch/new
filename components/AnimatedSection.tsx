'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
