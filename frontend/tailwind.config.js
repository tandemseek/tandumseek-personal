module.exports = {
  content: ["./frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Tailwind green-500
          dark: '#059669',
          light: '#6EE7B7',
        },
      },
    },
  },
  plugins: [],
};
