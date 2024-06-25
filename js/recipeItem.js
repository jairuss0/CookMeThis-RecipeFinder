
const loadingAnimation = document.querySelector(".loader");
const heroSection = document.querySelector(".hero-recipe-section");
const contentSection = document.querySelector(".content-section");

const mealCategory = document.querySelector(".meal-category");
const mealName = document.querySelector(".meal-name");
const mealArea = document.querySelector(".meal-area");
const mealImage = document.querySelector(".meal-img");

const addToFavBtn = document.getElementById("fav-btn");
const mealYtLink = document.querySelector(".yt-link");

const instructions = document.querySelector(".instructions-list");
const ingredients = document.querySelector(".ingredients-list");
const measurements = document.querySelector(".measurement-list");

const errorMessage = document.querySelector(".error-container");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCount = document.getElementById("favourites-count");
const mealSourceLink = document.querySelector('.link');

// get the url query parameter id
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
console.log(recipeId);

 // create array for recipe items ogf favourites
// recipe id, recipe name,  recipe thumbnail

document.addEventListener("DOMContentLoaded", () => {
  loadRecipeItem();
  markFavButtonAdded();
  countFavRecipe();
  
  
});



addToFavBtn.addEventListener('click', () =>{
  if(addToFavBtn.classList.contains("remove-fav-btn")){
    removeMealFromLocalStorage(recipeId);
    markFavButtonAsRemoved();
    console.log("removed");
  }
  else{
    saveRecipe(recipeId,mealName.textContent,mealImage.src);
    markFavButtonAdded();
    console.log("added");
  }
  countFavRecipe();
});

// count recipes length
function countFavRecipe(){
  let recipeItems = loadLocalStorageRecipeItems();
  recipeCount.textContent = "("+recipeItems.length+")";
}

// mark fav button as added
function markFavButtonAdded(){
  let recipeItems = loadLocalStorageRecipeItems();
  // check if the id meal that is visited is stored in localStorage
  recipeItems.forEach(recipeItem =>{
    if(recipeItem.id === recipeId){
      addToFavBtn.classList.remove('add-fav-btn');
      addToFavBtn.classList.add('remove-fav-btn');
      addToFavBtn.innerHTML = '<i class="fa-solid fa-minus"></i> Remove from Favourites';
    }
  });
}

function markFavButtonAsRemoved(){
  addToFavBtn.classList.remove('remove-fav-btn');
  addToFavBtn.classList.add('add-fav-btn');
  addToFavBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add from Favourites';
}

// save item to localstorage
function saveRecipeLocalStorage(recipeItems){
  localStorage.setItem('recipe',JSON.stringify(recipeItems));
} 

// load favourie recipe items
function loadLocalStorageRecipeItems(){
  const storedRecipe = localStorage.getItem('recipe');
  if(storedRecipe){
    return JSON.parse(storedRecipe);
  }
  else{
    return [];
  }
}

function removeMealFromLocalStorage (id) {
  let recipeItems = loadLocalStorageRecipeItems();
  recipeItems = recipeItems.filter((recipeItem) => {
     return recipeItem.id !== id
  });  // Filter out the meal with the specified id
  saveRecipeLocalStorage(recipeItems);  // Store the updated array back to localStorage
};

function saveRecipe(id,name,img){
  let recipeItems = loadLocalStorageRecipeItems();
  const newRecipe = {
     id: id,
     name: name,
     img: img
  };
  recipeItems.push(newRecipe);
  saveRecipeLocalStorage(recipeItems);
}

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
  mealCategory.textContent = response.meals[0].strTags;
  mealName.textContent = response.meals[0].strMeal;
  mealImage.src = response.meals[0].strMealThumb;
  mealSourceLink.href = response.meals[0].strSource;
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

  if(response.meals[0].strYoutube === ''){
    mealYtLink.style.display = "none";
  }
  if(response.meals[0].strSource === ''){
    mealSourceLink.style.display = 'none';
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
