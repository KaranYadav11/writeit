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
