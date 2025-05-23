import { useState } from "react";

const TestComponent = ({ props }) => {
  const [listItems, setListItems] = useState(props);

  function handleRemoveItem(e) {}

  return (
    <>
      <ul>
        {props.map((item, idx) => {
          return (
            <li key={idx} className="relative w-50">
              {item}
              <span className="text-center absolute -top-1 -right-1 bg-red-600 w-[1rem] h-[1rem] rounded">
                x
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TestComponent;
