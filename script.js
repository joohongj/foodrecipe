// Adding key from USDA --- practicing

const API_KEY = 'STWwkht5v3tvyc3fyne7cdTZqB1Z3W4WwuAZKLWe';
// This has to be changed
const query = 'pasta';

const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${STWwkht5v3tvyc3fyne7cdTZqB1Z3W4WwuAZKLWe}&query=${query}`;

async function getRecipes() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}
