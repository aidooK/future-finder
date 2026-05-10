/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          primary: '#D32F2F',
          dark: '#B71C1C',
          light: '#FFCDD2',
          muted: '#FFEBEE',
        },
        dark: '#1A1A1A',
        charcoal: '#333333',
        muted: '#666666',
        border: '#E5E5E5',
        surface: '#F5F5F5',
      },
      fontFamily: {
        heading: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-lato)', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333333',
            maxWidth: 'none',
            a: { color: '#D32F2F' },
            h1: { fontFamily: 'var(--font-oswald)', color: '#1A1A1A' },
            h2: { fontFamily: 'var(--font-oswald)', color: '#1A1A1A' },
            h3: { fontFamily: 'var(--font-oswald)', color: '#1A1A1A' },
          }
        }
      }
    },
  },
  plugins: [],
}
