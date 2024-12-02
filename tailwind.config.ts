import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.15' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) skew(0deg)' },
          '50%': { transform: 'translateX(-20%) skew(-5deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        flow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        ray: {
          '0%, 100%': { opacity: '0.4', transform: 'rotate(-30deg) translateY(0)' },
          '50%': { opacity: '0.1', transform: 'rotate(-30deg) translateY(-30px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        'float-particle': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-30px) translateX(20px)' },
          '50%': { transform: 'translateY(-10px) translateX(-20px)' },
          '75%': { transform: 'translateY(20px) translateX(10px)' },
        },
        glare: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(25%, 25%) rotate(45deg)' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%) rotate(-45deg)' },
          '100%': { transform: 'translateX(100%) rotate(-45deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(6)', opacity: '0' },
        },
        beam: {
          '0%': { transform: 'translateY(-100%) skew-x-12' },
          '100%': { transform: 'translateY(100%) skew-x-12' },
        },
        sprinkle: {
          '0%': { transform: 'translateY(-20px) rotate(45deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(20px) rotate(45deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        glow: 'glow 10s ease-in-out infinite',
        'glow-delayed': 'glow 10s ease-in-out 5s infinite',
        float: 'float 15s ease-in-out infinite',
        'float-delayed': 'float 15s ease-in-out 7.5s infinite',
        wave: 'wave 20s ease-in-out infinite',
        'wave-delayed': 'wave 20s ease-in-out 10s infinite',
        morph: 'morph 20s ease-in-out infinite',
        'morph-delayed': 'morph 20s ease-in-out 10s infinite',
        flow: 'flow 15s ease-in-out infinite',
        'flow-delayed': 'flow 15s ease-in-out 7.5s infinite',
        ray: 'ray 12s ease-in-out infinite',
        'ray-delayed': 'ray 12s ease-in-out 6s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 25s linear infinite reverse',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-ring-delayed': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite',
        'pulse-ring-delayed-2': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) 2s infinite',
        'float-particle': 'float-particle 15s ease-in-out infinite',
        glare: 'glare 10s ease-in-out infinite',
        slide: 'slide 20s linear infinite',
        'slide-reverse': 'slide 25s linear infinite reverse',
        shimmer: 'shimmer 6s ease-in-out infinite',
        'shimmer-delayed': 'shimmer 6s ease-in-out 3s infinite',
        ripple: 'ripple 4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ripple-delayed': 'ripple 4s cubic-bezier(0, 0, 0.2, 1) 1s infinite',
        'ripple-delayed-2': 'ripple 4s cubic-bezier(0, 0, 0.2, 1) 2s infinite',
        'ripple-delayed-3': 'ripple 4s cubic-bezier(0, 0, 0.2, 1) 3s infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        beam: 'beam 8s linear infinite',
        'beam-delayed': 'beam 8s linear 4s infinite',
        sprinkle: 'sprinkle 2s linear infinite',
        'sprinkle-delayed': 'sprinkle 2s linear 0.7s infinite',
        'sprinkle-delayed-2': 'sprinkle 2s linear 1.4s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
