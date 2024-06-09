const recipeInput = document.getElementById("recipeInput");
const filterBtn = document.querySelector(".filter-btn");
const recipesParentDiv = document.querySelector(".recipes-result");

document.addEventListener("DOMContentLoaded", async () => {
    initialMeal();
    
});

// create initial meal response
async function initialMeal() {
  try {
    const ingredientResponse = await fetchApiResponseByIngredient("egg");
    console.log(ingredientResponse);
    renderIngredients(ingredientResponse);
  } catch (error) {
    console.error(error);
  }
}
// fetch reponse via main ingredient
async function fetchApiResponseByIngredient(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!response.ok) {
      console.log("Error: response Failed");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
// get the response
async function getResponseByIngredient() {
  const ingredientInput = recipeInput.value.toLowerCase();
  if (ingredientInput) {
    try {
      const response = await fetchApiResponseByIngredient(ingredientInput);
      // pass the response onto the render function
      recipeInput.value = "";
      renderIngredients(response);
    } catch (error) {
      console.error(error);
      // create a function to render error on webpage
    }
  }
}

// render response via main ingredient
function renderIngredients(ingredientResponse) {

  console.log(ingredientResponse);

  let recipeCard = "";
  if (ingredientResponse) {
    ingredientResponse.meals.forEach((meal) => {
      recipeCard += `<div class="col-lg-4 col-md-6">
                                <div class="card meal-card" style="width: 100%;">
                                    <img src="${meal.strMealThumb}" class="card-img-top" id="meal-img" alt="meal">
                                    <div class="card-body">
                                        <p class="meal-name">${meal.strMeal}</p>
                                        <button class="recipe-btn">See Recipe</button>    
                                    </div>
                                </div>
                            </div>`;
    });
    recipesParentDiv.innerHTML = recipeCard;
  }
  
}

// if user keyup pressed an enter
document.onkeyup = (e) => {
  if (e.key == "Enter" && recipeInput.value.length != 0) {
    e.preventDefault();
    getResponseByIngredient();
  }
};
