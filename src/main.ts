import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

localStorage.setItem('backend', 'http://127.0.0.1:8000/')
localStorage.setItem('default', 'true')

const app = createApp(App)
app.config.globalProperties.main_url = localStorage.getItem('backend')
app.config.globalProperties.app_name = "Apper"
app.use(router).mount('#app')
