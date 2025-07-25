module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        azoMono: ['"AzoMono"', 'monospace'],
        azoSans: ['"AzoSans"', 'sans-serif'],
        azoSuper: ['"AzoSuper"', 'sans-serif'],
        azoSansRegular: ["'AzoSansRegular'", "sans-serif"],
        azoSansMedium: ["'AzoSansMedium'", "sans-serif"],
         azoBlack: ["'AzoSansBlack'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
