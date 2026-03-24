export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(' ');
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
