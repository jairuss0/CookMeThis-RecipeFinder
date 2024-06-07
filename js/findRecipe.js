


document.addEventListener('DOMContentLoaded', async () => {
   initialMeal();
});

// create initial meal response
async function initialMeal(){
    try {
        const ingredientResponse = await getResponseByIngredient("chicken_breast");
        console.log(ingredientResponse);
    } catch (error) {
        console.error(error);
    }
    
}

async function getResponseByIngredient(ingredient){
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if(!response.ok){
            console.log("Error: response Failed");
            
        }
        return await response.json();
    }catch(error){
        
    }
}
