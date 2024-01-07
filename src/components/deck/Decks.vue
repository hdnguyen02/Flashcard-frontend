<template>
    <div class="mx-24">
        <div v-if="decks!=null">
            <div>
                <div class="text-sm ml-1 flex flex-col md:flex-row gap-3 text-gray-500">
                    <span class="font-medium">{{ decks.length }} Deck</span>
                    <span class="hidden md:block">|</span>
                    <span class="font-medium">Create by hdnguyen</span>
                    <span class="hidden md:block">|</span>  
                    <span class="font-medium">Student</span>
                </div>
            </div>
            <div class="mt-8">
                <div class="relative" v-for="deck in decks" :key="deck.id" :data-id-deck="deck.id">
                    <router-link :to="`/decks/${deck.id}/study`"
                        class="mb-3 flex flex-col gap-1 hover-pointer py-2 px-4 bg-white border border-gray-200 hover:border-b-purple-500 border-b-4  rounded-lg shadow-lg">
                        <span class="text-sm md:text-xl font-semibold tracking-tight text-gray-900">{{ deck.name }}</span>
                        <span class="text-sm font-semibold text-gray-600">{{ deck.cardNumber }} card</span>
                    </router-link>


                     <div class="absolute top-6 right-4 flex gap-x-3 text-gray-500">
                        <router-link :to="`/decks/${deck.id}/update`" class="underline cursor-pointer">
                             <i class="ml-1 fa-solid fa-pen-to-square"></i>
                        </router-link>
                        <a :data-id-deck="deck.id" @click="handleClickDeleteDeck" class="underline cursor-pointer">
                           <i class="fa-solid fa-trash-can"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="decks?.length==0">
            <div class="flex justify-center gap-x-5">
                <p class="text-xl">Chưa có bộ thẻ</p>
                <router-link to="/decks/create" class="text-xl text-blue-600 underline">
                    Tạo bộ thẻ
                </router-link>
            </div>
        </div>

    <ConformDelete :isShowConform="isShowConform" @click-conform="handleDeleteDeck" @click-cancel="handleCancelDelete"></ConformDelete>
    </div>
</template>

<script>

import Conform from '../Conform.vue'

export default {

    components: {
        ConformDelete: Conform
    }, 
    data() {
        return {
            isShowConform: false,
            decks: null, 
            idDeckDelete: null
        }

    },
    methods: {
        getDecks() {
            this.$axios.get('/api/v1/decks')
                .then(apiResponse => {
                    const response = apiResponse.data
                    this.decks = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }, 
        handleClickDeleteDeck(event) { 
            this.isShowConform = true
            let curentTarget =  event.currentTarget 
            this.idDeckDelete =  curentTarget.dataset.idDeck
        }, 
        async handleDeleteDeck() {
            this.isShowConform = false 
            await this.$axios.delete(`api/v1/decks/${this.idDeckDelete}`) 
            this.getDecks()
        }, 
        handleCancelDelete() {
            this.isShowConform = false
        }
    },
    created() {
        this.getDecks()
    },
}
</script>