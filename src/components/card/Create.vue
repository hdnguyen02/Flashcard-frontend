<template>
  <div class="flex px-8 justify-center items-center flex-col lg:flex-row gap-8">
    <form ref="addForm" @submit.prevent="handlerAddCard" class="w-full flex flex-col lg:flex-row  gap-5 max-w-2xl">
      <div class="w-full">
        <div class="md:flex md:items-center mb-6 gap-x-4">
          <div class="w-full">
            <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Thuật ngữ <span class="text-red-500">*</span>
            </label>
            <input v-model="card.term" required
              class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text" />
          </div>
          <div class="w-full">
            <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Định nghĩa <span class="text-red-500">*</span>
            </label>
            <input v-model="card.definition" required
              class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text" />
          </div>
        </div>

        <div class="md:flex md:items-center mb-6 gap-x-4">
          <div class="w-full">
            <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Hình ảnh
            </label>
            <input ref="image" type="file"
              class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
          <div class="w-full">
            <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Audio
            </label>
            <input ref="audio" type="file"
              class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        

        <div class="md:flex md:items-center mb-6">
          <div class="w-full">
            <label class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Thông tin thêm
            </label>
            <input v-model="card.extractInfo"
              class="mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text" />
          </div>
        </div>

        <div class="">
          <div class="flex flex-col gap-4">
            <button type="submit"
              class="shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded">
              Thêm thẻ
            </button>

            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fa-solid fa-tags"></i>
              </div>
              <input ref="tagName" type="text"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-yellow-400 outline-4"
                placeholder="Tên tag" />
              <button type="button" @click="handleAddTag"
                class="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1">
                Thêm tag
              </button>
            </div>
            
          </div>
        </div>
      </div>
      

    </form>
    <div class="w-72">
      <div class="shadow-2xl relative">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-base font-semibold text-gray-900 lg:text-xl ">
              Danh sách tag
            </h3>
          </div>
          <div class="px-6 py-8">
            <p class="hidden md:block text-sm font-normal text-gray-500">
              Thiết lập tag giúp bạn quản lý thẻ tốt hơn
            </p>
            <ul class="my-4 space-y-3 overflow-y-auto h-[180px]">
              <li v-for="tag in tags" :key="tag.id"
                class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                <i class="fa-solid fa-tag"></i>
                <span class="flex-1 ml-3 whitespace-nowrap">{{
                  tag.name
                }}</span>
                <input :value="tag.id" v-model="card.idTags" type="checkbox" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>  
  <Notification ref="notification"></Notification>

</template>

<script>
import axios from "axios" 
import Notification from "../utilities/Notification.vue"

export default {
  components: {
    Notification
  }, 
  data() {
    return {
      idDeck: this.$route.params.idDeck,
      card: {
        term: null,
        definition: null,
        extractInfo: null,
        idTags: [], 
      },
      tags: null,
    };
  },
  created() {
    this.getTags()
  },
  methods: {
     getTags() {
      this.$axios.get("api/v1/tags")
        .then(apiResponse => {
          const response = apiResponse.data
          this.tags = response.data
        })
    },

    handlerAddCard() {
      const formData = new FormData()
      formData.append("term", this.card.term)
      formData.append("definition", this.card.definition)
      formData.append("extractInfo", this.card.extractInfo)
      formData.append("image", this.$refs.image.files[0])
      formData.append("audio", this.$refs.audio.files[0])
      formData.append("idTags", this.card.idTags)

      let config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      }
      
      axios.post(`http://localhost:8080/api/v1/decks/${this.idDeck}/cards`, formData,config)
        .then((apiResponse) => {
          const response = apiResponse.data
          this.message = response.message
          this.card.term = this.card.definition = this.card.extractInfo = null
          this.$refs.image.value = this.$refs.audio.value = null
          this.$refs.notification.showAlert("Success!")
        })
        .catch(error => {
          this.$refs.notification.showAlert("Failure!")
        })
    },

    handleAddTag() {
      const tagName = this.$refs.tagName.value
      this.$axios.post("api/v1/tags", { name: tagName,})
        .then(apiResponse => {
          const response = apiResponse.data
          this.message = response.message
          this.tagName = null
          this.getTags()
        })
    },
  },
};
</script>
