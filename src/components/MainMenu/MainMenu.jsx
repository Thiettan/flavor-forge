// 🧠 Context
import { useFlavorForge } from "../context/FlavorForgeContext";

export default function MainMenu() {
  const { currentPage, handleSetCurrentPage, setTempData } = useFlavorForge(); // ⬅️ get from context
  const menuOptions = ["Recipe Carousel", "Recipe Forge", "Recipe Book"];
  const isActiveCSS = "bg-amber-700";
  const isInactiveCSS = "bg-gray-700";

  return (
    <div className="container mx-auto">
      <div className="flex gap-4 justify-center">
        {menuOptions.map((item, i) => (
          <div
            onClick={() => {
              setTempData(null);
              handleSetCurrentPage(i);
            }}
            key={`menu-item-${i}`}
            className={`relative w-64 h-32 rounded-lg overflow-hidden group cursor-pointer ${
              i === currentPage ? isActiveCSS : isInactiveCSS
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-semibold text-white text-center transition-transform duration-300 group-hover:scale-105">
                {item}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
