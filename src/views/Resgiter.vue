<template>
    <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

    <div class="min-h-screen flex flex-col items-center justify-center">
        <div class="flex flex-col bg-gray-50 shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div class="font-medium self-center text-sm sm:text-xl uppercase text-gray-800">
                Resgiter To Your Account
            </div>
            <button class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i
                        class="fab fa-facebook-f"></i></span>
                <span>continue with facebook</span>
            </button>
            <div class="relative mt-10 h-px">
                <div class="absolute left-0 top-0 flex justify-center w-full">
                    <span class="px-4 text-xs text-gray-500 uppercase">Or Resgiter With Email</span>
                </div>
            </div>
            <div class="mt-10">
                <form @submit.prevent="registerHandler">
                    <div class="flex flex-col mb-6">
                        <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail
                            Address:</label>
                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>

                            <input v-model="register.email" @focus="forcusEmailHandler" id="email" type="email" required
                                class="text-sm sm:text-base text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="E-Mail Address" />
                        </div>
                        <span class="text-red-600">{{errorRegister.email}}</span>
                    </div>  
                    <div class="flex flex-col mb-6">
                        <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password (8 characters minimum)</label>
                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                            </div>

                            <input v-model="register.password" id="password" type="password" required minlength="8"
                                class="text-sm sm:text-base text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Password" />
                        </div>
                    </div>
                    <!-- * name -->
                    <div class="flex flex-col mb-6">
                        <label for="name" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Name:</label>
                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <i class="fa-solid fa-crown fa-sm"></i>
                            </div>

                            <input v-model="register.name" type="text" id="name" placeholder="Name" required
                                class="text-sm sm:text-base text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                        </div>
                    </div>
                    <!-- * birthdare  -->

                    <div class="flex flex-col mb-6">
                        <label for="birthdate" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Birthdate:</label>
                        <div class="relative">
                            <div
                                class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <i class="fa-regular fa-calendar fa-sm"></i>
                                </span>
                            </div>

                            <input @focus="forcusDateHandler" v-model="register.birthdate" type="date" id="birthdate"
                                class="text-sm sm:text-base text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                        </div>
                        <span class="text-red-600">{{errorRegister.birthdate}}</span>
                    </div>
                    

                
                    <div class="flex w-full">
                        <button type="submit"
                            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                            <span class="mr-2 uppercase">Resgiter</span>
                            <span>
                                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="flex justify-center items-center mt-6">
                <router-link to="/login" class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                    <span>
                      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </span>
                    <span class="ml-2">Do you have an account! Login</span>
                  </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '../stores/useUserStore.js'
export default {
    computed: {
        ...mapStores(useUserStore),
    },
    data() {
        return {
            register: {
                email: null, 
                password: null, 
                name: null, 
                birthdate: null
            }, 
            
            response: null, 
            errorRegister: {}
        
        };
    },
    methods: {
            registerHandler() {       
                if (!this.isValid()) return 
                this.$axios.post("/api/v1/auth/register",this.register)
                    .then(apiResponse => {
                        this.response = apiResponse.data 
                        if (this.response.status == 'failure') throw this.response
                        const token  = this.response.data.token
                        localStorage.setItem("token", token)
                        this.userStore.setAuthenticated(true)
                        this.$router.push("/")

                    })
                    .catch( errorRegister => {
                        this.errorRegister = errorRegister
                    })
             
                  
        },
        forcusEmailHandler() {
            if (this.errorRegister.email) {
                this.errorRegister.email = null 
            }
        }, 

        forcusDateHandler() {
            if (this.errorRegister.birthdate) {
                this.errorRegister.birthdate = null 
            }
        }, 

        isValid(){ 
            const birthDateUserType = new Date(this.register.birthdate) 
            if (birthDateUserType >= Date.now()){
                this.errorRegister.birthdate = "ngày sinh không hợp lệ!"
                return false    
            }
            this.register.name = this.register.name.trim()
            return true
        }, 

        

          
        },
        

        
    
};
</script>
