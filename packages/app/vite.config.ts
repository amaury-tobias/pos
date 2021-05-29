import { dirname, join } from 'path'
import { builtinModules } from 'module'
import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import { external } from '../../package.json'

export default defineConfig({
  clearScreen: false,
  root: dirname(fileURLToPath(import.meta.url)),
  resolve: {
    alias: {
      '@app': join(process.cwd(), 'packages/app'),
      '@shared': join(process.cwd(), 'packages/shared'),
    },
  },
  build: {
    emptyOutDir: true,
    sourcemap: 'inline',
    target: 'node15',
    outDir: join(process.cwd(), 'dist/source/app'),
    minify: process.env.NODE_ENV === 'development' ? false : 'terser',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [...builtinModules, ...external, 'electron'],
      output: { entryFileNames: '[name].cjs' },
    },
  },
})
