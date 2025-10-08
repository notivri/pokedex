import mainLayout from "../layout/mainLayout.vue"
import { createWebHistory, createRouter } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ?? "/"),
  routes: [
    {
      path: "/",
      name: "layout",
      component: mainLayout,
      redirect: { name: "mainPage" },
      children: [
        {
          path: "/main",
          name: "mainPage",
          component: () => import("@/pages/mainPage.vue"),
          meta: { showHeader: true },
        },
        {
          path: "/pokemon/:id",
          name: "pokemonPage",
          component: () => import("@/pages/pokemonPage.vue"),
          meta: { showHeader: true },
        },
      ],
    },
  ],
})

export default router
