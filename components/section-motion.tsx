'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

import { cn } from '@/lib/utils';

type SectionMotionProps = HTMLMotionProps<'section'> & {
  delay?: number;
};

export function SectionMotion({ className, children, delay = 0, ...props }: SectionMotionProps) {
  return (
    <motion.section
      className={cn(className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
