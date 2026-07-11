const { parse } = require("csv-parse/sync");
const fs = require("fs");

const mealsfin = "./src/res/meals.csv";
const sidesfin = "./src/res/sides.csv";
const mealsfout = "./docs/db/meals.json";
const sidesfout = "./docs/db/sides.json";

console.log("Reading CSVs....");
const mealsData = parse(fs.readFileSync(mealsfin), {columns: (header) => header.map((column) => column.toLowerCase()), skip_empty_lines: true});
const sidesData = parse(fs.readFileSync(sidesfin), {columns: (header) => header.map((column) => column.toLowerCase()), skip_empty_lines: true});

console.log("Processing Sides....");
const sideTypes = {};
sidesData.forEach((side) => {
  side.type = side.type.toUpperCase().trim();
  if (side.type === "") {
    console.warn(`No Type for Side ${side.name}`);
    side.type = "NONE";
  }
  sideTypes[side.type]=true;
});

console.log("Processing Meals....");
mealsData.forEach((meal) => {
  let sides = meal.sides.split(",");
  delete meal.sides;
  meal.sideTypes = [];
  if (sides && sides.length > 0) {
    sides.forEach((side) => {
      if (side === "") {
        return;
      }
      side = side.toUpperCase().trim();
      if (sideTypes[side]) {
        meal.sideTypes.push(side);
      } else {
        console.warn(`Invalid Side Type ${side} for meal ${meal.name}`);
      }
    });
  }

  let tags = meal.tags.split(",");
  meal.tags = [];
  if (tags && tags.length > 0) {
    tags.forEach((tag) => {
      if (tag === "") { 
        return;
      }
      meal.tags.push(tag.toUpperCase().trim());
    });
  }
});

console.log("Writing JSONs....");
fs.writeFileSync(mealsfout, JSON.stringify(mealsData, null, 2));
fs.writeFileSync(sidesfout, JSON.stringify(sidesData, null, 2));