import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import Blog from "../views/Blog.vue";
import Desk from "../views/Deck.vue"
import Cards  from "../views/Cards.vue"
import Class from "../views/Class.vue"
import NotFound from "../views/NotFound.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blogs",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/classes",
    name: "Class",
    component: Class,
  },
  {
      path: "/cards", 
      name:"Cards", 
      component: Cards, 
     

  },
  {
    path: "/decks",
    name: "Desk",
    component: Desk,
    children: [
      {
        path: "",
        name: "Decks",
        component: () => import('../components/deck/Decks.vue')
      },
      {
        path: "create",
        name: "DeckCreate",
        component: () => import('../components/deck/Create.vue')
      },
      

      {
        path: ":idDeck",
        name: "DeckDetail",
        component: () => import("../components/deck/Detail.vue"),
        children: [
          
          {
            path: "update", 
            name: "DeckUpdate", 
            component: () => import("../components/deck/Update.vue")
          },
          {
            path: "cards/create",
            name: "CardCreate",
            component: () => import("../components/card/Create.vue"),
          },
          {
            path: "study",
            name: "Study",
            component: () => import("../components/deck/study/Controll.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Resgiter",
    component: () => import("../views/Resgiter.vue"),
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
