const recipeCount = document.getElementById("favourites-count");
const favRecipesDiv = document.querySelector(".fav-recipes-result");
const favText = document.getElementById("fav-text");


document.addEventListener('DOMContentLoaded', () =>{
    loadLocalStorageRecipeItems();
    countFavRecipe();
    favTextMessage();
    renderFavMeals();
});

let recipeItems;

function loadLocalStorageRecipeItems(){
    const storedRecipe = localStorage.getItem('recipe');
    if(storedRecipe){
        recipeItems = JSON.parse(storedRecipe);

    }
    else {
        recipeItems = [];
    }
}


function countFavRecipe(){
    recipeCount.textContent = "("+recipeItems.length+")";
}

function favTextMessage(){
    if(recipeItems.length <= 0){
        favText.textContent = "You have no Favourites!";
    }
    else{
        favText.textContent = "Your Favourite Recipes!"
    }
}



function renderFavMeals(){
    console.log(recipeItems);
    let favRecipesCard  = "";

    recipeItems.forEach(meal =>{
        favRecipesCard += `<div class="col-sm-4 meal-container">
                                <div class="card meal-card " >
                                    <img src="${meal.img}" class="card-img-top" id="meal-img" alt="meal">
                                    <div class="card-body">
                                        <p class="meal-name">${meal.name}</p>
                                        <a href='recipe-item.html?id=${meal.id}' class="recipe-btn">See Recipe</a>
                                    </div>
                                </div>
                            </div>`;
    });
    favRecipesDiv.innerHTML = favRecipesCard;
}   
