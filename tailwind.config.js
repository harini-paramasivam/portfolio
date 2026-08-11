/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0E1A',
        panel: '#0F1424',
        panel2: '#131A2E',
        indigo: '#6366F1',
        cyan: '#22D3EE',
        violet: '#A78BFA',
        ink: '#E8EAF2',
        muted: '#8B93A7',
        line: 'rgba(232,234,242,0.08)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
