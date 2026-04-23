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

    let button = "";

    // check if NOT on dessert page
    if (!window.location.href.includes("dessert")) {
      button = "<button onclick='addToPlate(" + calories + ")'>Add</button>";
    }

    div.innerHTML =
      "<h3>" + name + "</h3>" +
      "<p><b>Calories:</b> " + calories + " kcal</p>" +
      "<p><b>Brand:</b> " + brand + "</p>" +
      button;
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

  let foods = ["pizza", "burger", "cake", "salad", "pasta", "sandwich", "fries", "tacos", "hot dogs"];

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

  let desserts = ["cake", "ice cream", "cookies", "donut", "brownie", "milk shake", "pudding", "cheese cake", "chocolate cake", "cup cakes", "fruit cake", "sweets", "chocolates", "cotton candy"];

  let random = desserts[Math.floor(Math.random() * desserts.length)];

  document.getElementById("searchInput").value = random;

  searchFood();
}


// food Gallery

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 50;

async function getData() {
  const searchData = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?q=meal&hasImages=true"
  );

  const searchDataJson = await searchData.json();

  for (let i = 0; i < 50; i++) {

    const id = searchDataJson.objectIDs[i];

    const data = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );

    const json = await data.json();

    const image = document.createElement("img");
    image.src = json.primaryImage;

    // Wrap image in list item 

    const listItem = document.createElement("li");
    listItem.appendChild(image);
    if (i === 0) {
      listItem.classList.add("active");
    }
    frame.appendChild(listItem);

  }

}

// Switching between items

function goToItem(index) {
  const items = frame.querySelectorAll('li');
  items[currentItem].classList.remove('active');
  currentItem = index;
  items[currentItem].classList.add('active');
}

// Click event to cycle images

frame.addEventListener('click', function () {
  const nextItem = (currentItem + 1) % totalItems;
  goToItem(nextItem);
});

getData();