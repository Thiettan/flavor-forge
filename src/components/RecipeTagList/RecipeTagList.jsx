import RemoveBtn from "../ui/RemoveBtn";

export const RecipeTagList = ({ tag, editMode, setTag }) => {
  //TO DO
  const handleRemove = (itemToRemove) => {
    setTag(tag.filter((item) => item !== itemToRemove));
  };
  return (
    <ul className="my-4 list-none text-sm flex flex-wrap">
      {tag.map((item, idx) => (
        <li
          className="relative mr-2 p-1 text-sm bg-white dark:bg-orange-900 rounded-lg"
          key={idx}
        >
          {item}
          {editMode && (
            <RemoveBtn
              variant="secondary"
              onClick={() => handleRemove(item)}
              className=""
            />
          )}
        </li>
      ))}
    </ul>
  );
};
