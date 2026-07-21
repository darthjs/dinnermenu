import data from "./db.js";
import renderers from "./render.js";

function init() {
  document.getElementsByTagName("body")[0].innerHTML = renderers.body();
  document.getElementById("header").innerHTML = renderers.header();
  document.getElementById("main").innerHTML = renderers.main();

  document.forms[0].onsubmit = randomMenu;

  document.forms[0]["food-type"].onchange = (evt) => {
    renderSummary(evt.target.value);
  }
  renderSummary("");
}

function rndInt(len) {
  return Math.floor(Math.random() * len)
}

function randomMenu(evt) {
  evt.preventDefault();
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const meals = [];
  for (let i=0; i<7; i++) {
    let meal = data.meals[rndInt(data.meals.length)];
    if (meals.indexOf(meal) > -1) {
      i--;
    } else {
      meals.push(meal);
    }
  }
  
  const dispEl = document.getElementById("results");
  dispEl.innerHTML = "";
  for (let i=0; i<7; i++) {
    let side = null;
    let meal = meals[i];
    if (meal.sides.length > 0) {
      side = meal.sides[rndInt(meal.sides.length)];
    }

    dispEl.innerHTML += renderers.randomMeal(days[i], meal, side);
  }
}

function renderSummary(tag) {
  const display = (tag == "") ? data.meals : data.mealsByTag[tag];

  const dispEl = document.getElementById("results");
  dispEl.innerHTML = "";
  display.forEach((meal) => {
    dispEl.innerHTML += renderers.mealSummary(meal);  
  });
}

init();