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
        // Primary - Variation Coral Red
        primary: {
          50: '#FFF5F5',
          100: '#FFE8E8',
          200: '#FFDEDE',
          300: '#FFD3D3',
          400: '#FFB4B4',
          500: '#FF9292',
          600: '#FE7070',
          700: '#F65F5F',
          800: '#EE4E4E',
          900: '#C93636',
          950: '#7A2020',
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
        // Gray scale - Neutral
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
          950: '#121416',
        },
        // Semantic
        success: {
          50: '#F0FFF9',
          100: '#E6FCF5',
          200: '#B2F5E0',
          300: '#76EDCC',
          400: '#38E5B4',
          500: '#12DCA0',
          600: '#00D897',
          700: '#00B37D',
          800: '#008F64',
          900: '#006B4C',
          950: '#003D2B',
        },
        warning: {
          50: '#FFFCF0',
          100: '#FFF9DB',
          200: '#FFE8A3',
          300: '#FFD666',
          400: '#FFC233',
          500: '#FF8C00',
          600: '#F76707',
          700: '#CC5500',
          800: '#A34400',
          900: '#7A3300',
          950: '#421C00',
        },
        error: {
          50: '#FFF5F5',
          100: '#FFE3E4',
          200: '#FFC9CA',
          300: '#FFA3A4',
          400: '#F87171',
          500: '#F45252',
          600: '#F13E3E',
          700: '#D32F2F',
          800: '#B71C1C',
          900: '#8B1A1A',
          950: '#4A0E0E',
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
          sunken: '#F1F3F5',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
        // Interactive colors
        interactive: {
          DEFAULT: '#FE7070',
          hover: '#F65F5F',
          pressed: '#EE4E4E',
          disabled: '#CED4DA',
        },
        // Link colors
        link: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          visited: '#7C3AED',
        },
        // Destructive colors
        destructive: {
          DEFAULT: '#F13E3E',
          hover: '#D32F2F',
          pressed: '#B71C1C',
          text: '#8B1A1A',
          bg: '#FFE3E4',
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

      // Semantic typography scale (Figma Display spec)
      fontSize: {
        'display-lg': ['2.75rem', { lineHeight: '3.625rem' }],   // 44px / 58px
        'display-md': ['2.25rem', { lineHeight: '2.75rem' }],    // 36px / 44px
        'heading-1': ['1.875rem', { lineHeight: '2.5rem' }],     // 30px / 40px
        'heading-2': ['1.75rem', { lineHeight: '2.25rem' }],     // 28px / 36px
        'heading-3': ['1.625rem', { lineHeight: '2rem' }],       // 26px / 32px
        'heading-4': ['1.375rem', { lineHeight: '1.875rem' }],   // 22px / 30px
        'body-1': ['1.125rem', { lineHeight: '1.75rem' }],       // 18px / 28px
        'body-2': ['1rem', { lineHeight: '1.625rem' }],          // 16px / 26px
        'body-3': ['0.875rem', { lineHeight: '1.25rem' }],       // 14px / 20px
        'label': ['0.75rem', { lineHeight: '1rem' }],            // 12px / 16px
      },

      letterSpacing: {
        tight: '-0.02em',  // Figma -2%
      },

      borderRadius: {
        card: '0.75rem',
        button: '7px',
        pill: '30px',
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
        focus: '0 0 0 3px rgba(254, 112, 112, 0.2)',
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
