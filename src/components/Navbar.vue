<template>
    <nav
        class="h-[71px] fixed top-0 z-50 flex-no-wrap flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <button
                class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                type="button" data-te-collapse-init data-te-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                <span class="[&>svg]:w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                        <path fill-rule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </button>

            <!-- Collapsible navigation container -->
            <div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                id="navbarSupportedContent1" data-te-collapse-item>
                <!-- Logo -->
                <a class="h- w-20 mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                    href="#">
                    <img src="https://logos-world.net/wp-content/uploads/2021/03/Quizlet-Logo.png" style="width: 100%"
                        alt="">
                </a>
                <!-- Left navigation links -->
                <ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row font-medium">
                    <li class="mb-4 lg:mb-0 lg:pr-2 me-4">
                        <router-link to="/">
                            Home
                        </router-link>
                    </li>
                    <li class="mb-4 lg:mb-0 lg:pr-2 me-4">
                        <span to="/topics">
                            Topic
                        </span>
                        <span><i class="fa-solid fa-caret-down"></i></span>

                    </li>
                    <!-- Team link -->
                    <li class="mb-4 lg:mb-0 lg:pr-2 me-4">
                        <router-link to="/blogs">
                            Blog
                        </router-link>
                    </li>
                    <li v-if="userStore.getIsAuthenticated" class="mb-4 lg:mb-0 lg:pr-2 me-4">
                        <router-link to="/classes">
                            Class
                        </router-link>
                    </li>
                    <li v-if="userStore.getIsAuthenticated" class="mb-4 lg:mb-0 lg:pr-2 me-4">
                        <router-link to="/decks">
                            Deck
                        </router-link>
                    </li>
                    <li v-if="userStore.getIsAuthenticated" class="mb-4 lg:mb-0 lg:pr-2 me-4">
                        <router-link to="/cards">
                            Card
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Right elements -->
            <div class="relative flex items-center gap-x-4">
                <div v-if="!userStore.getIsAuthenticated" class="relative" data-te-dropdown-ref
                    data-te-dropdown-alignment="end">
                    <router-link to="/login" class="text-gray-500 font-medium">Đăng nhập</router-link>
                </div>
                <div v-if="!userStore.getIsAuthenticated">
                    <router-link to="/register" class="text-black inline-block rounded px-6 py-1.5 font-medium shadow-md"
                        style="background-color: #FFCD1F">
                        Đăng ký
                    </router-link>
                </div>

                <div>
                    <div v-if="userStore.getIsAuthenticated" class="flex gap-3">
                        <div class="dropdown">
                            <div class="dropdown-btn">
                                <div @click="toggleAdd"
                                    class="rounded-3xl w-8 h-8 bg-[#4255FF] flex items-center justify-center font-bold text-white">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            </div>
                            <div class="dropdown-content-right">
                                <router-link to="/decks/create">Deck</router-link>
                                <router-link to="/classes">Class</router-link>
                            </div>
                        </div>
                        <div class="dropdown">
                            <div class="dropdown-btn">
                                <img class="rounded-full h-8 w-8"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80">
                                <img class="h-4 w-4" src="../assets/image/dropdown.png">
                            </div>
                            <div class="dropdown-content-right">
                                <router-link to="/user">Your profile</router-link>
                                <a>Setting</a>
                                <a @click="handleLogout">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '../stores/useUserStore.js'
import { useTopicStore } from '../stores/useTopicStore.js'
import { auth } from '../ufirebase/main'
import {signOut} from 'firebase/auth'

export default {
    computed: {
        ...mapStores(useUserStore, useTopicStore),
    },
    data() {
        return {

        }
    },
    methods: {
        handleLogout() {
            localStorage.removeItem("idToken")
            signOut(auth)
       
        }
    },
    created() {
        this.topicStore.fetchTopics()
    }


}
</script>