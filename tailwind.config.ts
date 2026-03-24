import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          dark: '#312e81',
          light: '#818cf8'
        }
      },
      boxShadow: {
        glow: '0 10px 35px rgba(79, 70, 229, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
