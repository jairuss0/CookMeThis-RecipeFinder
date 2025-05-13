<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { recipeCount, getRecipeCount } from '@/composables/localStorage'

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

onMounted(() => {
  getRecipeCount()
})
</script>

<template>
  <nav class="py-6 px-5 bg-base-200">
    <div class="flex items-center justify-evenly max-w-10xl py-2">
      <div class="logo">
        <RouterLink to="/" class="text-2xl font-bold text-success italic">CookMeThis</RouterLink>
      </div>
      <ul class="flex items-center gap-5 list-none">
        <li class="list-none">
          <RouterLink
            to="/"
            :class="`text-base-content/70 hover:text-success hover:bg-base-100 transition-all p-1.5 rounded-xl ${isActiveLink('/') ? 'bg-base-100 text-success' : ''}`"
            >Home</RouterLink
          >
        </li>
        <li class="list-none">
          <div class="indicator">
            <div class="badge badge-soft badge-success badge-sm indicator-item">
              {{ recipeCount }}
            </div>
            <RouterLink
              to="/favorites"
              :class="`text-base-content/70 hover:text-success hover:bg-base-100 transition-all p-1.5 rounded-xl ${isActiveLink('/favorites') ? 'bg-base-100 text-success' : ''}`"
              >Favourites</RouterLink
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
