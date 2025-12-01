/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
        keyframes: {
            slideIn: {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
            },
        },
        animation: {
            slideIn: 'slideIn 0.4s ease-out forwards',
        },

      borderRadius: {
        // Apple-inspired border radius values
        // Based on continuous curve principle
        'apple-xs': '4px',   // Small elements (buttons, badges)
        'apple-sm': '8px',   // Input fields
        'apple-md': '12px',  // Cards, panels
        'apple-lg': '16px',  // Large cards
        'apple-xl': '20px',  // Modals, containers
        'apple-2xl': '24px', // Hero sections
        'apple-3xl': '28px', // Large features
      },
    },
  },
  plugins: [],
}
