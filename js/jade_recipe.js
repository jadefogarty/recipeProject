const searchForm = document.querySelector(".searchBar");
const searchResultDiv = document.querySelector(".content");
const docContainer = document.querySelector(".docContainer");
let searchQuery = "";
const APP_ID = "6a4473f6";
const APP_key = "384e40dc3549528b5b488cf70d97c581";
let mealType = "";
let dietPref = "";
let nutritionPref = "";
let dishPref = "";

document.querySelectorAll(".diet").forEach(item => {
	item.addEventListener('click', dietEvent => {
		dietPref = document.querySelector('input[name="diet"]:checked').value;
		console.log(dietPref);
	});
});

document.querySelectorAll(".nutrition").forEach(item => {
	item.addEventListener('click', nutritionEvent => {
		nutritionPref = document.querySelector('input[name="nutrition"]:checked').value;
		console.log(nutritionPref);
	});
});

document.querySelectorAll(".dish").forEach(item => {
	item.addEventListener('click', dishEvent => {
		dishPref = document.querySelector('input[name="dish"]:checked').value;
		console.log(dishPref);
	});
});

searchForm.addEventListener("submit", (searchEvent) => {
	searchEvent.preventDefault();
	searchQuery = searchEvent.target.querySelector(".textField").value;
	mealType = searchEvent.target.querySelector(".hidden").value;
	console.log(mealType);
	loadRecipes();
});

