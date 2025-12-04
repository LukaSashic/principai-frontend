/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // German Authority Color Palette
        'forest-green': '#2C5530',
        'forest-green-dark': '#1E3A21',
        'warm-gold': '#D4AF37',
        'amber-warning': '#F59E0B',
        'charcoal': '#2D3436',
        'cream': '#F8F6F0',
        'light-green': '#E8F5E9',
        'light-gold': '#FFF8E1',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
