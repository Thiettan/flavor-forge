import { useState } from "react";

import RecipeForger from "./components/RecipeForger/RecipeForger";
import RecipeDisplay from "./components/RecipeDisplay/RecipeDisplay";
import MainMenu from "./components/MainMenu/MainMenu";

import RecipeCarousel from "./components/RecipeCarousel/RecipeCarousel";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const AppList = [<RecipeCarousel />, <RecipeForger />];

  return (
    <>
      <h1 className="text-center">Flavor Forge</h1>
      <MainMenu currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {AppList[currentPage]}
    </>
  );
}

export default App;
