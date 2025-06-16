import { useRef, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeDisplay from "../RecipeDisplay/RecipeDisplay";

// 🧠 Context
import { useFlavorForge } from "../context/FlavorForgeContext";

export default function RecipeCarousel({
  openConfirmPopup,
  deleteAndUpdateRecipeBook,
}) {
  console.log(`RecipeCarousel rendered at: ${new Date().toLocaleTimeString()}`);
  const { recipeBook } = useFlavorForge(); // ✅ use context

  const [activeRecipe, setActiveRecipe] = useState(null);
  /*   const [recipeBook, setRecipeBook] = useState(getLocalStorage("recipeBook")); */
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      {recipeBook ? (
        <>
          <div
            ref={scrollRef}
            className="RecipeCarousel p-4 overflow-x-auto cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="flex gap-4 w-max">
              {recipeBook.map((item, i) => (
                <RecipeCard
                  key={i}
                  recipe={item}
                  i={i}
                  setActiveRecipe={setActiveRecipe}
                />
              ))}
            </div>
          </div>

          {activeRecipe !== null && (
            <RecipeDisplay
              setActiveRecipe={setActiveRecipe}
              props={recipeBook[activeRecipe]}
              openConfirmPopup={openConfirmPopup}
              deleteAndUpdateRecipeBook={deleteAndUpdateRecipeBook}
              Recipe={recipeBook[activeRecipe]}
            />
          )}
        </>
      ) : (
        <p>Your recipe book is empty</p>
      )}
    </>
  );
}
