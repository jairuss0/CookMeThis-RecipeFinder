// get the url query parameter id
const loadingAnimation = document.querySelector(".loader");
const heroSection = document.querySelector(".hero-recipe-section");
const contentSection = document.querySelector(".content-section");

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
console.log(recipeId);

document.addEventListener('DOMContentLoaded',() => {
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
}

async function fetchRecipeDetailsById(id) {
  try {
    showAnimation();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if(!response.ok){
        console.log('Error: status 404');
    }
    return await response.json();
  } catch(error) {
    console.error(error);
  } finally {
    hideAnimation();
  }
}

function renderRecipe(response) {
    console.log(response);
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
