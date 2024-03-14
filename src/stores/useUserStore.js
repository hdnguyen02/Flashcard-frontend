import {defineStore} from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => {
      return {
        isAuthenticated: false 
      }
  }, 
  getters: {
    getIsAuthenticated(state){
      return state.isAuthenticated
    }
  }, 
  
  actions: {
    setAuthenticated(value) { 
      this.isAuthenticated = value
    }
  }
})
