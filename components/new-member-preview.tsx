import { CheckIcon } from '@/lib/icons';

import { checklistItems } from '@/lib/data';
import { SectionMotion } from '@/components/section-motion';
import { Button } from '@/components/ui/button';

export function NewMemberPreview() {
  return (
    <SectionMotion className="bg-transparent py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-[var(--scro-white)] sm:text-4xl">New to SCRO?</h2>
          <p className="mt-4 text-sm text-[rgba(255,255,255,0.78)]">
            Whether you are just getting started or already interested in semiconductors, SCRO is built to help you learn,
            connect, and grow.
          </p>
          <Button href="/new-members" className="mt-6">
            Go to New Member Page
          </Button>
        </div>

        <div className="rounded-2xl border border-[rgba(255,213,30,0.3)] bg-[rgba(255,213,30,0.04)] p-5">
          <p className="text-sm font-semibold text-[var(--scro-white)]">Quick Start Checklist</p>
          <ul className="mt-4 space-y-2">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.82)]">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--scro-gold)] text-black">
                  <CheckIcon className="h-4 w-4" />
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
