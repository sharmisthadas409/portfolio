/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables the dark theme
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 8s ease-in-out infinite',
        'rotate': 'rotate 3s linear infinite',
        'pop-up': 'popUp 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.3' },
            '50%': { transform: 'translateY(-30px) rotate(180deg)', opacity: '0.6' },
        },
        rotate: {
            'from': { transform: 'rotate(0deg)' },
            'to': { transform: 'rotate(360deg)' },
        },
        popUp: {
            '0%': { opacity: '0', transform: 'translateY(10px) scale(0.9)' },
            '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        }
      },
    },
  },
  plugins: [],
}
