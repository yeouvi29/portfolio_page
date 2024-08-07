import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-lato)"],
      display: ["var(--font-montserrat)"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1248px",
      "2xl": "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "sf-red": "#C0362C",
        "sf-blue": "#1D6D9B",
        "sf-gray": "#A3A3A3",
        "sf-orange": "#FD5A1E",
        "sf-green": "#4CAF50",
      },
      backgroundColor: {
        "sf-red": "#C0362C",
        "sf-blue": "#1D6D9B",
        "sf-gray": "#A3A3A3",
        "sf-orange": "#FD5A1E",
        "sf-green": "#4CAF50",
      },
      textColor: {
        "sf-red": "#C0362C",
        "sf-blue": "#1D6D9B",
        "sf-gray": "#A3A3A3",
        "sf-orange": "#FD5A1E",
        "sf-green": "#4CAF50",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hover", [
        "@media (hover: hover) { &:hover }",
        "@media (hover: none) { &:active }",
      ]);
    }),
  ],
};
export default config;
