'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

type SectionMotionProps = {
  className?: string;
  delay?: number;
} & HTMLMotionProps<'section'>;
import { motion } from 'framer-motion';
import { type HTMLAttributes, type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type SectionMotionProps = PropsWithChildren<
  {
    className?: string;
    delay?: number;
  } & HTMLAttributes<HTMLElement>
>;

export function SectionMotion({ className, children, delay = 0, ...props }: SectionMotionProps) {
  return (
    <motion.section
      className={className}
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
