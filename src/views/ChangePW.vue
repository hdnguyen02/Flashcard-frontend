<template>

        <div class="pt-8 flex flex-col items-center justify-center px-6 mx-auto">

            <div class="w-full rounded-lg shadow-lg md:mt-0 sm:max-w-md sm:p-8">
                <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Change Password
                </h2>
                <form @submit.prevent="handleChangePassword" class="mt-4 space-y-4 md:space-y-5" action="#">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                        <input type="password" v-model="password.oldPassword"  placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>
            
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input type="password" v-model="password.newPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" >
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" v-model="password.conformPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>
                 
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Change Password</button>
                </form>
            </div>
        </div>
        <Notification ref="notification"/>
</template>



<script>
    import Notification from "../components/utilities/Notification.vue"
    export default { 
        components: {Notification},
        data(){
            return { 
                password: {
                    oldPassword: null, 
                    newPassword: null, 
                    conformPassword: null
                }, 
            }
        }, 
        methods: {
            handleChangePassword() {
                this.$axios.put('api/v1/password', this.password) 
                .then(() => {
                    this.$refs.notification.showAlert("Success!")
                    this.password.oldPassword = this.password.newPassword = this.password.conformPassword = null
                })
                .catch(() => {
                    this.$refs.notification.showAlert("Failure!")
                })
            }
        }
    }
</script>