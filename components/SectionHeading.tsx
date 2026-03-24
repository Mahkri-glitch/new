import { ReactNode } from 'react';

type SectionHeadingProps = {
  badge: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function SectionHeading({ badge, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl space-y-3">
        <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
          {badge}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="text-base text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
