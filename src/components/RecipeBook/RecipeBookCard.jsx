export default function RecipeBookCard({ recipe, setActiveRecipe, index }) {
  return (
    <div
      className="RecipeBookCard rounded-lg overflow-hidden group cursor-pointer flex flex-col bg-neutral-900"
      onClick={() => setActiveRecipe(index)}
    >
      <div className="relative w-full" style={{ paddingTop: "66.66%" }}>
        <img
          src={recipe.image}
          alt={`Image of ${recipe.name}`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <span className="z-10 text-white px-2 py-1 text-md font-semibold truncate">
        {recipe.name}
      </span>
    </div>
  );
}
