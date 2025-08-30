import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009689',
          '50': '#f0fdfa',
          '100': '#cbfbf1',
          '200': '#96f7e4',
          '300': '#46edd5',
          '400': '#00d5be',
          '500': '#00bba7',
          '600': '#009689',
          '700': '#00786f',
          '800': '#005f5a',
          '900': '#0b4f4a',
          '950': '#022f2e',
        },
        secondary: {
          DEFAULT: '#e60076',
          '50': '#fdf2f8',
          '100': '#fce7f3',
          '200': '#fccee8',
          '300': '#fda5d6',
          '400': '#fb64b6',
          '500': '#f6339a',
          '600': '#e60076',
          '700': '#c6005c',
          '800': '#a3004c',
          '900': '#861043',
          '950': '#510424',
        },
        // background: 'var(--background)',
        // foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config;

