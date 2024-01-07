<template>
    <div v-if="deck" class="flex px-8 justify-center items-center flex-col lg:flex-row gap-8">
        <form @submit.prevent="handleUpdateDeck" class="w-full flex flex-col lg:flex-row  gap-5 max-w-2xl">
            <div class="w-full">
                <div class="md:flex md:items-center mb-6 gap-x-4">
                    <div class="w-full">
                        <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            name <span class="text-red-500">*</span>
                        </label>
                        <input v-model="deck.name" required
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" />
                    </div>
                    <div class="w-full">
                        <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            description
                        </label>
                        <input v-model="deck.description"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" />
                    </div>
                </div>
                <div class="mb-6">
                    <div class="flex flex-col gap-4">
                        <button type="submit"
                            class="shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded">
                            Update
                        </button>
                    </div>
                </div>

                <div class="md:flex md:items-center gap-x-4">
                    <div class="w-full">
                    </div>
                    <div class="w-full flex justify-end items-center">
                        <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            public
                        </label>
                        <input v-model="deck.isPublic" class="w-4 h-4" type="checkbox" />
                    </div>
                </div>
            </div>


        </form>
        <div class="w-72">
            <div class="shadow-2xl relative">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            topic list
                        </h3>
                    </div>

                    <div class="px-6 py-3">
                        <p class="hidden md:block text-xs font-normal text-gray-500 dark:text-gray-400">
                            Setting up tags helps you manage tags better
                        </p>
                        <ul class="my-1 overflow-y-auto h-[160px]">
                            <li v-for="topic in topicStore.getTopics" :key="topic.name">
                                <span class="font-medium">{{ topic.name }}</span>
                                <ul class="">
                                    <li v-for="label in topic.labels" :key="label.id"
                                        class="flex items-center py-1 px-2 my-1 text-base">
                                        <i class="fa-solid fa-tag"></i>
                                        <span class="flex-1 ml-3">{{ label.name }}</span>
                                        <input class="w-4 h-4" :value="label.id" v-model="idLabels" type="checkbox">
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notification ref="notification" :message="message" />
</template>

<script>

import { mapStores } from 'pinia'
import { useTopicStore } from '../../stores/useTopicStore.js'
import Notification from '../utilities/Notification.vue'

export default {
    components: { Notification },
    data() {
        return {
            deck: null,
            isShowAlert: false,
            idDeck: this.$route.params.idDeck,
            idLabels: [],
            message: null
        };
    },
    computed: {
        ...mapStores(useTopicStore)
    },
    methods: {
        async handleUpdateDeck() {
            let body = {
                name: this.deck.name,
                description: this.deck.description,
                isPublic: this.deck.isPublic,
                idLabels: this.idLabels
            }
            try {
                let apiResponse = await this.$axios.put('api/v1/decks/' + this.idDeck, body)
                let response = apiResponse.data
                this.deck = response.data
                this.message = response.message
                this.$refs.notification.showAlert()
            }
            catch (error) {
                this.message = "Error!"
                this.$refs.notification.showAlert()
            }
        },
        async getdeckWithId() {
            try {
                let responseApi = await this.$axios.get(`api/v1/decks/${this.idDeck}`)
                let response = responseApi.data
                this.deck = response.data
                this.deck.labels.forEach(label => {
                    this.idLabels.push(label.id)
                })
            }
            catch (error) {
                this.message = "Error!"
                this.$refs.notification.showAlert()
            }

        }

    },
    created() {
        this.getdeckWithId()
    },

}
</script>