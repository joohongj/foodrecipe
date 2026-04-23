const API_KEY = 'STWwkht5v3tvyc3fyne7cdTZqB1Z3W4WwuAZKLWe';
const query = 'chicken';

const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}`;

async function getRecipes() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById('results');

    data.foods.forEach(food => {
      const div = document.createElement('div');
      div.textContent = food.description;
      container.appendChild(div);
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

getRecipes();


/v1/foods/search

