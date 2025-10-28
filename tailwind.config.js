/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        wisper: {
          primary: '#A6D8FF',
          secondary: '#C6B3FF',
          accent: '#9BD3E8',
          cyan: {
            DEFAULT: '#06b6d4',
            dark: '#0891b2',
            darker: '#0e7490',
            light: '#22d3ee',
            lighter: '#67e8f9',
            pale: '#cffafe',
          },
          blue: {
            sky: '#06b6d4',
            'sky-light': '#e0f2fe',
            'sky-pale': '#f0f9ff',
          },
          text: {
            primary: '#0f172a',
            secondary: '#334155',
            tertiary: '#475569',
            muted: '#64748b',
            light: '#94a3b8',
          },
          border: {
            DEFAULT: '#cffafe',
            light: '#e0f2fe',
            dark: '#06b6d4',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        drift: 'drift 60s linear infinite',
        shimmer: 'shimmer 2s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        drift: {
          '0%': {
            transform: 'translateX(0) translateY(0) scale(0.95)',
            opacity: '0',
          },
          '5%': { opacity: '0.6' },
          '15%': {
            opacity: '0.8',
            transform: 'translateX(15vw) translateY(-5px) scale(1)',
          },
          '50%': {
            transform: 'translateX(60vw) translateY(-15px) scale(1.05)',
          },
          '85%': { opacity: '0.8' },
          '95%': { opacity: '0.3' },
          '100%': {
            transform: 'translateX(125vw) translateY(-25px) scale(1.1)',
            opacity: '0',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-wisper': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'gradient-sky': 'linear-gradient(180deg, #06b6d4 0%, #e0f2fe 100%)',
      },
      boxShadow: {
        'wisper-sm': '0 2px 8px rgba(6, 182, 212, 0.1)',
        'wisper-md':
          '0 4px 16px rgba(6, 182, 212, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'wisper-lg':
          '0 10px 30px rgba(6, 182, 212, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)',
        'wisper-xl':
          '0 20px 40px rgba(6, 182, 212, 0.18), 0 10px 20px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      letterSpacing: {
        tighter: '-0.025em',
        tight: '-0.011em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
