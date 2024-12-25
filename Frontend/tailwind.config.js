/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      inter: ["Inter", ...defaultTheme.fontFamily.sans],
      montserrat: ["Montserrat", ...defaultTheme.fontFamily.serif],
      neue: ["Bebas Neue", ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [typography, tailwindScrollbarHide],
};

// Main text: #f5f5f5 (off-white)
// Headings: #e0e0e0 (light gray)
// Subheadings: #dcdcdc (gainsboro)
// Links/Buttons: #ffffff (pure white) or a vibrant accent color (like teal or blue)
// Footer or less important text: #b0b0b0 (lighter gray)
// #1DA1F2:
