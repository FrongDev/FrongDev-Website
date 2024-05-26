/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-white": "var(--white)",
        "frong-color": "var(--frong-color)",
        "content-background-color": "var(--content-background-color)",
      },
      borderColor: {
        "frong-color": "var(--frong-color)",
      },
      borderWidth: {
        "nav-border-width": "var(--nav-border-width)",
        "play-btn-border-width": "var(--play-btn-border-width)",
      },
      fontSize: {
        "dev-post-title-font-size": "var(--dev-post-title-font-size)",
        "dev-post-date-font-size": "var(--dev-post-date-font-size)",
        "dev-post-content-font-size": "var(--dev-post-content-font-size)",
      },
    },
  },
  plugins: [],
};
