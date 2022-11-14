import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

localStorage.setItem('backend', 'https://ars-hd.loca.lt/')
localStorage.setItem('default', 'true')

const app = createApp(App)
app.config.globalProperties.main_url = localStorage.getItem('backend')
app.config.globalProperties.app_name = "Apper"
app.use(router).mount('#app')
