import data from "./db.js";
import renderers from "./render.js";

function init() {
  document.getElementsByTagName("body")[0].innerHTML = renderers.body();
  document.getElementById("header").innerHTML = renderers.header();

  document.getElementById("main").innerHTML = "";
  data.meals.forEach((meal) => {
    document.getElementById("main").innerHTML += renderers.mealSummary(meal);  
  });
}

init();