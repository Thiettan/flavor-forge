import { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeDisplay from "../RecipeDisplay/RecipeDisplay";

import { getLocalStorage } from "../../util/helper-functions";

export default function RecipeCarousel() {
  /* const [Recipes, setRecipes] = useState(getLocalStorage("recipeBook")); */
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [recipeBook, setRecipeBook] = useState(getLocalStorage("recipeBook"));
  return (
    <>
      <div className="RecipeCarousel p-4">
        <div className="flex gap-4">
          {recipeBook.map((item, i) => (
            <RecipeCard recipe={item} i={i} setActiveRecipe={setActiveRecipe} />
          ))}
        </div>
      </div>
      {activeRecipe !== null && (
        <RecipeDisplay props={recipeBook[activeRecipe]} />
      )}
    </>
  );
}
