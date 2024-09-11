import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:
  {
    extend: 
    {
      backgroundImage: 
      {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: 
      {
        "96": "75vw"
      },
      gap:
      {
        "40": "82vh"
      },
      spacing: 
      {
        "minus-y-translate": "-5vh"
      }
    },
  },
  plugins: [],
};
export default config;
