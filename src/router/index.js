import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import CountryDetailsView from "../views/CountryDetailsView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/country/:name",
      name: "country",
      component: CountryDetailsView,
      // component: () => import('../views/CountryDetailsView.vue')
    },
  ],
})

export default router
