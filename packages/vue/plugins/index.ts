import { App } from 'vue'
import { installI18n } from '@/plugins/i18n'
import { installRouter } from '@/plugins/router'
import { installPinia } from '@/plugins/pinia'
import { installToast } from '@/plugins/toast'

export const installPlugins = (app: App) => {
  installPinia(app)
  installRouter(app)
  installI18n(app)
  installToast(app)
}
