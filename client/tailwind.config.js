/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-white": "var(--white)",
        "frong-color": "var(--frong-color)",
      },
      borderColor: {
        "frong-color": "var(--frong-color)",
      },
      borderWidth: {
        "nav-border-width": "var(--nav-border-width)",
      },
    },
  },
  plugins: [],
};
