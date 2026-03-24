import { Check } from 'lucide-react';

import { checklistItems } from '@/lib/data';
import { SectionMotion } from '@/components/section-motion';
import { Button } from '@/components/ui/button';

export function NewMemberPreview() {
  return (
    <SectionMotion className="bg-[var(--scro-white)] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-black sm:text-4xl">New to SCRO?</h2>
          <p className="mt-4 text-sm text-[rgba(0,0,0,0.84)]">
            Whether you are just getting started or already interested in semiconductors, SCRO is built to help you learn,
            connect, and grow.
          </p>
          <Button href="/new-members" className="mt-6">
            Go to New Member Page
          </Button>
        </div>

        <div className="rounded-2xl border border-[rgba(204,170,24,0.42)] bg-[rgba(255,213,30,0.1)] p-5">
          <p className="text-sm font-semibold text-black">Quick Start Checklist</p>
          <ul className="mt-4 space-y-2">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[rgba(0,0,0,0.86)]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--scro-gold)] text-black">
                  <Check className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionMotion>
  );
}
