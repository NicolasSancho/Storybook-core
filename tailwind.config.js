/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'dark-coffee': '#4A2C2A',
        'light-coffee': '#7B503F',

        // Secondary Colors
        cream: '#F5E6D3',
        espresso: '#2B1B17',

        // Accent Colors
        amber: '#C57B57',
        olive: '#7A754E',

        // Neutral Colors
        'warm-white': '#FAF8F5',
        'soft-gray': '#D8D5D2',
      },
      fontFamily: {
        // Add your custom fonts
        heading: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
      },
      fontSize: {
        // Font sizes matching your design
        'h1': ['48px', '56px'], // font-size and line-height
        'h2': ['36px', '44px'],
        'h3': ['28px', '36px'],
        'body': ['16px', '24px'],
        'small': ['14px', '20px'],
        'button': ['16px', '24px'],
      },
      borderRadius: {
        'btn': '4px',
        'card': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};