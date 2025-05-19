import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [ingredients, addIngredients] = useState([]);
  function handleAddIngredient(e) {
    e.preventDefault();
  }

  return (
    <>
      <h1 className="text-6xl text-center">Flavor Forge</h1>
      <div className="@container">
        <form action="" id="RecipeForger" className="max-w-md mx-auto">
          <p className="text-xl mb-5">Tailwind Test</p>
          <div className="mb-5">
            <label htmlFor="">Recipe Name</label>
            <input
              className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
              id="RecipeForger-RecipeName"
              name="RecipeName"
              type="text"
              placeholder=""
            />
          </div>

          <RecipeTagInput />

          <IngredientInput
            ingredients={ingredients}
            handleAddIngredient={handleAddIngredient}
          />
          <DirectionsInput />
        </form>
      </div>
    </>
  );
}

const RecipeTagInput = () => {
  return (
    <div className="mb-5">
      <label htmlFor="">Recipe Tag</label>
      <input
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeTag"
        name="RecipeTag"
        type="text"
        placeholder=""
      />
    </div>
  );
};

const IngredientInput = ({ ingredients, handleAddIngredient }) => {
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Ingredients</h3>
      <hr className="mb-3" />
      <label htmlFor="">Ingredient</label>
      <div className="flex">
        <input
          className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
          id="RecipeForger-RecipeIngredient"
          name="RecipeIngredient"
          type="text"
          value={ingredients}
        />
        <button className="" onClick={handleAddIngredient}>
          +
        </button>
      </div>
    </div>
  );
};

const DirectionsInput = () => {
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Directions</h3>
      <hr className="mb-3" />
      <label htmlFor="">Step</label>
      <textarea
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeStep"
        name="RecipeStep"
        type="text"
        placeholder=""
      />
      <button className="">+</button>
    </div>
  );
};

export default App;
