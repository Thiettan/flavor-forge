import RemoveBtn from "../ui/RemoveBtn";

export const RecipeTagList = ({ tag, editMode, setTag }) => {
  const handleRemove = (itemToRemove) => {
    setTag(tag.filter((item) => item !== itemToRemove));
  };

  const gradientClasses = [
    "bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400",
    "bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500",
    "bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400",
    "bg-gradient-to-r from-green-400 via-lime-300 to-green-500",
    "bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400",
    "bg-gradient-to-r from-red-400 via-rose-300 to-pink-400",
    "bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400",
  ];

  return (
    <ul className="my-4 list-none text-sm flex flex-wrap gap-2">
      {tag.map((item, idx) => (
        <li
          key={idx}
          className={`relative px-3 py-1 text-sm text-white rounded-full shadow-md ${
            gradientClasses[idx % gradientClasses.length]
          }`}
        >
          <span className="text-gray-800">{item}</span>
          {editMode && (
            <RemoveBtn
              variant="secondary"
              onClick={() => handleRemove(item)}
              className="ml-2"
            />
          )}
        </li>
      ))}
    </ul>
  );
};
