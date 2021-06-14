import { App } from 'vue'
import { createPinia } from 'pinia'

export const installPinia = (app: App) => app.use(createPinia())
