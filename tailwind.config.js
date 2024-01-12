/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}", "./index.html"],
  theme: {
    extend: {
        colors: {
            default_background: "rgb(243, 243, 243)",
            default_text: "rgb(243, 243, 243)",
        },
    },
    zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
    }
},
  plugins: [],
}