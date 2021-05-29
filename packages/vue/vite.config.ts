import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteWindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import ViteI18n from '@intlify/vite-plugin-vue-i18n'

import { external } from '../../package.json'

const _dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '',
  clearScreen: false,
  root: dirname(fileURLToPath(import.meta.url)),
  resolve: {
    alias: {
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      '@': join(process.cwd(), 'packages/vue'),
      '@shared': join(process.cwd(), 'packages/shared'),
      '@locales': join(process.cwd(), 'locales'),
    },
  },
  build: {
    emptyOutDir: true,
    target: 'chrome91',
    outDir: join(process.cwd(), 'dist/source/vue'),
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: join(_dirname, 'index.html'),
      },
    },
  },
  optimizeDeps: {
    exclude: [...external],
  },
  plugins: [
    Vue(),
    ViteWindiCSS(),
    ViteIcons(),
    ViteComponents({
      globalComponentsDeclaration: true,
      dirs: 'components',
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: 'icon',
        }),
      ],
    }),
    ViteI18n({
      include: join(process.cwd(), 'locales/**'),
      compositionOnly: true,
      fullInstall: false,
      runtimeOnly: true,
    }),
  ],
})
