import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080', 
    timeout: 2000
});

instance.interceptors.request.use(
    config => {
        const idToken = localStorage.getItem("idToken") 
        if (idToken) {
            config.headers.Authorization = `Bearer ${idToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error) 
    }
)

export default instance