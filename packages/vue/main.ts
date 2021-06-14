import { createApp } from 'vue'
import App from '@/App.vue'
import { installPlugins } from '@/plugins'
import 'virtual:windi.css'

const app = createApp(App)
installPlugins(app)
app.mount('#app')
