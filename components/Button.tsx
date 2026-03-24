import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const shared =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5';

  const styles =
    variant === 'primary'
      ? 'bg-indigo-500 text-white shadow-glow hover:bg-indigo-400'
      : 'border border-slate-700 bg-slate-900/70 text-slate-100 hover:bg-slate-800';

  return (
    <Link href={href} className={`${shared} ${styles}`}>
      {children}
    </Link>
  );
}
