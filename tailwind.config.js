/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: "rgba(115,115,115,0.1)", // neutral-500 with opacity for backgrounds
          foreground: "#737373", // neutral-500 for secondary text
        },
      },
    },
  },
  plugins: [],
};
