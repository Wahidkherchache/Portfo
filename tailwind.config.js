/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ferrari: {
          red: '#DC0000',
          'red-dark': '#A80000',
          'red-bright': '#FF1E1E',
          carbon: '#0A0A0A',
          carbon2: '#0E0E0E',
          gold: '#C8A84B',
          'gold-bright': '#E6C66C',
          smoke: '#F0F0F0',
          pit: '#1A1A1A',
          'pit-light': '#222222',
          'pit-border': '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Formula1"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'carbon-fiber':
          'repeating-linear-gradient(45deg, #0a0a0a 0px, #0a0a0a 2px, #111111 2px, #111111 4px), repeating-linear-gradient(-45deg, #0a0a0a 0px, #0a0a0a 2px, #0e0e0e 2px, #0e0e0e 4px)',
        'red-glow':
          'radial-gradient(circle at center, rgba(220,0,0,0.35) 0%, rgba(220,0,0,0) 70%)',
        'gold-gradient':
          'linear-gradient(135deg, #C8A84B 0%, #E6C66C 30%, #FFF2B3 50%, #E6C66C 70%, #C8A84B 100%)',
        'red-gradient':
          'linear-gradient(90deg, #A80000 0%, #DC0000 50%, #FF1E1E 100%)',
        'racing-stripe':
          'linear-gradient(90deg, transparent 0%, #DC0000 50%, #C8A84B 100%)',
      },
      boxShadow: {
        'red-glow': '0 0 24px rgba(220, 0, 0, 0.45), 0 0 60px rgba(220, 0, 0, 0.2)',
        'red-glow-lg':
          '0 0 40px rgba(220, 0, 0, 0.6), 0 0 100px rgba(220, 0, 0, 0.3)',
        'gold-glow': '0 0 20px rgba(200, 168, 75, 0.4)',
        'card-hover':
          '0 0 0 1px rgba(220,0,0,0.4), 0 24px 48px -12px rgba(220,0,0,0.3), 0 0 80px -20px rgba(200,168,75,0.3)',
      },
      animation: {
        'shimmer-gold': 'shimmer-gold 4s ease-in-out infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
        'light-on': 'light-on 0.3s ease forwards',
        'scroll-line': 'scroll-line 2s linear infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        'shimmer-gold': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220,0,0,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(220,0,0,0.8), 0 0 80px rgba(220,0,0,0.3)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '3%': { opacity: '0.8' },
          '6%': { opacity: '1' },
          '47%': { opacity: '1' },
          '49%': { opacity: '0.5' },
          '51%': { opacity: '1' },
          '77%': { opacity: '1' },
          '79%': { opacity: '0.7' },
          '81%': { opacity: '1' },
        },
        'light-on': {
          '0%': { opacity: '0.2', boxShadow: 'inset 0 0 10px #400' },
          '100%': {
            opacity: '1',
            boxShadow: '0 0 24px #DC0000, inset 0 0 12px #FF1E1E',
          },
        },
        'scroll-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'race': 'cubic-bezier(0.07, 0.77, 0.2, 0.95)',
        'pit': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
