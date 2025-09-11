/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./src/**/*.{ts,js,html}"
  ],
  theme: {
    extend: {},
  },
  // optional safelist for dynamic class names:
  // safelist: ['bg-red-500','bg-green-500', /^text-/],
  plugins: [],
}
