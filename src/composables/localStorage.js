import { ref } from 'vue'

// create a global variable to store the recipe count
export const recipeCount = ref(0) // recipe count

// save data to local Storage
export function saveRecipeToLocalStorage(recipe) {
  // get existing recipes from local storage
  let existingRecipes = JSON.parse(localStorage.getItem('recipes')) || []
  // push new recipe to existing recipes
  existingRecipes.push(recipe)
  // save updated recipes to local storage
  localStorage.setItem('recipes', JSON.stringify(existingRecipes))
}

export function getRecipeFromLocalStorage() {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || []
  return recipes
}

export function isRecipeinLocalStorage(id) {
  const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || []
  // check if the recipe with the given id exists in local storage
  for (let i = 0; i < existingRecipes.length; i++) {
    if (existingRecipes[i].idMeal === id) {
      return true
    }
  }
  return false
}

// update the global reactive variable recipeCount
export const getRecipeCount = () => {
  recipeCount.value = JSON.parse(localStorage.getItem('recipes')).length || [].length
}

export function removeRecipeFromLocalStorage(id) {
  // get existing recipes from local storage
  let existingRecipes = JSON.parse(localStorage.getItem('recipes')) || []
  // filter out the recipe with the given id\
  existingRecipes = existingRecipes.filter((recipe) => {
    return recipe.idMeal !== id
  })

  // save updated recipes to local storage
  localStorage.setItem('recipes', JSON.stringify(existingRecipes))
}
