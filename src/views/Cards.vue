<template>
    <div v-if="cards">
        <button class="ml-8 flex items-center gap-x-2 md:hidden bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            <span>Filter</span>
            <span><i class="fa-solid fa-filter text-xs"></i></span>
        </button>
        <div class="border-b md:block mt-2 md:mt-0 pb-2 md:bg-inherit px-8 md:border-r md:fixed md:top-0 md:bottom-0 md:left-0 md:pl-8 md:w-60 md:overflow-y-auto md:h-screen md:pt-20">
            
            <div class="mt-4 ml-4"> 
                <div class="my-2">
                    <button @click="handleDeleteCards" class="w-32 inline-flex h-8 text-sm items-center justify-center px-4 py-2  leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600">
                        <span class="ml-2">Delete card</span>
                    </button>
                </div>

                <div class="my-2">
                    <button @click="isShowAssignTag = true" class="text-white w-32 inline-flex h-8 text-sm items-center justify-center px-4 py-2  leading-6 whitespace-no-wrap bg-yellow-600 border border-yellow-700 rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" data-rounded="rounded-md" data-primary="blue-600">
                        <span class="ml-2">Assign tag</span>
                    </button>
                </div>
                <div class="my-2">
                    <button @click="handleDeleteFilter" class="text-white w-32 inline-flex h-8 text-sm items-center justify-center px-4 py-2  leading-6 whitespace-no-wrap bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" data-rounded="rounded-md" data-primary="blue-600">
                        <span class="ml-2">Delete filter</span>
                    </button>
                </div>
            </div>

            <hr class="mt-8">
            
            <div>
                <!-- <p class="hidde md:block text-xl font-medium text-center border-b pb-2">Filter</p> -->
                <div>
                    <div class="mt-4 ml-4">
                        <span class="font-medium">Bộ thẻ</span>
                        <div v-for="deck in decks" :key="deck.id" class="flex items-center my-1">
                            <input :value="deck.id" v-model="valueFilter" data-type-filter="id-deck" name="value-filter"
                                type="radio" class="w-4 h-4 text-blue-600  border-gray-300">
                            <label class="ms-2 text-sm">{{ deck.name }}</label>
                        </div>
                    </div>
                </div>
                <div>

                    <div class="mt-4 ml-4">
                        <span class="font-medium">Loại</span>
                        <div class="flex items-center my-1">
                            <input data-type-filter="type" value="LEARNING" v-model="valueFilter" name="value-filter"
                                type="radio" class="w-4 h-4 text-blue-600  border-gray-300">
                            <label class="ms-2 text-sm">Thẻ đang học</label>
                        </div>
                        <div class="flex items-center my-1">
                            <input data-type-filter="type" type="radio" value="REVIEW" name="value-filter"
                                v-model="valueFilter" class="w-4 h-4 text-blue-600  border-gray-300">
                            <label class="ms-2 text-sm">Thẻ review</label>
                        </div>
                        <div class="flex items-center my-1">
                            <input data-type-filter="type" type="radio" value="FRESH" name="value-filter"
                                v-model="valueFilter" class="w-4 h-4 text-blue-600  border-gray-300">
                            <label class="ms-2 text-sm">Thẻ mới</label>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mt-4 ml-4">
                        <span class="font-medium">Tags</span>
                        <div v-for="tag in tags" :key="tag.id" class="flex items-center my-1">
                            <input v-model="valueFilter" :value="tag.name" data-type-filter="tags" name="value-filter"
                                type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300">
                            <label class="ms-2 text-sm">{{ tag.name }}</label>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                
            </div>
        </div>

        <div class="mt-4 md:mt-0 md:ml-60 px-8 md:px-16">
            <table v-if="cards.length != 0" class="">
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="(card, index) in cards" :data-flag="card.id">
                        <td class="py-2 px-2 text-sm text-gray-800">
                            <input type="checkbox" :value="index"
                                class="w-4 h-4 mt-2 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-6 dark:bg-gray-700 dark:border-gray-600">
                        </td>
                        <td class="py-2 px-2 first-letter:first-line:  dark:text-gray-200">{{ card.term }}</td>
                        <td class="py-2 px-2">{{ card.definition }}</td>
                        <td class="py-2 px-2">
                            <span :data-type-card="card.type" style="width: 80px;"
                                class="block text-center p-1 rounded bg-gray-700 text-xs">{{ card.type }}</span>
                        </td>
                        <td class="py-2 px-2">
                            <button :data-flag-btn-show-detail="index" @click="handleShowDetail(index)"
                                class=" underline cursor-pointer">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-else>
                <div class="flex justify-center gap-x-5">
                    <p  class="text-blue-600">
                        Card does not exist
                    </p>
                </div>
            </div>
        </div>

        <div v-if="isShowDetail">
            <Detail :decks="decks" :tags="tags" :card="card" @close="handleColose"></Detail>
        </div>
        <div v-if="isShowAssignTag">
            <AssignTag @assignTag="handleAssignTag" @closeAssignTag="handleCloseAssignTag" />
        </div>
    </div>
    
    <Notification ref="notification"/>
