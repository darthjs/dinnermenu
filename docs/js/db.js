import rawmeals from "../db/meals.json" with {type: "json"};
import rawsides from "../db/sides.json" with {type: "json"};

// {
//   "name": "Mashed Potatoes",
//   "notes": "",
//   "type": "STARCH"
// }
// {
//   "name": "Smoked Shotgun Shells",
//   "notes": "",
//   "sideTypes": [
//     "VEGGIE"
//   ],
//   "tags": [
//     "GRILL"
//   ]
// }

const sides = {};
const sideTypes = [];

let sidx = 0;
rawsides.forEach((side) => {
  side.id = sidx++;
  const key = side.type;
  if (sideTypes.indexOf(key) == -1) {
    sideTypes.push(key);
    sides[key] = [];
  }
  sides[key].push(side);
});
sideTypes.sort();
sideTypes.forEach((key) => {
  sides[key].sort();
});

const meals = [];
const mealsByTag = {};
const tags = [];

let midx = 1000;
rawmeals.forEach((meal) => {
  meal.id = midx++;
  meals.push(meal);

  meal.tags.forEach((tag) => {
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
      mealsByTag[tag] = [];
    }
    mealsByTag[tag].push(meal);
  });

  meal.sides = [];
  if (meal.sideTypes.length > 0) {
    meal.sideTypes.forEach((type) =>{
      sides[type].forEach((side) => meal.sides.push(side));
    });
    meal.sides.sort();
  }
});

meals.sort((a,b) => a.name.localeCompare(b.name));
tags.sort();
tags.forEach((tag) => {
  mealsByTag[tag].sort();
});

export default {
  sides,
  sideTypes,
  meals,
  mealsByTag,
  tags
}