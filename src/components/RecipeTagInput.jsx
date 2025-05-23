import { useState } from "react";
import AddBtn from "./ui/AddBtn";
import Input from "./ui/Input";
import { RecipeTagList } from "./RecipeTagList/RecipeTagList";

const RecipeTagInput = ({ tag, handleAddTag, setTag }) => {
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
      <RecipeTagList tag={tag} editMode={true} setTag={setTag} />
    </div>
  );
};

export default RecipeTagInput;
