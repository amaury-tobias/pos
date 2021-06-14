import { App } from 'vue'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
}

export const installToast = (app: App) => app.use(Toast, options)
