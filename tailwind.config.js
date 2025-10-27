/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b51f5',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          500: '#5f6af8',
          600: '#4f5de8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        celebrity: '#c238eb',
      },
      animation: {
        'turn-pulse': 'turn-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'card-flip': 'card-flip 0.6s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'turn-pulse': {
          '0%, 100%': { 
            borderColor: '#8b51f5',
            boxShadow: '0 0 0 0 rgba(139, 81, 245, 0.7)' 
          },
          '50%': { 
            borderColor: '#c238eb',
            boxShadow: '0 0 0 10px rgba(139, 81, 245, 0)' 
          },
        },
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}