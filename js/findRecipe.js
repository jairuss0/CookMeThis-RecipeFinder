const recipeInput = document.getElementById("recipeInput");
const filterBtn = document.querySelector(".filter-btn");
const recipesParentDiv = document.querySelector(".recipes-result");
const arrowIcon = document.getElementById("arrow");

const mealBtns = document.querySelector(".meal-div");
const areaBtns = document.querySelector(".area-div");


document.addEventListener("DOMContentLoaded", async () => {
  initialMeal();
  getResponseByMeals(); 
  getResponseByArea();
});

// create initial meal response
async function initialMeal() {
  try {
    const ingredientResponse = await fetchApiResponseByIngredient("egg");
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
      const responseIngredient = await fetchApiResponseByIngredient(ingredientInput);
      // pass the response onto the render function
      recipeInput.value = "";
      renderIngredients(responseIngredient);
    } catch (error) {
      console.error(error);
      // create a function to render error on webpage
    }
  }
}

async function fetchApiResponseByMeals() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
    );
    if (!response.ok) {
      console.log("Error: response Failed");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
// FILTER REPONSES BY CATEGORY - meal, AREA
// get the category meal response
async function getResponseByMeals() {
  try {
    const responseByMealBtns = await fetchApiResponseByMeals();

    renderMealBtns(responseByMealBtns);
  } catch (error) {
    console.error(error);
  }
}

async function fetchApiResponseByAreas() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    if (!response.ok) {
      console.log("Error: response Failed");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
// FILTER REPONSES BY CATEGORY - meal, AREA
// get the category meal response
async function getResponseByArea() {
  try {
    const responseByAreaBtns = await fetchApiResponseByAreas();
    renderAreaBtns(responseByAreaBtns);
  } catch (error) {
    console.error(error);
  }
}


// render meal category buttons
function renderMealBtns(response){
  console.log(response);
  response.meals.forEach((meal) => {
    const button = document.createElement('button');
    button.classList.add("meal-filter-btn");
    button.textContent = meal.strCategory;
    mealBtns.appendChild(button);
  });
  
}
// render area category buttons
function renderAreaBtns(response){
  console.log(response);
  response.meals.forEach((meal) => {
    const button = document.createElement('button');
    button.classList.add("area-filter-btn");
    button.textContent = meal.strArea;
    areaBtns.appendChild(button);
  });
  
}

// render response via main ingredient
function renderIngredients(ingredientResponse) {
  console.log(ingredientResponse);
  let recipeCard = "";
  if (ingredientResponse) {
    ingredientResponse.meals.forEach((meal) => {
      recipeCard += `<div class="col-lg-4 col-md-6">
                                <div class="card meal-card" style="min-width: 100%;">
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

filterBtn.addEventListener('click', () => {
  arrowIcon.classList.toggle("fa-arrow-up");
  arrowIcon.classList.toggle("fa-arrow-down");
  
});


/*

  Major

  1. get the user clicked 'see recipe' meal Id and display it on another html page 
  2. create local storage for user favorites, new interface and repeat no.1 logic


  minor
  1. implement load more
  2. implement loading animation while fetching api calls


*/