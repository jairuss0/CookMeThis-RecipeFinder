
const loadingAnimation = document.querySelector(".loader");
const heroSection = document.querySelector(".hero-recipe-section");
const contentSection = document.querySelector(".content-section");

const mealCategory = document.querySelector(".meal-category");
const mealName = document.querySelector(".meal-name");
const mealArea = document.querySelector(".meal-area");
const mealImage = document.querySelector(".meal-img");

const addToFavBtn = document.querySelector(".add-fav-btn");
const mealYtLink = document.querySelector(".yt-link");

const instructions = document.querySelector(".instructions-list");
const ingredients = document.querySelector(".ingredients-list");
const measurements = document.querySelector(".measurement-list");

const errorMessage = document.querySelector(".error-container");
const recipeContainer = document.querySelector(".recipe-container");

// get the url query parameter id
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
console.log(recipeId);

document.addEventListener("DOMContentLoaded", () => {
  loadRecipeItem();
});

async function loadRecipeItem() {
  if (recipeId) {
    try {
      const recipeResponse = await fetchRecipeDetailsById(recipeId);
      renderRecipe(recipeResponse);
    } catch (error) {
      console.error(error);
    }
  }
  else{
    errorMessage.style.display = "block";
    recipeContainer.style.display = "none";
  }
}

async function fetchRecipeDetailsById(id) {
  try {
    showAnimation();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!response.ok) {
      console.log("Error: status 404");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    hideAnimation();
  }
}

function renderRecipe(response) {
  console.log(response);
  // the api only provides one array of object
  console.log(response.meals[0].strInstructions);

  let instructionsText =  response.meals[0].strInstructions.split('\n');
  console.log(instructionsText);
  mealArea.textContent = response.meals[0].strArea;
  mealCategory.textContent = response.meals[0].strCategory;
  mealName.textContent = response.meals[0].strMeal;
  mealImage.src = response.meals[0].strMealThumb;
  mealYtLink.href = response.meals[0].strYoutube;
  
  let ingredientsList;
  let measureList;
  
  // diplay instructions text
  instructionsText.forEach((text) => {
    const list = document.createElement('p');
    list.textContent = text;
    instructions.appendChild(list);
  });

  for (let i = 1; i <= 20; i++) {
    ingredientsList = 'strIngredient' + i;
    measureList = 'strMeasure' + i;
    // check if the  key value is not null or empty
    if(response.meals[0][ingredientsList] && response.meals[0][ingredientsList].trim() !== ""){
      const list = document.createElement("li");
      list.textContent = response.meals[0][measureList] + "  " +  response.meals[0][ingredientsList];
      ingredients.appendChild(list);  

    }
    
    
  }
 
}

// hide loading animation
function hideAnimation() {
  loadingAnimation.style.display = "none";
  heroSection.style.display = "flex";
  contentSection.style.display = "flex";
}
// hide animation
function showAnimation() {
  loadingAnimation.style.display = "flex";
  heroSection.style.display = "none";
  contentSection.style.display = "none";
}
