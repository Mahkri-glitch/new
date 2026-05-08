import { CheckIcon } from '@/lib/icons';
import { checklistItems } from '@/lib/data';

export function NewMemberPreview() {
  return (
    <section className="py-20 sm:py-24 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">New to SCRO?</h2>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
              Whether you are just getting started or already interested in semiconductors, SCRO is built to help you learn,
              connect, and grow.
            </p>
            <a href="/new-members" className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-zinc-200">
              Go to New Member Page
            </a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#111] p-8">
            <h3 className="text-sm font-semibold text-zinc-100 mb-6 uppercase tracking-wider">Quick Start Checklist</h3>
            <ul className="space-y-4">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-zinc-800 text-zinc-300">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
