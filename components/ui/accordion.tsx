'use client';

import { ChevronDownIcon } from '@/lib/icons';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { FaqItem } from '@/lib/data';

type Props = { items: FaqItem[] };

export function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-xl border border-[rgba(255,213,30,0.35)] bg-[rgba(0,0,0,0.9)]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-[var(--scro-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--scro-gold)]"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              {item.question}
              <ChevronDownIcon className={cn('h-4 w-4 text-[var(--scro-gold)] transition-transform', isOpen && 'rotate-180')} />
              <ChevronDown className={cn('h-4 w-4 text-[var(--scro-gold)] transition-transform', isOpen && 'rotate-180')} />
            </button>
            {isOpen ? <p className="px-4 pb-4 text-sm text-[rgba(255,255,255,0.82)]">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
