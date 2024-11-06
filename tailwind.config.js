/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: ["./src/*.tsx", "./src/**/*.tsx"],
  plugins: [daisyui],
  daisyui: { themes: false }
}

