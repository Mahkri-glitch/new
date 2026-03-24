import { ReactNode } from 'react';

export type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

export type Stat = {
  label: string;
  value: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};
