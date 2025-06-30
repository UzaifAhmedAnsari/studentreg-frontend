// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nayi aur vibrant purple-based color palette (humans.tech inspired)
        primary: '#7C3AED',       // Gehra, vibrant purple (Violet-600)
        'primary-dark': '#6D28D9', // Primary ka thora gehra shade
        'primary-light': '#8B5CF6',// Primary ka halka shade
        'primary-lightest': '#EDE9FE', // Bohat halka purple background
        secondary: '#10B981',     // Fresh Emerald green for accents
        'secondary-dark': '#047857', // Emerald ka gehra shade
        accent: '#EF4444',        // Bright Red for danger/accent (Red-500)
        background: '#F9FAFB',    // Overall app ka background (Very light gray)
        surface: '#FFFFFF',       // Card aur modal surfaces (Clean White)
        heading: '#1F2937',       // Headings ke liye dark text (Gray-900)
        body: '#4B5563',          // Paragraphs ke liye thora halka text (Gray-600)
        'border-light': '#E5E7EB',// Borders aur dividers
        'dark-mode-bg': '#1A202C', // Dark mode ka background (future proofing)
        'dark-mode-surface': '#2D3748', // Dark mode surfaces
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Inter font family
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'strong': '0 10px 15px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      keyframes: { // Custom keyframes for animations
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-bg': {
          '0%, 100%': { backgroundColor: 'var(--tw-colors-primary)' },
          '50%': { backgroundColor: 'var(--tw-colors-primary-light)' },
        },
      },
      animation: { // Custom animation utilities
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'pulse-bg': 'pulse-bg 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
