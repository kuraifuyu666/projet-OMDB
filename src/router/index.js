import Component from '@/components/Component.vue'
import Favorites from '@/components/Favorites.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Component,
    },

    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
    },
  ]
})

export default router
