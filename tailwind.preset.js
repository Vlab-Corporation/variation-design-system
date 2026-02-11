/**
 * vlab Corporation Design System - Tailwind CSS Preset
 * Use this preset in your tailwind.config.js:
 *
 * module.exports = {
 *   presets: [require('@vlab-corporation/design-system/tailwind-preset')],
 *   // your config...
 * }
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary - Warm terracotta
        primary: {
          50: '#FDF8F7',
          100: '#FBEFED',
          200: '#F5DCD7',
          300: '#EEC3BB',
          400: '#E29C8F',
          500: '#D38475',
          600: '#C06A59',
          700: '#A15548',
          800: '#84463C',
          900: '#6D3B33',
          950: '#3A1E1A',
        },
        // Secondary - Complementary palette
        secondary: {
          50: '#F8F7F6',
          100: '#EEE7DF',
          200: '#E5DCD2',
          300: '#D4C8BA',
          400: '#BBA898',
          500: '#A28B78',
          600: '#8D7565',
          700: '#756054',
          800: '#615047',
          900: '#52443D',
          950: '#2B231F',
        },
        // Semantic
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        info: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Surface colors
        surface: {
          DEFAULT: '#FFFFFF',
          raised: '#FFFFFF',
          sunken: '#F3F4F6',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
        // Interactive colors
        interactive: {
          DEFAULT: '#D38475',
          hover: '#C06A59',
          pressed: '#A15548',
          disabled: '#D1D5DB',
        },
        // Link colors
        link: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          visited: '#7C3AED',
        },
        // Destructive colors
        destructive: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          pressed: '#B91C1C',
          text: '#991B1B',
          bg: '#FEF2F2',
        },
      },

      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },

      borderRadius: {
        card: '0.75rem',
        button: '0.375rem',
        input: '0.375rem',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-out': 'fadeOut 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'spin-slow': 'spin 1.5s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },

      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },

      // Box Shadow tokens
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        focus: '0 0 0 3px rgba(211, 132, 117, 0.2)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },

      // Z-Index scale
      zIndex: {
        hide: '-1',
        docked: '10',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        'modal-backdrop': '1040',
        modal: '1050',
        popover: '1060',
        tooltip: '1070',
        toast: '1080',
      },
    },
  },
};
