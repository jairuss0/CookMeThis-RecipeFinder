<script setup>
import { ref } from 'vue'
import Hero from '@/components/Hero.vue'
import RecipeCards from '@/components/RecipeCards.vue'

const search = ref('')
</script>

<template>
  <section class="container mx-auto">
    <Hero v-model:search="search"></Hero>
  </section>
  <RecipeCards :search="search" />
</template>
