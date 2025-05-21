
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

 