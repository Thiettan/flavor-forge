import RecipeBookCard from "./RecipeBookCard";

export default function RecipeBook({ recipeBook }) {
  console.log(recipeBook);
  return (
    <div className="RecipeBook">
      <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-4 gap-4">
        {recipeBook && recipeBook.length > 0 ? (
          recipeBook.map((item, i) => (
            <li key={`RecipeBook-${item.id}-${i}`}>
              <RecipeBookCard recipe={item} />
            </li>
          ))
        ) : (
          <li>Loading recipe book...</li>
        )}
      </ul>
    </div>
  );
}
