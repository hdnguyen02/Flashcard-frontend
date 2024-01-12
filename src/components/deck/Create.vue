<template>
    <div>
        <h3 class="font-bold text-2xl text-center">Create deck</h3>
    </div>

    <div v-if="deck" class="pt-4 flex px-8 justify-center items-center flex-col lg:flex-row gap-8">
        <form @submit.prevent="handleCreateDeck" class="w-full flex flex-col lg:flex-row  gap-5 max-w-2xl">
            <div class="w-full">
                <div class="md:flex md:items-center mb-6 gap-x-4">
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            name <span class="text-red-500">*</span>
                        </span>
                        <input v-model="deck.name" required
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" />
                    </div>
                    <div class="w-full">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            description
                        </span>
                        <input v-model="deck.description"
                            class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" />
                    </div>
                </div>
                <div class="mb-6">
                    <div class="flex flex-col gap-4">
                        <button type="submit"
                            class="shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded">
                            Create
                        </button>
                    </div>
                </div>

                <div class="md:flex md:items-center gap-x-4">
                    <div class="w-full">
                        <router-link to="/decks">deck list</router-link>
                    </div>
                    <div class="w-full flex justify-end items-center">
                        <span class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            public
                        </span>
                        <input v-model="deck.isPublic" class="w-4 h-4" type="checkbox" />
                    </div>
                </div>
            </div>


        </form>
        <div class="w-72">
            <div class="shadow-2xl relative">
                <div class="relative bg-white rounded-lg shadow">

                    <div class="px-6 py-4 border-b rounded-t">
                        <h3 class="text-base font-semibold text-gray-900 lg:text-xl"> 
                            topic list
                        </h3>
                    </div>

                    <div class="px-6 py-3">
                        <p class="hidden md:block text-xs font-normal text-gray-500">
                            Setting up tags helps you manage tags better
                        </p>
                        <ul class="my-1 overflow-y-auto h-[160px]">
                            <li v-for="topic in topicStore.getTopics" :key="topic.name">
                                <span>Topic: {{topic.name}}</span>
                                <ul class="">
                                    <li v-for="label in topic.labels" :key="label.id" class="my-1 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                                        <i class="fa-solid fa-tag"></i>
                                        <span class="flex-1 ml-3 whitespace-nowrap">{{label.name}}</span>
                                        <input class="h-4 w-4" :value="label.id" v-model="deck.idLabels"  type="checkbox"> 
                                    </li>
                                </ul>
                            </li>   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notification ref="notification"/>

</template>

<script>

import { mapStores } from 'pinia'
import { useTopicStore } from '../../stores/useTopicStore.js'
import Notification from '../utilities/Notification.vue'

export default {
    data() {
        return {
            deck: {
                name: null,
                description: null,
                isPublic: true,
                idLabels: [] 
            },
        };
    },
    computed: {
        ...mapStores(useTopicStore)
    },
    methods: {
        async handleCreateDeck() {
            try { 
                await this.$axios.post("api/v1/decks", this.deck)
                this.message = "Create deck success!"
                this.$refs.notification.showAlert("Success!")
                
            }
            catch(error) {
                this.$refs.notification.showAlert("Failure!")
            }
            this.deck.name = this.deck.description = null
            this.isPublic = true 
            this.idLabels = []
            
        },
    },
    components: { Notification }
}
</script>