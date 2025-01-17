/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        monts: ['Montserrat', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      }
    }
  },
  plugins: []
}
