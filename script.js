// DOM Elements
const foodForm = document.getElementById('food-form');
const foodNameInput = document.getElementById('food-name');
const calorieInput = document.getElementById('calorie-count');
const foodList = document.getElementById('food-list');
const totalCaloriesDisplay = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');

let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

// Add food item
function addFood(name, calories) {
  const item = {
    id: Date.now(),
    name,
    calories: parseInt(calories),
  };
  foodItems.push(item);
  updateUI();
  saveToLocalStorage();
}

// Remove food item
function removeFood(id) {
  foodItems = foodItems.filter(item => item.id !== id);
  updateUI();
  saveToLocalStorage();
}

// Update the UI
function updateUI() {
  foodList.innerHTML = '';
  let total = 0;
  foodItems.forEach(item => {
    total += item.calories;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ${item.calories} kcal
      <button onclick="removeFood(${item.id})">❌</button>
    `;
    foodList.appendChild(li);
  });

  totalCaloriesDisplay.textContent = total;
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('foodItems', JSON.stringify(foodItems));
}

// Reset everything
resetBtn.addEventListener('click', () => {
  foodItems = [];
  updateUI();
  saveToLocalStorage();
});

// Form submission
foodForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = foodNameInput.value.trim();
  let calories = calorieInput.value;

  // Simulated fetch API call to get calorie data
  if (!calories) {
    calories = await fetchCalorieData(name);
  }

  if (name && calories) {
    addFood(name, calories);
    foodForm.reset();
  }
});

// Simulated fetch API (placeholder)
async function fetchCalorieData(foodName) {
  // Simulating an API response delay
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeData = {
        apple: 95,
        banana: 105,
        bread: 79,
        rice: 206,
        egg: 78
      };
      resolve(fakeData[foodName.toLowerCase()] || 100); // default 100 kcal
    }, 500);
  });
}

// Initialize on load
updateUI();


const food = "sausage"
const values={
 food
}
const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=d4e664d6&app_key=015f2e7336534a7edc199b6bc85cef64&ingr=${food}&nutrition-type=cooking`
await fetch(apiUrl)
 .then(response => {
 if (!response.ok) {
 throw new Error('Network response was not ok');
 }
 
 return response.json();
 })
 .then(data=> values.calories = data.parsed[0].food.nutrients.ENERC_KCAL)
 .catch(error => {
 console.error(`There was a problem with
 the fetch operation:`, error);
 });

 console.log(values.calories);

 