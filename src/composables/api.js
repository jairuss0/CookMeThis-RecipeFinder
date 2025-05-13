import { ref } from 'vue'
import axios from 'axios'

export function getRecipeDataById() {
  const recipe = ref({})
  const loading = ref(true) // loading state

  const fetchRecipeById = async (id) => {
    try {
      loading.value = true
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      // Check if the response contains meals data
      if (!response.data.meals || response.data.meals.length === 0) {
        console.error('No meals found for the given ID:', id)
        recipe.value = null // set recipe to null if no meals found
        return
      }
      // Set the recipe data
      recipe.value = response.data.meals[0]

      loading.value = false // set loading to false after fetching data
    } catch (err) {
      console.error('Error fetching recipe by ID:', err)
      recipe.value = null // set recipe to null in case of error
    } finally {
      loading.value = false // set loading to false in case of error
    }
  }

  return {
    recipe,
    loading,
    fetchRecipeById,
  }
}

export function getRecipesData() {
  const recipes = ref([]) // recipes data
  const loading = ref(false) // loading state

  const fetchRecipes = async (value) => {
    try {
      loading.value = true // set loading to true before fetching data
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`,
      )

      recipes.value = response.data.meals || [] // set the recipes data

      loading.value = false
    } catch (err) {
      console.error('Error fetching recipes:', err)
    }
  }

  return {
    recipes,
    loading,
    fetchRecipes,
  }
}
