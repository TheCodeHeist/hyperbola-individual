import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";
import { skeleton } from "@skeletonlabs/tw-plugin";
import { hyperbolaTheme } from "./hyperbola-official-theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#23cf9b",
          light: "#639c84",
          dark: "#386c5f",
        },
        secondary: {
          light: "#edfdf5",
          dark: "#374b42",
          ash: "#9ab0a6",
        },
        accent: "#00c4ff",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    forms,
    skeleton({
      themes: {
        custom: [hyperbolaTheme],
      },
    }),
  ],
  darkMode: "selector",
};
