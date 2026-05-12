import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyClassesTo: ['astro'],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@/': './src/',
        '@components/': './src/components/',
        '@lib/': './src/lib/',
        '@styles/': './src/styles/',
        '@ui/': './src/components/ui/',
      },
    },
  },
});
