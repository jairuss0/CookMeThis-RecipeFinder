const recipeInput = document.getElementById("recipeInput");
const filterBtn = document.querySelector(".filter-btn");

const mealBtns = document.querySelector(".meal-div");
const areaBtns = document.querySelector(".area-div");

const recipesParentDiv = document.querySelector(".recipes-result");
const loadingAnimation = document.querySelector(".loader");
const loadingText = document.querySelector(".text-result");

const recipeBtn = document.querySelector(".recipe-btn");
const recipeCount = document.getElementById("favourites-count");

document.addEventListener('DOMContentLoaded', () =>{
  initialLoadingAnimation();
  getResponseByMealList(); 
  getResponseByAreaList();
  loadLocalStorageRecipeItems();
  countFavRecipe();
  
})

let recipeItems;

function loadLocalStorageRecipeItems(){
  const storedRecipe = localStorage.getItem('recipe');
  if(storedRecipe){
    recipeItems = JSON.parse(storedRecipe);
  }
  else{
     recipeItems = [];
  }
}

function countFavRecipe(){
  recipeCount.textContent = "("+recipeItems.length+")";
}

// fetch reponse via main ingredient
async function fetchApiResponseByIngredient(ingredient) {
  try {
    // start the animation here
    showAnimation();
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
  finally{
    hideAnimation();
  }
}

// get the response
async function getResponseByIngredient() {
  const ingredientInput = recipeInput.value.toLowerCase().trim();
  if (ingredientInput) {
    recipesParentDiv.innerHTML = "";
    try {
      const responseIngredient = await fetchApiResponseByIngredient(ingredientInput);
      
        // pass the response onto the render function
        recipeInput.value = "";
        renderMeals(responseIngredient);
        console.log(responseIngredient.meals.length);
    
    } catch (error) {
      
      displayLoadingMessage("No recipe found!");
      showAnimation();      
      // create a function to render error on webpage
      
    }
   
  }
}

async function fetchApiResponseByMealList() {
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
async function getResponseByMealList() {
  try {
    const responseByMealBtns = await fetchApiResponseByMealList();
    renderMealBtns(responseByMealBtns);
  } catch (error) {
    console.error(error);
  }
}

async function fetchApiResponseByAreaList() {
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
async function getResponseByAreaList() {
  try {
    
    const responseByAreaBtns = await fetchApiResponseByAreaList();
    renderAreaBtns(responseByAreaBtns);
  } catch (error) {
    console.error(error);
  }
}
async function getResponseByArea(area){
  try{
    recipesParentDiv.innerHTML = "";
    const responseAreaMeals = await fetchApiReponsebyArea(area);
    renderMeals(responseAreaMeals);
    console.log(responseAreaMeals.meals.length);
    
  }catch(error){
    console.error(error);
  }
}

async function fetchApiReponsebyArea(area){
  try{
    showAnimation();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    if(!response.ok){
      console.log("Error: response Failed");
    }
    
    return await response.json();
  }catch(error){
    console.error(error);
  }finally{
    hideAnimation();
  }
}
async function getResponseByMealCategory(mealCategory){
  try{
    recipesParentDiv.innerHTML = "";
    const responseByMeals = await fetchApiReponsebyMealCategory(mealCategory);
    renderMeals(responseByMeals);
    console.log(responseByMeals.meals.length);
    
  }catch(error){
    console.error(error);
  }
}
async function fetchApiReponsebyMealCategory(mealCategory){
  try{
    showAnimation();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`);
    if(!response.ok){
      console.log("Error: response Failed");
    }
   
    return await response.json();
  }catch(error){
    console.error(error);
  }finally{
    hideAnimation();
  }
}

let allButtons;
// render meal category buttons
function renderMealBtns(response){
  
  console.log(response);
  response.meals.forEach((meal) => {
    const buttons = document.createElement('button');
    buttons.classList.add("filter-buttons");
    buttons.textContent = meal.strCategory;
    mealBtns.appendChild(buttons);
    buttons.setAttribute("id", meal.strCategory);
    
    // add event for each buttons
    buttons.addEventListener('click',() =>{
      console.log(buttons.id);
      let mealCategory = buttons.id;
      getResponseByMealCategory(mealCategory);
      removeActiveButtons(allButtons);
      buttons.classList.add('filter-btn-clicked');
    });
   

  });
  allButtons = document.querySelectorAll(".filter-buttons");
}
// render area category buttons
function renderAreaBtns(response){
  console.log(response);
  response.meals.forEach((meal) => {
    const buttons = document.createElement('button');
    buttons.classList.add("filter-buttons");
    buttons.textContent = meal.strArea;
    areaBtns.appendChild(buttons);
    buttons.setAttribute("id", meal.strArea);
    // add event for each buttons
    buttons.addEventListener('click',() =>{
      console.log(buttons.id);
      let area = buttons.id;
      getResponseByArea(area);
      removeActiveButtons(allButtons);
      buttons.classList.add('filter-btn-clicked');
    });
  });
  allButtons = document.querySelectorAll(".filter-buttons");
}

let mealContainer;
// render meals via response 
function renderMeals(response) {
  
  let recipeCard = "";

  if (response) {
    response.meals.forEach((meal) => {
      recipeCard += `<div class="col-lg-4 col-md-6 meal-container">
                                <div class="card meal-card " >
                                    <img src="${meal.strMealThumb}" class="card-img-top" id="meal-img" alt="meal">
                                    <div class="card-body">
                                        <p class="meal-name">${meal.strMeal}</p>
                                        <a href='recipe-item.html?id=${meal.idMeal}' class="recipe-btn">See Recipe</a>
                                    </div>
                                </div>
                            </div>`;
    });
    recipesParentDiv.innerHTML = recipeCard;
  }
  mealContainer = document.querySelectorAll('.meal-container');
}




// if user keyup pressed an enter
document.onkeyup = (e) => {
  if (e.key == "Enter" && recipeInput.value.length != 0) {
    e.preventDefault();
    getResponseByIngredient();
  }
};


// remove active buttons
function removeActiveButtons(buttons){
  buttons.forEach((btn) =>{
    btn.classList.remove("filter-btn-clicked");
  });
}

// hide loading animation
function hideAnimation(){
  loadingAnimation.style.display = "none";

}
// hide animation
function showAnimation(){
  loadingAnimation.style.display = "flex";
}
// initally load animation
function initialLoadingAnimation(){
  loadingAnimation.style.display = "flex";

}

// display result loading message
function displayLoadingMessage(message){
  loadingText.textContent = message;
}

function animationPreLoad(){
  setTimeout(() => {
    showAnimation();
  }, 1000);
}



/*

  Major

  1. get the user clicked 'see recipe' meal Id and display it on another html page 
  2. create local storage for user favorites, new interface and repeat no.1 logic


  minor
  1. implement load more
  2. implement loading animation while fetching api calls


*/