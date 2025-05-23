import { useState } from "react";
import AddBtn from "./ui/AddBtn";
import { DirectionsList } from "./DirectionsList";

const DirectionsInput = ({
  directions,
  handleAddDirections,
  setDirections,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Directions</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeStep" className="hidden">
        Step
      </label>
      <textarea
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeStep"
        name="RecipeStep"
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
          handleAddDirections(e, inputValue);
        }}
      >
        +
      </AddBtn>

      <DirectionsList
        directions={directions}
        setDirections={setDirections}
        editMode={true}
      />
    </div>
  );
};

export default DirectionsInput;
