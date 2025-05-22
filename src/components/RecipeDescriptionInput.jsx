const RecipeDescriptionInput = ({ description, handleAddDescription }) => {
  return (
    <div className="mb-5">
      <h3 className="text-2xl mb-3">Description</h3>
      <hr className="mb-3" />
      <label htmlFor="RecipeForger-RecipeDescription" className="hidden">
        Description
      </label>
      <textarea
        className="border dark:border-b-gray-300 rounded-lg focus:ring-blue-500 w-full mt-1"
        id="RecipeForger-RecipeDescription"
        name="RecipeDescription"
        type="text"
        placeholder="Describe your creation..."
        value={description}
        onChange={(e) => {
          //setInputValue(e.target.value);
          handleAddDescription(e, e.target.value);
        }}
      />
    </div>
  );
};
export default RecipeDescriptionInput;
