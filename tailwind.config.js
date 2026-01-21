export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Backgrounds */
        "light-primary": "var(--light-primary)",
        "light-secondary": "var(--light-secondary)",
        "dark-primary": "var(--dark-primary)",
        "dark-secondary": "var(--dark-secondary)",

        /* Text */
        "text-light-primary": "var(--text-light-primary)",
        "text-light-secondary": "var(--text-light-secondary)",
        "text-dark-primary": "var(--text-dark-primary)",
        "text-dark-secondary": "var(--text-dark-secondary)",
      },
      fontFamily: {
        sans: ["Lexend", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
