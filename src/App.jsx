import RecipeForger from "./components/RecipeForger/RecipeForger";
import RecipeDisplay from "./components/RecipeDisplay/RecipeDisplay";

// 🔧 Helper Functions ====
import { getLocalStorage } from "./util/helper-functions";
import RecipeCarousel from "./components/RecipeCarousel/RecipeCarousel";
// ========================

const recipeBook = getLocalStorage("recipeBook");

function App() {
  return (
    <>
      <h1 className="text-center">Flavor Forge</h1>
      <RecipeCarousel recipeBook={recipeBook} />
      <RecipeForger />
      {recipeBook && (
        <RecipeDisplay props={recipeBook[recipeBook.length - 1]} />
      )}
    </>
  );
}

export default App;
