<script setup>
import { reactive, onMounted } from 'vue'
import { getRecipeFromLocalStorage } from '@/composables/localStorage'
import Hero from '@/components/Hero.vue'
import Card from '@/components/Card.vue'

const state = reactive({
  recipes: [],
})

onMounted(() => {
  state.recipes = getRecipeFromLocalStorage()
})
</script>
<template>
  <Hero
    title="Your Favourite Recipes!"
    :isSearchPage="false"
    description="Your personal collection of saved recipes. Quickly access and rediscover your most loved dishes!"
  />
  <section class="container mx-auto px-5 lg:px-20 py-5">
    <div class="flex items-center justify-center">
      <div
        v-if="state.recipes === null || state.recipes.length === 0"
        class="flex flex-col items-center min-h-[40vh] justify-center p-3"
      >
        <h1 class="text-2xl text-center text-base-content/70 py-2.5 mb-2">
          You have no Favourites.
        </h1>
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-stretch"
      >
        <Card v-for="recipe in state.recipes" :key="state.recipes.id" :recipe="recipe" />
      </div>
    </div>
  </section>
</template>
