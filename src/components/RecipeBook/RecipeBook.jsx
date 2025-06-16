import { useState } from "react";
import RecipeBookCard from "./RecipeBookCard";

export default function RecipeBook({ recipeBook }) {
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = ["All", ...new Set(recipeBook.flatMap((r) => r.tag || []))];
  const filteredRecipes =
    selectedTag === "All"
      ? recipeBook
      : recipeBook.filter((recipe) => (recipe.tag || []).includes(selectedTag));

  return (
    <div className="RecipeBook">
      <div className="flex flex-wrap gap-2 p-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full border ${
              selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-4 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item, i) => (
            <li key={`RecipeBook-${item.id}-${i}`}>
              <RecipeBookCard recipe={item} />
            </li>
          ))
        ) : (
          <li>No recipes match the selected tag.</li>
        )}
      </ul>
    </div>
  );
}
