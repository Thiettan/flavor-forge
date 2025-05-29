import RecipeForger from "./components/RecipeForger/RecipeForger";
import RecipeDisplay from "./components/RecipeDisplay/RecipeDisplay";

// 🔧 Helper Functions ====
import { getLocalStorage } from "./util/helper-functions";
// ========================

const test = getLocalStorage("recipeBook");

function App() {
  return (
    <>
      <RecipeForger />
      {test && <RecipeDisplay props={test[test.length - 1]} />}
    </>
  );
}

export default App;