async function loadRecipes() {
	var basicURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&mealType=${mealType}&from=0&to=12`;
	var dietURL = `&health=${dietPref}`;
	var nutritionURL = `&diet=${nutritionPref}`;
	var dishURL = `&dishType=${dishPref}`;

	if ((document.getElementById('vegetarian').checked) || (document.getElementById('vegan').checked) || (document.getElementById('pescatarian').checked) || (document.getElementById('glutenFree').checked) || (document.getElementById('dairyFree').checked) || (document.getElementById('peanutFree').checked)) {
		var response = await fetch(basicURL + dietURL);
		console.log(basicURL + dietURL);
		//diet
	}
	else if ((document.getElementById('balanced').checked) || (document.getElementById('highFiber').checked) || (document.getElementById('highProtein').checked) || (document.getElementById('lowFat').checked) || (document.getElementById('lowCarb').checked) || (document.getElementById('lowSodium').checked)) {
		var response = await fetch(basicURL + nutritionURL)
		console.log(basicURL + nutritionURL);
		//nutrition
	}
	else if ((document.getElementById('starter').checked) || (document.getElementById('mainCourse').checked) || (document.getElementById('dessert').checked) || (document.getElementById('drinks').checked)) {
		var response = await fetch(basicURL + dishURL)
		console.log(basicURL + dishURL);
		//dish
	}
	else if ((document.getElementById('vegetarian').checked) || (document.getElementById('vegan').checked) || (document.getElementById('pescatarian').checked) || (document.getElementById('glutenFree').checked) || (document.getElementById('dairyFree').checked) || (document.getElementById('peanutFree').checked) && (document.getElementById('balanced').checked) || (document.getElementById('highFiber').checked) || (document.getElementById('highProtein').checked) || (document.getElementById('lowFat').checked) || (document.getElementById('lowCarb').checked) || (document.getElementById('lowSodium').checked)) {
		var response = await fetch(basicURL + dietURL + nutritionURL);
		console.log(basicURL + dietURL + nutritionURL);
		//diet and nutrition
	}
	else if ((document.getElementById('vegetarian').checked) || (document.getElementById('vegan').checked) || (document.getElementById('pescatarian').checked) || (document.getElementById('glutenFree').checked) || (document.getElementById('dairyFree').checked) || (document.getElementById('peanutFree').checked) && (document.getElementById('starter').checked) || (document.getElementById('mainCourse').checked) || (document.getElementById('dessert').checked) || (document.getElementById('drinks').checked)) {
		var response = await fetch(basicURL + dietURL + dishURL);
		console.log(basicURL + dietURL + dishURL);
		//diet and dish
	}
	else if ((document.getElementById('balanced').checked) || (document.getElementById('highFiber').checked) || (document.getElementById('highProtein').checked) || (document.getElementById('lowFat').checked) || (document.getElementById('lowCarb').checked) || (document.getElementById('lowSodium').checked) && (document.getElementById('starter').checked) || (document.getElementById('mainCourse').checked) || (document.getElementById('dessert').checked) || (document.getElementById('drinks').checked)) {
		var response = await fetch(basicURL + nutritionURL + dishURL)
		console.log(basicURL + nutritionURL + dishURL);
		//nutrition and dish
	}
	else if ((document.getElementById('vegetarian').checked) || (document.getElementById('vegan').checked) || (document.getElementById('pescatarian').checked) || (document.getElementById('glutenFree').checked) || (document.getElementById('dairyFree').checked) || (document.getElementById('peanutFree').checked) && (document.getElementById('balanced').checked) || (document.getElementById('highFiber').checked) || (document.getElementById('highProtein').checked) || (document.getElementById('lowFat').checked) || (document.getElementById('lowCarb').checked) || (document.getElementById('lowSodium').checked) && (document.getElementById('starter').checked) || (document.getElementById('mainCourse').checked) || (document.getElementById('dessert').checked) || (document.getElementById('drinks').checked)) {
		var response = await fetch(basicURL + dietURL + nutritionURL + dishURL);
		console.log(basicURL + dietURL + nutritionURL + dishURL);
		//diet and nutrition and dish
	}
	else {
		var response = await fetch(basicURL);
		console.log(basicURL);
		//no filter
	}

	const data = await response.json();
	showRecipes(data.hits);

	console.log(data)
}

//saves a specific recipe info to a variable
function storeRecipe(r) {
	var specificRecipe = r.getAttribute('value');
	console.log(specificRecipe);
}


function showRecipes(results) {
	docContainer.classList.remove("initial");
	let displayRecipes = "";
	let specificRecipe = "";
	results.map((result) => {
		displayRecipes += `
						<div class="recipeCard">  
									<p class="recipeTitle">${result.recipe.label}</p>
									<img class="recipeImage" src="${result.recipe.image}" alt="">
									<br />
									<div class="popOut"> 
										<span> Nutrition </span>
											<span class="popOutText">
												<p><b> Nutrition Info </b></p>
												<span class="nutritionList">
													<p> Calories: ${result.recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}kcal</p>
													<p> Fat: ${result.recipe.totalNutrients.FAT.quantity.toFixed(2)}g</p>
													<p> Saturated Fat: ${result.recipe.totalNutrients.FASAT.quantity.toFixed(2)}g</p>
													<p> Sugar: ${result.recipe.totalNutrients.SUGAR.quantity.toFixed(2)}g</p>
													<p> Protein: ${result.recipe.totalNutrients.PROCNT.quantity.toFixed(2)}g</p>
													<p> Fiber: ${result.recipe.totalNutrients.FIBTG.quantity.toFixed(2)}g</p>
													<p> Carbs: ${result.recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}g</p>
												</span>
											</span> 
									</div> 
									<br />
									<div class="popOut">
										 <span> Ingredients </span>
											<span class="popOutText"> 
												<span class="ingredientsList"> 
													<p><b> Ingredients List: </b></p>
													<p> ${result.recipe.ingredientLines}</p>
												</span>
											</span> 
									</div>
									<br />
									<a class="moreDetailsBtn storeRecipe" onclick="storeRecipe(this)" value="${result.recipe.url}"> More Details </a>
									<!-- used with function to save recipe info to a variable 
									<a class="moreDetailsBtn storeRecipe" onclick="storeRecipe(this)" value="${result.recipe}"> Save Recipe Info </a> -->

								</div>	
								`;
	});
	searchResultDiv.innerHTML = displayRecipes;
}
