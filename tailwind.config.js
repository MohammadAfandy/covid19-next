module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        innerlight: '0px 0px 0px 0px hsla(0,0%,100%,0.6),0px 0px 0px 0px hsla(0,0%,100%,0.6),0px 0px 0px 0px rgba(0,0,0,0.07),0px 0px 0px 0px rgba(0,0,0,0.07),inset -7px -7px 20px 0px hsla(0,0%,100%,0.6),inset -4px -4px 5px 0px hsla(0,0%,100%,0.6),inset 7px 7px 20px 0px rgba(0,0,0,0.2),inset 4px 4px 5px 0px rgba(0,0,0,0.07)',
        innerdark: '0px 0px 0px hsla(0,0%,100%,0.05),0px 0px 0px rgba(0,0,0,0.5),inset -5px -5px 10px hsla(0,0%,100%,0.05),inset 5px 5px 15px rgba(0,0,0,0.5)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
