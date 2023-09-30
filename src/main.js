import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import instance from './axios' 


const pinia = createPinia()
const app = createApp(App); 
app.use(router)
app.use(pinia)
app.mount('#app')

app.config.globalProperties.$axios = instance