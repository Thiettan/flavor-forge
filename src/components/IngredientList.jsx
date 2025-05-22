/* Show list of added ingredients */
export const IngredientList = ({ ingredients }) => {
  console.log(ingredients);
  return (
    <ul className="mt-4 list-disc list-inside text-sm">
      {ingredients.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
};
