module.exports = {
  mode: "jit",
  content: ["./app/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-color-hover": "var(--primary-color-hover)",
        "secondary-color": "var(--secondary-color)",
        "secondary-color-hover": "var(--secondary-color-hover)",
      }
    },
    fontFamily: {
      sans: ["Assistant", "sans-serif"],
      serif: ["Bitter", "serif"],
      mono: ["FiraCode", "monospace"],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
