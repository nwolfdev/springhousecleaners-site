/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace']
      },
      colors: {
        cream: {
          DEFAULT: '#FBF8F3',
          50: '#FDFCF9',
          100: '#FBF8F3',
          200: '#F4EEE2',
          300: '#E9DFC9'
        },
        moss: {
          DEFAULT: '#0D4F4C',
          50: '#F0F7F6',
          100: '#D5E8E6',
          200: '#A8D0CC',
          300: '#6FA8A2',
          400: '#3E7B76',
          500: '#0D4F4C',
          600: '#0A3F3D',
          700: '#08302E',
          800: '#05201F',
          900: '#031010'
        },
        terra: {
          DEFAULT: '#D9593A',
          50: '#FBEDE8',
          100: '#F6D5C8',
          200: '#EFB199',
          300: '#E78669',
          400: '#DF6A48',
          500: '#D9593A',
          600: '#B8451F',
          700: '#8C3418'
        },
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#595959',
          subtle: '#8C8C8C'
        }
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
      },
      maxWidth: {
        'content': '72rem',
        'prose-lg': '42rem'
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
};
