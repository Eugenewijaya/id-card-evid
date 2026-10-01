import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        primary: '#1D1D1F',
        secondary: '#6E6E73',
        accent: {
          DEFAULT: '#0071E3',
          hover: '#0077ED',
        },
        surface: '#FBFBFD',
        border: 'rgba(0,0,0,0.08)',
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 25px 50px rgba(0,0,0,0.15)',
        'card-hover': '0 30px 60px rgba(0,0,0,0.2)',
        soft: '0 4px 24px rgba(0,0,0,0.06)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
