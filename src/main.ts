import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'
const app = createApp(App)

app.use(router)
app.use(NutUI)
app.mount('#app')
