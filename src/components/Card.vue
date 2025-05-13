<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
defineProps({
  recipe: {
    type: Object,
  },
})
</script>
<template>
  <div class="card card-md bg-base-200 shadow-sm">
    <figure>
      <img :src="`${recipe.strMealThumb}`" :alt="recipe.strMeal + ' image'" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ recipe.strMeal }}</h2>

      <div class="card-actions justify-start">
        <RouterLink
          class="btn btn-sm btn-success cursor-pointer btn-soft"
          :to="`/recipe/${recipe.idMeal}`"
        >
          See Recipe
        </RouterLink>
      </div>
    </div>
  </div>
</template>
