import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';

type ButtonBaseProps = {
  variant?: Variant;
  className?: string;
};

type ButtonLinkProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  };

export function Button({ href, variant = 'primary', className, children, ...props }: ButtonLinkProps) {
  const variantClass = {
    primary: 'bg-[var(--scro-gold)] text-black hover:bg-[var(--scro-gold-dark)]',
    outline: 'border border-[var(--scro-gold)] text-[var(--scro-gold)] hover:bg-[rgba(255,213,30,0.1)]',
    ghost: 'text-[var(--scro-white)] hover:bg-[rgba(255,255,255,0.08)]'
  }[variant];

  const isExternal = href.startsWith('http');

  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--scro-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    variantClass,
    className
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
