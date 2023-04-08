/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  content: ["./src/pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "masto-violet": "#6364ff",
      },
    },
  },
  plugins: [],
};
