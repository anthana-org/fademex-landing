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
        canvas: '#F7F8F3',
        'canvas-alt': '#FFFFFF',
        ink: '#1A1C1D',
        'ink-light': '#4A4D4E',
        'accent-gold': '#C5D94E',
        'accent-gold-dark': '#9BB82D',
        highlight: '#E8D44D',
        'accent-teal': '#3D9A8B',
        'glass-border': 'rgba(26, 28, 29, 0.12)',
        'glass-surface': 'rgba(26, 28, 29, 0.03)',
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(26, 28, 29, 0.08)',
        'card-hover': '0 12px 32px -8px rgba(26, 28, 29, 0.12)',
        'card-lg': '0 16px 48px -12px rgba(26, 28, 29, 0.15)',
        'button': '0 8px 24px -4px rgba(197, 217, 78, 0.4)',
        'button-hover': '0 12px 32px -4px rgba(197, 217, 78, 0.5)',
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
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
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        mesh:
          'radial-gradient(at 0% 0%, rgba(26,28,29,0.25) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(197,217,78,0.25) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(232,212,77,0.2) 0, transparent 50%)',
        'liquid-gold':
          'linear-gradient(135deg, rgba(197,217,78,0.4) 0%, rgba(232,212,77,0.15) 100%)',
        'hero-gradient':
          'linear-gradient(135deg, rgba(197,217,78,0.15) 0%, rgba(247,248,243,1) 50%, rgba(232,212,77,0.1) 100%)',
      }
    }
  },
  plugins: [],
}
export default config
