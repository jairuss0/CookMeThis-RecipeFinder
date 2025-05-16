<script setup>
import { ref, computed, watch } from 'vue'
import Hero from '@/components/Hero.vue'
import RecipeCards from '@/components/RecipeCards.vue'
import Selection from '@/components/Selection.vue'

const heroSearch = ref('')
const selectionSearch = ref('')
const type = ref('')

// this will handle the child passed data
function handleType(newType) {
  type.value = newType
}

// When selectionSearch changes, clear heroSearch
// this will then return new value in combinedSearch since heroSearch is empty
watch(selectionSearch, (newVal) => {
  if (newVal.trim() !== '') {
    heroSearch.value = ''
  }
})

// this computed function decides what reactive value to be passed in recipeCards search prop
const combinedSearch = computed(() => {
  return heroSearch.value || selectionSearch.value
})
</script>

<template>
  <section class="container mx-auto">
    <!---connect heroSearch, selection reactive to v-model search prop with
   a custom event to update the type reactive value --->
    <Hero v-model:search="heroSearch" @searchType="handleType" />
    <Selection v-model:search="selectionSearch" @searchType="handleType" />
  </section>
  <!---passed the computed to search prop and the type reactive to type prop in RecipeCards Component --->
  <RecipeCards :search="combinedSearch" :type="type" />
</template>
