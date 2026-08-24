module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        geist: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        dark: {
          DEFAULT: '#1F2937',
          light: '#374151',
          lighter: '#4B5563',
        },
        // InteHR design system tokens (see DESIGN.MD §09)
        canvas: {
          DEFAULT: '#F7F7F5',
          dark: '#0D0D0D',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#141414',
        },
        subtle: {
          DEFAULT: '#F2F2EF',
          dark: '#1A1A1A',
        },
        ink: {
          DEFAULT: '#171717',
          dark: '#F5F5F2',
        },
        muted: {
          DEFAULT: '#525252',
          dark: '#A3A3A0',
        },
        faint: {
          DEFAULT: '#8A8A8A',
          dark: '#737370',
        },
        line: {
          DEFAULT: '#E5E5E2',
          dark: '#292929',
        },
        line2: {
          DEFAULT: '#D4D4D0',
          dark: '#3A3A3A',
        },
        accent: {
          DEFAULT: '#E4572E',
          hover: '#C94321',
        },
        success: { DEFAULT: '#16803C' },
        warning: { DEFAULT: '#B45309' },
        danger: { DEFAULT: '#C2413A' },
        info: { DEFAULT: '#525252' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light', // Menggunakan tema default dari DaisyUI
      'dark',  // Menggunakan tema default dari DaisyUI
    ],
  },
}
