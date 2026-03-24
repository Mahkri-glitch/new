import type { Stat } from '@/components/types';

type StatsRowProps = {
  stats: Stat[];
};

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</dt>
          <dd className="mt-2 text-2xl font-semibold text-white">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
