<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRecipeDataById } from '@/composables/api'
import Loader from '@/components/Loader.vue'
import {
  getRecipeFromLocalStorage,
  saveRecipeToLocalStorage,
  removeRecipeFromLocalStorage,
  isRecipeinLocalStorage,
  getRecipeCount,
} from '@/composables/localStorage'
const { recipe, loading, fetchRecipeById } = getRecipeDataById()
const route = useRoute()
const mealId = route.params.id

let markAsFavorite = ref(false) // define a ref to track if the recipe is a favorite or not

const saveOrRemoveToggle = () => {
  if (markAsFavorite.value) {
    removeRecipe() // remove the recipe from local storage
    markAsFavorite.value = false // set the recipe as not favorite
    console.log('Recipe removed from favorites')
    console.log('favorite: ', getRecipeFromLocalStorage())
  } else {
    saveRecipe() // save the recipe to local storage
    markAsFavorite.value = true // set the recipe as favorite
    console.log('Recipe added from favorites')
    console.log('favorite: ', getRecipeFromLocalStorage())
  }
  getRecipeCount()
}

const saveRecipe = () => {
  const newRecipe = {
    idMeal: mealId,
    strMeal: recipe.value.strMeal,
    strMealThumb: recipe.value.strMealThumb,
  }
  saveRecipeToLocalStorage(newRecipe) // save the recipe to local storage
  markAsFavorite.value = true // set the recipe as favorite
}

const removeRecipe = () => {
  removeRecipeFromLocalStorage(mealId) // remove the recipe from local storage
  markAsFavorite.value = false // set the recipe as not favorite
}

const recipeIngredients = computed(() => {
  const ingredients = []

  // iterate through the recipe object and push the ingredients to the array - total of 20
  for (let i = 1; i <= 20; i++) {
    const measure = recipe.value[`strMeasure${i}`]
    const ingredient = recipe.value[`strIngredient${i}`]
    // check if the ingredient is not empty and push it to the array
    if (measure !== '' && ingredient !== '') {
      ingredients.push(`${measure} ${ingredient}`)
    }
  }
  return ingredients
})

// split the instructions by new line and remove any leading or trailing whitespace
// and filter out any empty instructions
const instructionsText = computed(() => {
  return recipe.value.strInstructions
    .split('\n') // split the instructions by new line
    .map((instructions) => instructions.trim()) // remove any leading or trailing whitespace
    .filter((instruction) => instruction) // filter out any empty instructions
})

onMounted(async () => {
  await fetchRecipeById(mealId) // await for the recipe to be fetched so that the recipe is available when the component is mounted
  console.log('RECIPE VIEW: ', recipe.value)
  console.log('favorite: ', getRecipeFromLocalStorage())
  markAsFavorite.value = isRecipeinLocalStorage(mealId) // check if the recipe is in local storage and set the markAsFavorite value accordingly
  console.log('markAsFavorite: ', markAsFavorite.value)
})
</script>
<template>
  <div v-if="loading" class="min-h-[40vh] flex items-center justify-center">
    <Loader
      title="Preparing Your Perfect Meal..."
      description="Getting your selected meal's recipe ready for you!"
    />
  </div>
  <section v-else class="container mx-auto px-5 py-5 max-w-7xl">
    <div v-if="!recipe">
      <h1 class="text-2xl text-center text-base-content/70 py-2.5 mb-2">
        No recipe found for "{{ mealId }}"
      </h1>
    </div>
    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch py-5 px-5 justify-center"
    >
      <div class="image-container">
        <img
          :src="`${recipe.strMealThumb}`"
          :alt="recipe.strMeal + ' image'"
          class="object-cover rounded-xl min-w-full h-[300px]"
        />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-base-content/70">{{ recipe.strCategory }}</p>
        <h1 class="text-6xl font-bold p-0">{{ recipe.strMeal }}</h1>
        <p class="text-base-content/70">{{ recipe.strArea }}</p>
        <div class="buttons flex flex-wrap gap-2 mt-5">
          <button
            @click="saveOrRemoveToggle"
            :class="`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success cursor-pointer btn-soft transition-all ${markAsFavorite === true ? 'btn-active' : ''}`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="size-[1.2em]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Favorite
          </button>
          <a
            v-if="recipe.strYoutube !== ''"
            :href="recipe.strYoutube"
            target="_blank"
            class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success cursor-pointer btn-soft"
          >
            Watch Video
          </a>
          <a
            v-if="recipe.strSource !== ''"
            :href="recipe.strSource"
            target="_blank"
            class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success cursor-pointer btn-soft"
          >
            Source
          </a>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 py-3 px-5 justify-center">
      <div class="flex flex-col gap-2 lg:col-span-2 col-span-1">
        <h1
          class="font-bold text-xl relative after:content-[''] after:block after:w-16 after:h-1 after:bg-success after:mt-1"
        >
          Instructions
        </h1>
        <ol class="list-decimal">
          <li
            v-for="instruction in instructionsText"
            :key="instruction"
            class="text-base-content font-light p-1"
          >
            {{ instruction }}
          </li>
        </ol>
      </div>
      <div class="flex flex-col gap-2 lg:col-span-1 col-span-1">
        <h1
          class="font-bold text-xl relative after:content-[''] after:block after:w-16 after:h-1 after:bg-success after:mt-1"
        >
          Ingredients
        </h1>

        <ul class="list-disc">
          <li
            v-for="ingredient in recipeIngredients"
            :key="ingredient"
            class="text-base-content/95 font-light py-1.5"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
