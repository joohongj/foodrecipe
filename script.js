const API_KEY = "i7hz2ELaeGGhzsdSqEnxIG7SbPuZXLjvNBX8Iat1";

let totalCalories = 0;

// runs when button is clicked
function searchFood() {

  let input = document.getElementById("searchInput").value;

  if (input === "") {
    alert("Please enter a food");
    return;
  }

  let url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key="
    + API_KEY + "&query=" + input;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayFood(data.foods);
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}


// shows results
function displayFood(foodList) {

  let container = document.getElementById("results");
  container.innerHTML = ""; // clear old results

  if (!foodList || foodList.length === 0) {
    container.innerHTML = "<p>No results found</p>";
    return;
  }

  for (let i = 0; i < 3; i++) {

    if (i >= foodList.length) {
      break;
    }

    let food = foodList[i];

    let name = food.description;
    let brand = food.brandOwner ? food.brandOwner : "No brand";

    let calories = 0;

    // tell about calories
    for (let j = 0; j < food.foodNutrients.length; j++) {
      let nutrient = food.foodNutrients[j];

      if (nutrient.nutrientName === "Energy") {
        calories = nutrient.value;
      }
    }

    let div = document.createElement("div");
    div.className = "food-card";

    div.innerHTML =
      "<h3>" + name + "</h3>" +
      "<p><b>Calories:</b> " + calories + " kcal</p>" +
      "<p><b>Brand:</b> " + brand + "</p>" +
      "<button onclick='addToPlate(" + calories + ")'>Add</button>"

    container.appendChild(div);
  }
}

// add calories to totaal

function addToPlate(cal) {

  let number = parseFloat(cal);

  if (!isNaN(number)) {
    totalCalories += number;
  }
  document.getElementById("total").innerHTML =
    "Total Calories: " + totalCalories + "Kcal";
}

function randomFood() {

  let foods = ["pizza", "burger", "cake", "salad", "pasta"];

  let random = foods[Math.floor(Math.random() * foods.length)];

  document.getElementById("searchInput").value = random;

  searchFood();
}

// buttton for  (cake, cookies, etc.)
function quickDessert(item) {
  document.getElementById("searchInput").value = item;
  searchFood();
}


// random buttons
function randomDessert() {

  let desserts = ["cake", "ice cream", "cookies", "donut", "brownie"];

  let random = desserts[Math.floor(Math.random() * desserts.length)];

  document.getElementById("searchInput").value = random;

  searchFood();
}