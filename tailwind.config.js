const { Primary } = require("@storybook/blocks");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./.storybook/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00548a",
          lighter: "#0077cc",
          darker: "#003366",
        },
        secondary: {
          DEFAULT: "#f28b2d",
          lighter: "#f5a623",
          darker: "#d86e00",
        },
        text: {
          25: "rgb(var(--gray-25))",
          50: "rgb(var(--gray-50))",
          100: "rgb(var(--gray-100))",
          200: "rgb(var(--gray-200))",
          300: "rgb(var(--gray-300))",
          400: "rgb(var(--gray-400))",
          500: "rgb(var(--gray-500))",
          600: "rgb(var(--gray-600))",
          700: "rgb(var(--gray-700))",
          800: "rgb(var(--gray-800))",
          900: "rgb(var(--gray-900))",
          950: "rgb(var(--gray-950))",
        },
      },
      fontSize: {
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
      },
      borderRadius: {
        btn: "4px",
        card: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
        32: "8rem", // 128px
        40: "10rem", // 160px
        48: "12rem", // 192px
        56: "14rem", // 224px
        64: "16rem", // 256px
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      width: {
        "icon-small": "1rem", // 16px
        "icon-medium": "1.5rem", // 24px
        "icon-large": "2rem", // 32px
      },
      height: {
        "icon-small": "1rem", // 16px
        "icon-medium": "1.5rem", // 24px
        "icon-large": "2rem", // 32px
      },
    },
  },
  plugins: [],
};
