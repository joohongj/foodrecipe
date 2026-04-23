const API_KEY = "i7hz2ELaeGGhzsdSqEnxIG7SbPuZXLjvNBX8Iat1";

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
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayFood(data.foods);
    })
    .catch(function(error) {
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

    let calories = "Not available";

    // tell about calories
    for (let j = 0; j < food.foodNutrients.length; j++) {
      let nutrient = food.foodNutrients[j];

      if (nutrient.nutrientName === "Energy") {
        calories = nutrient.value + " kcal";
      }
    }

    let div = document.createElement("div");
    div.className = "food-card";

    div.innerHTML =
      "<h3>" + name + "</h3>" +
      "<p><b>Calories:</b> " + calories + "</p>" +
      "<p><b>Brand:</b> " + brand + "</p>";

    container.appendChild(div);
  }
}