/* Show list of added ingredients */
import RemoveBtn from "./ui/RemoveBtn";
export const DirectionsList = ({ directions, setDirections, editMode }) => {
  const handleRemove = (itemToRemove) => {
    setDirections(directions.filter((item) => item !== itemToRemove));
  };
  return (
    <ol className="mt-4 list-decimal list-inside text-sm">
      {directions.map((item, idx) => (
        <li className="relative" key={idx}>
          <span className="indent-1 inline-block">
            {item}
            {editMode && (
              <RemoveBtn
                onClick={() => handleRemove(item)}
                className="right-0 z-10 top-1/2 -translate-y-1/2"
              />
            )}
          </span>
        </li>
      ))}
    </ol>
  );
};
