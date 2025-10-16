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
          meta: { showNavigation: true },
        },
        {
          path: "/comparator",
          name: "comparatorPage",
          component: () => import("@/pages/comparatorPage.vue"),
          meta: { showNavigation: true },
        },
        {
          path: "/quiz",
          name: "quizPage",
          component: () => import("@/pages/quizPage.vue"),
          meta: { showNavigation: true },
        },
        {
          path: "/favorites",
          name: "favoritesPage",
          component: () => import("@/pages/favoritesPage.vue"),
          meta: { showNavigation: true },
        },
        {
          path: "/pokemon/:id",
          name: "pokemonPage",
          component: () => import("@/pages/pokemonPage.vue"),
          redirect: { name: "pokemonAbout" },
          children: [
            {
              path: "about",
              name: "pokemonAbout",
              component: () => import("@/widgets/pokemonTabs/aboutTab.vue"),
            },
            {
              path: "stats",
              name: "pokemonStats",
              component: () => import("@/widgets/pokemonTabs/statsTab.vue"),
            },
            {
              path: "moves",
              name: "pokemonMoves",
              component: () => import("@/widgets/pokemonTabs/movesTab.vue"),
            },
            {
              path: "evolutions",
              name: "pokemonEvolutions",
              component: () => import("@/widgets/pokemonTabs/evolutionsTab.vue"),
            },
          ],
        },
      ],
    },
  ],
})

export default router
