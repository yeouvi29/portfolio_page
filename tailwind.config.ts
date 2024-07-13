import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["'Open Sans'", "sans-serif"],
      display: ["'Nunito Sans'", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
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
        "sf-orange": "#FF5A36",
        "sf-green": "#4CAF50",
      },
      backgroundColor: {
        "sf-bg-red": "#C0362C",
        "sf-blue": "#1D6D9B",
        "sf-gray": "#A3A3A3",
        "sf-orange": "#FF5A36",
        "sf-green": "#4CAF50",
      },
      textColor: {
        "sf-red": "#C0362C",
        "sf-blue": "#1D6D9B",
        "sf-gray": "#A3A3A3",
        "sf-orange": "#FF5A36",
        "sf-green": "#4CAF50",
      },
    },
  },
  plugins: [],
};
export default config;
