/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0ECFE',
          100: '#DFD7FD',
          200: '#C2B1FB',
          300: '#A185F9',
          400: '#835FF7',
          500: '#6C4DF6', // Primary Purple
          600: '#5836E6',
          700: '#4726CA',
          800: '#381D9E',
          900: '#2E177F',
        },
        coral: {
          50: '#FFF0F4',
          100: '#FFE1EA',
          200: '#FFBFD2',
          300: '#FF94B4',
          400: '#FF6F98',
          500: '#FF5C8A', // Coral Pink
          600: '#E63D6D',
          700: '#C72454',
          800: '#A31C44',
          900: '#851A3A',
        },
        warm: {
          50: '#FFF9F0',
          100: '#FFF1DC',
          200: '#FFE0B3',
          300: '#FFCF85',
          400: '#FFC160',
          500: '#FFB84D', // Warm Yellow
          600: '#E69E33',
          700: '#BF7E20',
          800: '#996014',
          900: '#7A4B0E',
        },
        surface: {
          bg: '#F7F7FA',
          card: '#FFFFFF',
          border: '#EAEAEF',
          muted: '#F0F1F5',
        },
        slateText: {
          main: '#202124',
          muted: '#737780',
          sub: '#9AA0A6',
        },
        emeraldGreen: {
          500: '#19A974',
          50: '#E8F8F2',
        },
        roseDanger: {
          500: '#EF4444',
          50: '#FEECEC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Oswald', 'Bebas Neue', 'Impact', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'soft-md': '0 4px 16px -2px rgba(108, 77, 246, 0.08), 0 2px 6px -1px rgba(0,0,0,0.04)',
        'soft-lg': '0 10px 30px -4px rgba(108, 77, 246, 0.12), 0 4px 12px -2px rgba(0,0,0,0.05)',
        'soft-xl': '0 20px 40px -8px rgba(108, 77, 246, 0.15), 0 8px 16px -4px rgba(0,0,0,0.06)',
        'coral-glow': '0 8px 24px -4px rgba(255, 92, 138, 0.35)',
        'purple-glow': '0 8px 24px -4px rgba(108, 77, 246, 0.35)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
