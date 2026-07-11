
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
  mealSummary
}