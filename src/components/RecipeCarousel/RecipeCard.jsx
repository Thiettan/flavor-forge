export default function RecipeCard({ recipe, i }) {
  return (
    <div
      className="relative w-64 h-64 rounded-lg overflow-hidden group cursor-pointer"
      key={`card-${i}`}
    >
      {/* Background image with hover zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${recipe.image})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none"></div>

      {/* Text content */}
      <div className="relative z-20 flex flex-col justify-end h-full p-4">
        <h3 className="text-2xl font-semibold text-white text-center transition-transform duration-300 group-hover:scale-105">
          {recipe.name}
        </h3>
      </div>
    </div>
  );
}
