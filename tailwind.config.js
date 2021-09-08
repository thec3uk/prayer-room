module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {},
  variants: {
    extend: {
      backgroundColor: ["hover-hover", "hover-none"],
    },
  },
  plugins: [require("tailwindcss-touch")()],
};
