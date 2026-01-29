/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The "Academic Blue" - trustworthy and professional
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', 
          600: '#0284c7',
          700: '#0369a1', 
        },
        // The "Stress System" - clear indicators for workload
        stress: {
          low: '#22c55e',    // Green
          medium: '#eab308', // Amber
          high: '#ef4444',   // Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}