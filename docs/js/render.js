import data from "./db.js";

function mealSummary(meal) {
  return `
    <article>
      <h6>${meal.name}</h6>
      ${meal.notes?`<p>${meal.notes}</p>`:""}
      ${meal.sides.length > 0 ? sidesSummary(meal.sides) : ""}
    </article>
  `;
}

function sidesSummary(sides) {
  let summary = `
  <details name="sides">
    <summary>Sides</summary>
    <ul>
  `;
  sides.forEach((side) => {
    summary += `<li>${side.name}${side.notes?` (${side.notes})`:""}</li>`;
  });
  summary += "</ul></details>";
  return summary;
}

function randomMeal(day, meal, side) {
  let summary = `
    <article>
      <h4>${day}</h4>
      <h6>${meal.name}</h6>
  `;
  if (side) {
    summary += `<p>With a side of ${side}</p>`;
  }
  if (meal.notes) {
    summary += `<p>${meal.notes}</p>`;
  }
  return summary;  
}

function buildMain() {

}

function form() {
  let form = `
  <form>
    <fieldset class="grid">
      `;
  form += buildSelect();
  form += `
      <input
        type="submit"
        value="Random"
      />
    </fieldset>
  </form>`;
  return form;
}

function buildSelect() {
  let select = "<select name='food-type'>";
  select += "<option selected value=''>All</option>";
  data.tags.forEach((tag) => {
    select += `<option value="${tag}">${tag}</option>`;
  });
  select += "</select>";
  return select;
}

function main() {
  return `
    ${form()}
    <hr/>
    <div id="results"></div>
  `;
}

function header() {
  return `<h1>Dinner Picker 9000</h1>`
}

function body() {
  return `
  <header id="header" class="container-fluid"></header>
  <main id="main" class="container"></main>
  `;
}
export default {
  body,
  header,
  mealSummary,
  randomMeal,
  main
}