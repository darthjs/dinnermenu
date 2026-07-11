import fs from "fs";
import rawmeals from "../docs/db/meals.json" with {type: "json"};
import rawsides from "../docs/db/sides.json" with {type: "json"};

// {"name":"Pizza, BBQ Chicken", "sides":"veggie,starch", "tags":"kids,grill"},
// {"name":"Mashed Potatoes", "type":"veggie"},

console.log(rawmeals);
console.log(rawsides);

let meals = "Name,Notes,Sides,Tags\n";
let sides = "Name,Notes,Type\n";

rawmeals.forEach((meal) => {
  meals += `"${meal.name}",,"${meal.sides?meal.sides:""}","${meal.tags?meal.tags:""}"\n`;
});
rawsides.forEach((side) => {
  sides += `"${side.name}",,"${side.type}"\n`;
});

//Commenting to prevent overwrite of the good csvs
// fs.writeFileSync("./src/res/meals.csv",meals);
// fs.writeFileSync("./src/res/sides.csv",sides);