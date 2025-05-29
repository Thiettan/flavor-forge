/* Show list of added ingredients */
import React from "react";
import RemoveBtn from "./ui/RemoveBtn";
import Checkbox from "./ui/Checkbox";
export const IngredientList = React.memo(
  ({ ingredients, editMode, setIngredients, className, showCheckbox }) => {
    console.log("IngredientList rendered", ingredients);

    const handleRemove = (itemToRemove) => {
      setIngredients(ingredients.filter((item) => item !== itemToRemove));
    };
    const conditionalCSS = showCheckbox ? "flex" : "";
    return (
      <ul className={`mt-4 list-disc list-inside text-sm ${className}`}>
        {ingredients.map((item, idx) => (
          <li key={idx} className={`relative my-2 ${conditionalCSS}`}>
            {showCheckbox && <Checkbox />}
            {item}
            {editMode && (
              <RemoveBtn
                onClick={() => handleRemove(item)}
                className="right-0 z-10 top-1/2 -translate-y-1/2"
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
);
