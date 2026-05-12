import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import { defineConfig } from 'astro/config';

export default defineConfig({
  adapter: netlify(),
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
