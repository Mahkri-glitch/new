import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        scro: {
          black: '#000000',
          gold: '#FFC904',
          'gold-dark': '#C9A003',
          white: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
};

export default config;
