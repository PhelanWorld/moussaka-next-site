/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { plum: '#4A1F3D', cream: '#F5EFE6', olive: '#6D7B52', gold: '#C7A36B' }, fontFamily: { serif: ['\'Playfair Display\'', 'serif'], sans: ['Inter','ui-sans-serif','system-ui','sans-serif'] } } },
  plugins: [],
};
