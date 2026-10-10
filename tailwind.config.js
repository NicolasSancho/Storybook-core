/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./.storybook/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
        // Same gray scale as `text`, under a name that also reads well for borders and backgrounds
        // (`bg-neutral-100`, `border-neutral-400`). 100 to 300 are never for text.
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
        xs: "0px",
        sm: "640px",
        md: "940px",
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
