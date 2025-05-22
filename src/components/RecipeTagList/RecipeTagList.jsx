export const RecipeTagList = ({ tag }) => {
  return (
    <ul className="my-4 list-none text-sm flex ">
      {tag.map((item, idx) => (
        <li
          className="mr-2 p-1 bg-white dark:bg-orange-900 rounded-lg"
          key={idx}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
