const recipeInput = document.getElementById("recipeInput");
const filterBtn = document.querySelector(".filter-btn");

const mealBtns = document.querySelector(".meal-div");
const areaBtns = document.querySelector(".area-div");

const loadMoreDiv = document.querySelector(".load-more");
const goBackDiv = document.querySelector(".goBack");

const recipesParentDiv = document.querySelector(".recipes-result");
const loadingAnimation = document.querySelector(".loader");
const loadingText = document.querySelector(".text-result");

document.addEventListener("DOMContentLoaded", async () => {
  // load initial meals
  //initialMeal();
  // load all the filter buttons
  initialLoadingAnimation();
  getResponseByMealList(); 
  getResponseByAreaList();
  
});

// create initial meal response
async function initialMeal() {
  try {
    const ingredientResponse = await fetchApiResponseByIngredient("egg");
    renderMeals(ingredientResponse);
  } catch (error) {
    console.error(error);
  }
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
    hideAnimation();
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
      renderMeals(responseIngredient);
    } catch (error) {
      console.error(error);
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
    const responseAreaMeals = await fetchApiReponsebyArea(area);
    renderMeals(responseAreaMeals);
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
    hideAnimation();
    return await response.json();
  }catch(error){
    console.error(error);
  }
}
async function getResponseByMealCategory(mealCategory){
  try{
    const responseAreaMeals = await fetchApiReponsebyMealCategory(mealCategory);
    renderMeals(responseAreaMeals);
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
    hideAnimation();
    return await response.json();
  }catch(error){
    console.error(error);
  }
}

let allButtons;
// render meal category buttons
function renderMealBtns(response){
  
  console.log(response);
  response.meals.forEach((meal) => {
    const buttons = document.createElement('button');
    buttons.classList.add("meal-filter-btn","filter-buttons");
    buttons.textContent = meal.strCategory;
    mealBtns.appendChild(buttons);
    buttons.setAttribute("id", meal.strCategory);
    
    // add event for each buttons
    buttons.addEventListener('click',() =>{
      console.log(buttons.id);
      let mealCategory = buttons.id;
      getResponseByMealCategory(mealCategory);
      removeActiveButtons(allButtons,"meal");
      removeActiveButtons(allButtons,"area");
      buttons.classList.add('filter-btn-clicked-meal');
    });
    

  });
  
}
// render area category buttons
function renderAreaBtns(response){
  console.log(response);
  response.meals.forEach((meal) => {
    const buttons = document.createElement('button');
    buttons.classList.add("area-filter-btn","filter-buttons");
    buttons.textContent = meal.strArea;
    areaBtns.appendChild(buttons);
    buttons.setAttribute("id", meal.strArea);
    // add event for each buttons
    buttons.addEventListener('click',() =>{
      console.log(buttons.id);
      let area = buttons.id;
      getResponseByArea(area);
      removeActiveButtons(allButtons,"area");
      removeActiveButtons(allButtons,"meal");
      buttons.classList.add('filter-btn-clicked-area');
    });
  });
  allButtons = document.querySelectorAll(".filter-buttons");
}

// render meals via response 
function renderMeals(response) {
  console.log(response);
  let recipeCard = "";
  if (response) {
    response.meals.forEach((meal) => {
      recipeCard += `<div class="col-lg-4 col-md-6">
                                <div class="card meal-card " style="min-width: 100%;">
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


// remove active buttons
function removeActiveButtons(buttons,type){
  buttons.forEach((btn) =>{
    btn.classList.remove("filter-btn-clicked-"+type);
  });
  

}

// hide loading animation
function hideAnimation(){
  loadingAnimation.style.display = "none";
  goBackDiv.style.visibility = "visible";
  loadMoreDiv.style.visibility = "visible";
}

function showAnimation(){
  loadingAnimation.style.display = "flex";
  goBackDiv.style.visibility = "hidden";
  loadMoreDiv.style.visibility = "hidden";
}

function initialLoadingAnimation(){
  loadingAnimation.style.display = "flex";
  goBackDiv.style.visibility = "hidden";
  loadMoreDiv.style.visibility = "hidden";
}


function displayLoadingMessage(message){
  loadingText.textContent = message;
}

/*
filterBtn.addEventListener('click', () => {
  
});

*/
/*

  Major

  1. get the user clicked 'see recipe' meal Id and display it on another html page 
  2. create local storage for user favorites, new interface and repeat no.1 logic


  minor
  1. implement load more
  2. implement loading animation while fetching api calls


*/