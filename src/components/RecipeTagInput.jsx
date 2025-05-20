import { useState } from "react";
import AddBtn from "./AddBtn";

const RecipeTagInput = ({ tag, handleAddTag }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Recipe Tag</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeTag" className="hidden">
        Recipe Tag
      </label>
      <div className="flex">
        <input
          className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
          id="RecipeForger-RecipeTag"
          name="RecipeTag"
          type="text"
          placeholder=""
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <AddBtn
          variant="primary"
          onClick={(e) => {
            handleAddTag(e, inputValue);
          }}
        >
          +
        </AddBtn>
      </div>
      <ul className="mt-4 list-disc list-inside text-sm">
        {tag.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeTagInput;
