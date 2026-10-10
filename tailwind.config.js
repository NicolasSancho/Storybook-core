/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./.storybook/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // Closed type scale (not `extend`): these are the only text sizes that exist.
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
    },
    extend: {
      colors: {
        primary: {
          50: "#f9fbfc",
          100: "#f1f7fa",
          200: "#d9e7ef",
          300: "#b8d3e4",
          400: "#90b5d2",
          500: "#6b98c1",
          600: "#457ab0", // 4.5:1 with white: lightest step usable for text
          700: "#0060ab",
          800: "#00548a", // same as DEFAULT
          900: "#00426c",
          950: "#003054",
          DEFAULT: "#00548a",
          lighter: "#0077cc",
          darker: "#003366",
        },
        secondary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c", // same as DEFAULT; 5.2:1 with white, lightest step usable for text
          800: "#9a3412", // same as darker
          900: "#7c2d12",
          950: "#431407",
          DEFAULT: "#c2410c", // 5.2:1 with white (WCAG AA)
          lighter: "#f28b2d", // original brand orange: decorative use only, fails AA with white
          darker: "#9a3412", // 7.3:1 with white
        },
        // Semantic colors: `DEFAULT` for text and icons on white or on `subtle` (all 4.5:1 or
        // better), `subtle` for backgrounds. Always pair with text or an icon, never color alone.
        danger: {
          DEFAULT: "#b91c1c", // 6.5:1 with white
          subtle: "#fef2f2",
        },
        success: {
          DEFAULT: "#15803d", // 5.0:1 with white
          subtle: "#f0fdf4",
        },
        warning: {
          DEFAULT: "#92400e", // 7.1:1 with white
          subtle: "#fef3c7",
        },
        // Gray scale (`--gray-*` in src/styles/tailwind.css). Jobs: 900 body text, 600 secondary
        // text, 500 placeholder, 400 input borders (3:1), 200 dividers, 50 page background.
        // 100 to 300 are never for text.
        neutral: {
          25: "rgb(var(--gray-25) / <alpha-value>)",
          50: "rgb(var(--gray-50) / <alpha-value>)",
          100: "rgb(var(--gray-100) / <alpha-value>)",
          200: "rgb(var(--gray-200) / <alpha-value>)",
          300: "rgb(var(--gray-300) / <alpha-value>)",
          400: "rgb(var(--gray-400) / <alpha-value>)",
          500: "rgb(var(--gray-500) / <alpha-value>)",
          600: "rgb(var(--gray-600) / <alpha-value>)",
          700: "rgb(var(--gray-700) / <alpha-value>)",
          800: "rgb(var(--gray-800) / <alpha-value>)",
          900: "rgb(var(--gray-900) / <alpha-value>)",
          950: "rgb(var(--gray-950) / <alpha-value>)",
        },
      },
      screens: {
        xs: "0px",
        sm: "640px",
        md: "940px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
