<template>
    <div v-if="user" class="flex px-8 pt-4 justify-center items-center flex-col lg:flex-row gap-8">

        <form @submit.prevent="handleUpdateUser" class="w-full flex flex-col lg:flex-row  gap-5 max-w-2xl">

            <div class="w-full">
                <div class="flex justify-center">
                    <img class="w-48" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png">
                </div>
                <div class="md:flex md:items-center mb-6 gap-x-4">
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Email
                        </span>
                        <input required disabled v-model="user.email"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" />
                    </div>
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Name
                        </span>
                        <input required v-model="user.name"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-6 gap-x-4">
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Role
                        </span>
                        <input disabled v-model="roles"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Birthdate
                        </span>
                        <input type="date" v-model="user.birthdate"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>

                <div class="md:flex md:items-center mb-6">
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Create at
                        </span>
                        <input disabled v-model="user.createAt"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="date" />
                    </div>
                </div>
                <div class="">
                    <div class="flex flex-col gap-4">
                        <button type="submit"
                            class="shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded">
                            Update
                        </button>
                    </div>
                </div>
                <div class="flex justify-between mt-2 cursor-pointer">
                    <router-link to='/change-password' class="text-blue-500">Change password</router-link>
                    <a class="text-blue-500">Upgrade account</a>
                </div>
            </div>
        </form>
    </div>
    <Notification ref="notification"/>
</template>

<script>


import Notification from "../components/utilities/Notification.vue"
export default {
    components: {Notification},
    
    data() {
        return {
            user: null,
            roles: ""
        }
    },
    methods: {
        async getUser() {
            let apiResponse = await this.$axios.get('api/v1/user')
            let response = apiResponse.data
            this.user = response.data
            for (let role of this.user.roles) {
                this.roles += role.name + ","
            }

            this.roles = this.roles.substring(0, this.roles.length - 1)
      
            
        }, 
    
        handleUpdateUser() {
            this.$axios.put('api/v1/user', this.user) // gửi lên user. 
            .then(apiResponse => {
                let response = apiResponse.data 
                this.user = response.data 
                this.$refs.notification.showAlert("Success!")
            })
            .catch(() => {
                this.$refs.notification.showAlert("Failure!")
            })
        }
    },
    created() {
        this.getUser()
    }
}

</script>