</template>
<script>

import Detail from '../components/card/Detail.vue'
import AssignTag from '../components/AssignTag.vue'
import Notification from '../components/utilities/Notification.vue'
export default {
    components: { Detail, AssignTag, Notification },
    data() {
        return {
            cards: null,
            decks: null,
            tags: null,
            valueFilter: null,
            card: null,
            isShowDetail: false,
            isShowAssignTag: false,
            
        };
    },
    methods: {
        async getCards(filter, value) {
            let api;
            if (filter != null && value != null) {
                api = `api/v1/cards?filter=${filter}&value=${value}`
            }
            else {
                api = `api/v1/cards`
            }
            const apiResponse = await this.$axios.get(api)
            const response = apiResponse.data
            this.cards = response.data
        },
        async getDecks() {
            const apiResponse = await this.$axios.get(`api/v1/decks`)
            const response = apiResponse.data
            this.decks = response.data
        },
        async getTags() {
            const apiResponse = await this.$axios.get(`api/v1/tags`)
            const response = apiResponse.data
            this.tags = response.data
        },
        handleColose() {
            this.isShowDetail = false
        },
        handleShowDetail(index) {
            this.card = this.cards[index]
            this.isShowDetail = true
        },
        handleCloseAssignTag() {
            this.isShowAssignTag = false
        },
        handleDeleteCards() {
            let checkboxElements = document.querySelectorAll('input[type="checkbox"]:checked')
            for (let el of checkboxElements) {
                let idCard = this.cards[+el.value].id
                this.$axios.delete(`api/v1/cards/${idCard}`)
                    .then(() => {
                        el.disabled = true
                        document.querySelector(`[data-flag='${idCard}']`).classList.add('card-delete')
                        document.querySelector(`[data-flag-btn-show-detail='${idCard}']`).disabled = true
                    })
            }
        },
        async handleAssignTag(nameTag) {
            let checkboxElements = document.querySelectorAll('input[type="checkbox"]:checked')
            let tagAssign = {
                id: null,
                name: nameTag
            }
            for (let tag of this.tags) {
                if (tag.name == nameTag) {
                    tagAssign.id = tag.id
                    break
                }
            }

            if (tagAssign.id == null) {
                try {
                    let responseApi = await this.$axios.post('/api/v1/tags', {
                        name: tagAssign.name
                    })
                    let response = responseApi.data
                    tagAssign = response.data
                }
                catch (error) {
                    alert(error)
                }
            }
            for (let el of checkboxElements) {
                let index = +el.value
                let card = this.cards[index]
                let tagFind = card.tags.find(tag => tag.id === tagAssign.id)
                if (tagFind === undefined) {
                    card.tags.push(tagAssign)
                    console.log(card)
                    this.$axios.put('api/v1/cards', card)
                }
            }
            this.isShowAssignTag = false
            this.$refs.notification.showAlert("Success!")
        }, 
        handleDeleteFilter() {
            let filter = document.querySelector('input[type="radio"][name="value-filter"]:checked') 
            filter.checked = false
            this.getCards()
        }
    },
    created() {
        this.getCards(null, null)
        this.getDecks()
        this.getTags()
    },
    watch: {
        valueFilter(value) {
            let filter = document.querySelector('input[type="radio"][name="value-filter"]:checked').dataset.typeFilter
            this.getCards(filter, value)
        }
    },
}

</script>


<style scoped>
input {
    outline: none;
}


th:nth-child(1),
td:nth-child(1) {
    width: 2%;
}

th:nth-child(2),
td:nth-child(2) {
    width: 35%;
}

th:nth-child(3),
td:nth-child(3) {
    width: 35%;
}



[data-type-card="FRESH"] {
    background-color: green;
    color: white;
}


[data-type-card="LEARNING"] {
    background-color: purple;
    color: white;
}

[data-type-card="REVIEW"] {
    background-color: #4255FF;
    color: white;
}


.card-delete {
    color: #DCDCDC !important;
}

.card-delete [data-type-card] {
    background-color: #DCDCDC !important;
}
</style>