<template>
  <div class="flex flex-col items-center mx-8">
    <div class="flex flex-col bg-gray-50 shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
      <div class="font-medium self-center text-sm sm:text-xl uppercase text-gray-800">Login To Your Account</div>
      <button @click="handleSignInGoogle"
        class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-300">
        <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-red-600"><i
            class="fa-brands fa-google text-xl"></i></span>
        <span class="font-medium text-lg">login with google</span>
      </button>
      <div class="relative mt-10 h-px">
        <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span class="px-4 text-lg font-medium">Or Login With Email</span>
        </div>
      </div>
      <div class="mt-10">
        <form @submit.prevent="loginHandler">
          <div class="flex flex-col mb-6">
            <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>

              <input @focus="errorLogin = null" v-model="email" id="email" type="email"
                class="text-sm sm:text-base text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="E-Mail Address" />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>

              <input @focus="errorLogin = null" v-model="password" id="password" type="password"
                class="text-sm sm:text-base text-black placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Password" />
            </div>
            <span v-if="errorLogin" class="text-red-500">{{ errorLogin }}</span>
          </div>

          <div class="flex items-center mb-6 -mt-4">
            <div class="flex ml-auto">
              <a href="#" class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your
                Password?</a>
            </div>
          </div>

          <div class="flex w-full">
            <button type="submit"
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
              <span class="mr-2 uppercase">Login</span>
              <span>
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
      <div class="flex justify-center items-center mt-6">
        <router-link to="/register"
          class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
          <span>
            <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              viewBox="0 0 24 24" stroke="currentColor">
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </span>
          <span class="ml-2">You don't have an account?</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../ufirebase/main'
export default {
  data() {
    return {
      email: null,
      password: null,
      errorLogin: null 
    }
  },

  methods: {
    async loginHandler() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        const idToken = await userCredential.user.getIdToken()
        localStorage.setItem("idToken", idToken)
        this.$router
       
      }
      catch (error) {
        this.errorLogin = error.code
      }
    },
    async handleSignInGoogle() {
      const provider = new GoogleAuthProvider()
      
      try {
        const userCredential = await signInWithPopup(auth, provider)
        const idToken = await userCredential.user.getIdToken()
        localStorage.setItem("idToken", idToken)

        const uid = userCredential.user.uid
        const email = userCredential.user.email
        this.$axios.post('api/v1/register', {uid, email})
      }
      catch (error) {
        this.errorLogin = error.code
      }
    }
  }
}
</script>