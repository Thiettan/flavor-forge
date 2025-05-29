/* Show list of added ingredients */
import RemoveBtn from "./ui/RemoveBtn";
import Checkbox from "./ui/Checkbox";
export const DirectionsList = ({
  directions,
  setDirections,
  editMode,
  className,
  showCheckbox,
}) => {
  const handleRemove = (itemToRemove) => {
    setDirections(directions.filter((item) => item !== itemToRemove));
  };
  const conditionalCSS = showCheckbox ? "flex" : "";
  return (
    <ol className={`mt-4 list-decimal list-inside text-sm ${className}`}>
      {directions.map((item, idx) => (
        <li key={idx} className={`relative my-2 ${conditionalCSS}`}>
          <span className="indent-1 inline-block">
            {showCheckbox && <Checkbox />}
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
