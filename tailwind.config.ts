import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        scro: {
          black: '#000000',
          gold: '#FFD51E',
          'gold-dark': '#CCAA18',
          white: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
};

export default config;
