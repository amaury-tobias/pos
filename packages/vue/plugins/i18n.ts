import { createI18n } from 'vue-i18n'
import { App } from 'vue'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
  locale: 'es',
  messages,
})

export const installI18n = (app: App) => app.use(i18n)
