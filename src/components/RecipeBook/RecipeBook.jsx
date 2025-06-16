import { useState } from "react";
import RecipeBookCard from "./RecipeBookCard";
import { RecipeTagList } from "../RecipeTagList/RecipeTagList";
import RecipeDisplay from "../RecipeDisplay/RecipeDisplay";

export default function RecipeBook({
  recipeBook,
  deleteAndUpdateRecipeBook,
  openConfirmPopup,
}) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeRecipe, setActiveRecipe] = useState(0);

  const allTags = ["All", ...new Set(recipeBook.flatMap((r) => r.tag || []))];
  const filteredRecipes =
    selectedTag === "All"
      ? recipeBook
      : recipeBook.filter((recipe) => (recipe.tag || []).includes(selectedTag));
  console.log(filteredRecipes);
  return (
    <div className="RecipeBook">
      <div className="flex flex-wrap gap-2 p-4">
        <RecipeTagList
          tag={allTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </div>

      <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-4 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item, i) => (
            <li key={`RecipeBook-${item.id}-${i}`}>
              <RecipeBookCard
                recipe={item}
                setActiveRecipe={setActiveRecipe}
                index={i}
              />
            </li>
          ))
        ) : (
          <li>No recipes match the selected tag.</li>
        )}
      </ul>
      <RecipeDisplay
        setActiveRecipe={setActiveRecipe}
        Recipe={filteredRecipes[activeRecipe]}
        deleteAndUpdateRecipeBook={deleteAndUpdateRecipeBook}
        openConfirmPopup={openConfirmPopup}
      />
    </div>
  );
}
