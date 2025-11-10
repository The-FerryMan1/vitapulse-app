import './assets/main.css'
import '@/axios/useInterceptor'
import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/useUser'

const app = createApp(App)

app.use(createPinia())

const auth = useUserStore()
await auth.verify()

app.use(router)
app.use(ui)

app.mount('#app')
