import { useState } from "react";
import AddBtn from "./AddBtn";
import Input from "./Input";
import { IngredientList } from "./IngredientList";

const IngredientInput = ({ ingredients, handleAddIngredient }) => {
  const [inputValue, setInputValue] = useState("");
  console.log(ingredients);
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Ingredients</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeIngredient" className="hidden">
        Ingredient
      </label>
      <div className="flex">
        {/*         <input
          className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
          id="RecipeForger-RecipeIngredient"
          name="RecipeIngredient"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        /> */}
        <Input
          id="RecipeForger-RecipeIngredient"
          name="RecipeIngredient"
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <AddBtn
          variant="primary"
          onClick={(e) => {
            handleAddIngredient(e, inputValue);
          }}
        >
          +
        </AddBtn>
      </div>
      <IngredientList ingredients={ingredients} />
    </div>
  );
};

export default IngredientInput;
