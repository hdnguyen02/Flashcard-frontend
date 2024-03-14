import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import axios from './axios' 
import { useUserStore } from './stores/useUserStore.js'
import {auth} from './ufirebase/main.js'

import { onAuthStateChanged } from 'firebase/auth'




const pinia = createPinia()
const app = createApp(App);
app.use(router)
app.use(pinia)
app.mount('#app')
app.config.globalProperties.$axios = axios


const useUser = useUserStore()

onAuthStateChanged(auth, user => {
    if (user) useUser.setAuthenticated(true)    
    else useUser.setAuthenticated(false)
    router.push('/')
})



