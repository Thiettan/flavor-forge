import { useState } from "react";
import AddBtn from "./AddBtn";
import Input from "./Input";

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
        <Input
          id="RecipeForger-RecipeTag"
          name="RecipeTag"
          type="text"
          placeholder=""
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
