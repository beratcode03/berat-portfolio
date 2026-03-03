/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', 
        surface: '#121212',    
        primary: '#8b5cf6',    
        'primary-glow': '#a78bfa',
        'code-bg': '#1e1e1e',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}