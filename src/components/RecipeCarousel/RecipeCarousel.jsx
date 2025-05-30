import RecipeCard from "./RecipeCard";
export default function RecipeCarousel({ recipeBook }) {
  /* const [Recipes, setRecipes] = useState(getLocalStorage("recipeBook")); */
  return (
    <>
      <div className="RecipeCarousel">
        <h2 className="text-4xl">RecipeCarousel</h2>
        <div className="flex gap-4">
          {recipeBook.map((item, i) => (
            <RecipeCard recipe={item} i={i} />
          ))}
        </div>
      </div>
    </>
  );
}
