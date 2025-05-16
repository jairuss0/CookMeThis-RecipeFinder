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

  // fetch api based off type - filter
  const fetchRecipes = async (value, type) => {
    if (type === 'ingredients') {
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
    } else if (type === 'area') {
      try {
        loading.value = true // set loading to true before fetching data
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`,
        )

        recipes.value = response.data.meals || [] // set the recipes data

        loading.value = false
      } catch (err) {
        console.error('Error fetching recipes:', err)
      }
    } else if (type === 'category') {
      try {
        loading.value = true // set loading to true before fetching data
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`,
        )

        recipes.value = response.data.meals || [] // set the recipes data

        loading.value = false
      } catch (err) {
        console.error('Error fetching recipes:', err)
      }
    }
  }

  return {
    recipes,
    loading,
    fetchRecipes,
  }
}

// fetch list areas
export function getAreaList() {
  const areas = ref([])
  const areaListLoading = ref(false)

  const fetchAreaList = async () => {
    try {
      areaListLoading.value = true
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      areas.value = response.data.meals
      areaListLoading.value = false
    } catch (error) {
      console.error('Error fetching area list: ', error)
    }
  }

  return {
    areas,
    areaListLoading,
    fetchAreaList,
  }
}

// fetch list categories
export function getCategoriesList() {
  const categories = ref([])
  const categoryListLoading = ref(false)

  const fetchCategoryList = async () => {
    try {
      categoryListLoading.value = true
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      categories.value = response.data.meals
      categoryListLoading.value = false
    } catch (error) {
      console.error('Error fetching categories list: ', error)
    }
  }

  return {
    categories,
    categoryListLoading,
    fetchCategoryList,
  }
}
