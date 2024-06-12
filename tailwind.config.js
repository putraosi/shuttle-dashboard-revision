const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      ...defaultTheme.screens,
    },

    colors: {
      transparent: "transparent",
      modal: "rgba(0, 0, 0, 0.5)",
      white:"#ffffff",
      black: '#1C2434',
      bodydark1: '#DEE4EE',
      bodydark2: '#8A99AF',
      graydark: '#333A48',
      boxdark: '#24303F',
      strokedark: '#2E3A47',
      stroke: '#E2E8F0',

      neutral: {
        10: "#FFFFFF",
        20: "#F6F6F6",
        30: "#EFEFEF",
        40: "#E4E4E4",
        50: "#C9C9C9",
        60: "#AAAAAA",
        70: "#868686",
        80: "#747474",
        90: "#575757",
        100: "#282828",
      },

      primary: {
        main: "#1D8AF5",
        surface: "#E8F2FF",
        border: "#A9D3FC",
        hover: "#1471CC",
        focused: "rgba(29, 138, 245, 0.2)",
        pressed: "#054687",
        disabled: "#BCDCFC",
      },

      primaryAlt: {
        main: "#F77448",
        surface: "#FDF2EC",
        border: "#FDD2C1",
        hover: "#DF7653",
        focused: "rgba(247, 116, 72, 0.2)",
        pressed: "#963F22",
        disabled: "#FDD6C9",
      },

      success: {
        main: "#07A85B",
        surface: "#F0FFF9",
        border: "#A3E2C4",
        hover: "#038C4A",
        focused: "rgba(7, 168, 91, 0.2)",
        pressed: "#006133",
        disabled: "#B5E5CE",
      },

      warning: {
        main: "#F77448",
        surface: "#FDF2EC",
        border: "#F9E0AE",
        hover: "#C58C21",
        focused: "rgba(237, 171, 45, 0.2)",
        pressed: "#855C0F",
        disabled: "#FAE6C0",
      },

      danger: {
        main: "#EA232A",
        surface: "#FFEBEB",
        border: "#F8ABAD",
        hover: "#C3191F",
        focused: "rgba(234, 35, 42, 0.2)",
        pressed: "#82090D",
        disabled: "#F9BDC0",
      },
    },

    dropShadow: {
      1: '0px 1px 0px #E2E8F0',
      2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
    },
    extend: {},
  },
  plugins: [],
};
