/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    /**
     * @see https://github.com/vercel/satori
     */
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
