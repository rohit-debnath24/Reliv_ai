// Tailwind config for dynamic hero selection UI
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-orange': '#f97316',
        'brand-dark': '#1f2937',
        'card-dark': '#2A1A1A',
        'card-glass': 'rgba(100, 116, 139, 0.4)',
      },
      boxShadow: {
        'glow': '0 0 40px -5px rgba(249, 115, 22, 0.5)',
        'inner-white': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px 10px #f97316' },
          '50%': { boxShadow: '0 0 60px 20px #f97316' },
        },
        wave: {
          '0%': { boxShadow: '0 0 0 0 #facc15' },
          '70%': { boxShadow: '0 0 30px 20px #facc15' },
          '100%': { boxShadow: '0 0 0 0 #facc15' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.2s infinite',
        'wave': 'wave 1.5s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
