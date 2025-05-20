const RecipeNameInput = ({ name, handleAddName }) => {
  /*   const [inputValue, setInputValue] = useState("") */
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Recipe Name</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeName" className="hidden">
        Recipe Name
      </label>
      <input
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeName"
        name="RecipeName"
        type="text"
        placeholder={name}
        onChange={(e) => {
          handleAddName(e, e.target.value);
        }}
      />
    </div>
  );
};

export default RecipeNameInput;
