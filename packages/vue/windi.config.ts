import { defineConfig } from 'vite-plugin-windicss'
import aspect from 'windicss/plugin/aspect-ratio'

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  extract: {
    include: ['./**/*.{vue,tsx,css}'],
  },
  plugins: [aspect],
})
