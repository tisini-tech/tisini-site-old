/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,js,jsx,mdx,sass,css,scss}"],
  theme: {
    fontFamily: {
      catamaran: ["Catamaran", "Inter", "sans-serif"],
      "noto-serif": ["Noto Serif", "serif"],
    },
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          lightest: "#8AB6D6",
          lighter: "#418FB9",
          DEFAULT: "#0092E0",
          darker: "#031B29",
          darkest: "#010E15",
        },
        secondary: {
          lightest: "#FFE7AA",
          lighter: "#FFD166",
          DEFAULT: "#EF6F00",
          darker: "#BF5400",
          darkest: "#8F3F00",
        },
        light: {
          DEFAULT: "#FDFDFD",
          darker: "#F1F1F1",
        },
        black: {
          lighter: "#1C1C1C",
          DEFAULT: "#121212",
        },
        christie: {
          DEFAULT: "#75bce2",
        },
      },
      backgroundImage: {
        homeLg: "url('/src/assets/img/home-pitch-lg.png')",
        homeSm: "url('/src/assets/img/home-pitch.png')",
        awayLg: "url('/src/assets/img/away-pitch-lg.png')",
        awaySm: "url('/src/assets/img/away-pitch.png')",
        heroT: "url('src/assets/img/footballer-min.jpg')",
        heroS: "url('src/assets/tournaments/hero.jpg')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
