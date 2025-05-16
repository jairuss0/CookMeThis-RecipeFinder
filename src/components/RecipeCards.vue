<script setup>
import { defineProps, watch, ref } from 'vue'
import { getRecipesData } from '@/composables/api'
import Card from '@/components/Card.vue'
import Loader from '@/components/Loader.vue'
const { recipes, loading, fetchRecipes } = getRecipesData()

// the limit of displayed meals
const limit = ref(4)

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
})

// an event for click to display more cards if its still valid
const seeMore = () => {
  console.log('recipe length: ', recipes.value.length)
  if (limit.value < recipes.value.length) {
    limit.value += 4
  }
}

// define a ref to track if the user has searched for recipes
// this is used to show the loader and no recipes found message only after the user has searched for recipes
let hasSearched = ref(false)

// use watch to watch for changes in the search prop and fetch recipes when it changes
watch(
  //use getters to watch the search  and type prop for changes
  [() => props.search, () => props.type],
  async ([newSearch, newType]) => {
    if (newSearch.trim() === '') {
      return
    }

    // fetch recipes based on the search value
    await fetchRecipes(newSearch, newType)
    hasSearched.value = true // set hasSearched to true when the user has searched for recipes
    limit.value = 4 // reset limit value if search changes
  },
)
</script>
<template>
  <section class="container mx-auto px-5 lg:px-20 py-5">
    <!---check if loading is true and the user has searched--->
    <div v-if="loading && hasSearched" class="loader flex justify-center items-center min-h-[40vh]">
      <Loader
        title="Loading Recipes..."
        description="Please wait while we find the best recipes for you."
      />
    </div>

    <div v-else class="flex items-center justify-center">
      <!---check if user has search and the data is null or empty otherwise display it--->
      <div
        v-if="hasSearched && (recipes === null || recipes.length === 0)"
        class="flex flex-col items-center min-h-[40vh] justify-center p-3"
      >
        <h1 class="text-2xl text-center text-base-content/70 py-2.5 mb-2">
          No recipes found for "{{ search }}"
        </h1>
      </div>
      <div v-else>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-stretch"
        >
          <Card v-for="recipe in recipes.slice(0, limit)" :key="recipes.idMeal" :recipe="recipe" />
        </div>
        <!---only display the see more button if the limit is less than the data length and greater than 4--->
        <div v-if="recipes.length > 4 && limit < recipes.length" class="p-5 text-center">
          <button @click="seeMore" class="btn btn-success btn-large">See more</button>
        </div>
      </div>
    </div>
  </section>
</template>
