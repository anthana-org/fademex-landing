import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        canvas: '#F0F2EB',
        ink: '#2D2F30',
        'accent-gold': '#E1EBA3',
        highlight: '#F3E068',
        'glass-border': 'rgba(45, 47, 48, 0.15)',
        'glass-surface': 'rgba(45, 47, 48, 0.05)',
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        mesh:
          'radial-gradient(at 0% 0%, rgba(45,47,48,0.35) 0, transparent 45%), radial-gradient(at 50% 0%, rgba(225,235,163,0.35) 0, transparent 45%), radial-gradient(at 100% 0%, rgba(243,224,104,0.25) 0, transparent 45%)',
        'liquid-gold':
          'linear-gradient(135deg, rgba(225,235,163,0.5) 0%, rgba(243,224,104,0.2) 100%)',
      }
    }
  },
  plugins: [],
}
export default config
