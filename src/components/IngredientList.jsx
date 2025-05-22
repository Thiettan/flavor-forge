/* Show list of added ingredients */
import React from "react";
export const IngredientList = React.memo(({ ingredients }) => {
  console.log("IngredientList rendered", ingredients);
  return (
    <ul className="mt-4 list-disc list-inside text-sm">
      {ingredients.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
});
