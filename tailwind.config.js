module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  important: false,
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
