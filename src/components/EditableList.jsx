import React, { useState, useRef, useEffect } from "react";
import RemoveBtn from "./ui/RemoveBtn";
import Checkbox from "./ui/Checkbox";
import IconBtn from "./ui/IconBtn";
import EditIcon from "./ui/icons/EditIcon";

export const EditableList = ({
  items,
  setItems,
  editMode = false,
  className = "",
  showCheckbox = false,
  isOrdered = false,
  getItemPrefix = null,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleRemove = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  const handleEditStart = (idx, value) => {
    setEditingIndex(idx);
    setEditingValue(value);
  };

  const handleEditSave = () => {
    if (!editingValue.trim()) return;
    const updated = [...items];
    updated[editingIndex] = editingValue.trim();
    setItems(updated);
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const toggleChecked = (index) => {
    console.log("fired", index);
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const ListTag = isOrdered ? "ol" : "ul";

  return (
    <ListTag className={`mt-4 list-none text-sm pl-0 ${className}`}>
      {items.map((item, idx) => (
        <li key={idx} className={`relative my-2 ${showCheckbox ? "flex" : ""}`}>
          <div className="flex justify-between items-start gap-2 w-full">
            {editingIndex === idx ? (
              <div className="flex items-start gap-2 w-full">
                {getItemPrefix && (
                  <span className="pt-1 text-gray-500">
                    {getItemPrefix(idx)}
                  </span>
                )}
                <input
                  type="text"
                  ref={inputRef}
                  className="text-sm px-2 py-1 border rounded w-full"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleEditSave}
                  className="text-xs px-2 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="text-xs px-2 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="w-full flex items-center gap-2">
                  {showCheckbox ? (
                    <label className="flex items-center gap-2 w-full cursor-pointer">
                      <Checkbox
                        checked={checkedItems[idx] || false}
                        onChange={() => toggleChecked(idx)}
                      />
                      <span
                        className={`strike-animate transition-colors duration-300 ${
                          checkedItems[idx] ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  ) : (
                    <>
                      <span className="text-gray-500 pt-[2px]">
                        {getItemPrefix ? getItemPrefix(idx) : "•"}
                      </span>
                      <span
                        className={`strike-animate transition-colors duration-300 ${
                          checkedItems[idx] ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item}
                      </span>
                    </>
                  )}
                </div>
                {editMode && (
                  <div className="flex gap-2 items-center justify-center">
                    <IconBtn onClick={() => handleEditStart(idx, item)}>
                      <EditIcon className="w-[1.5em] h-[1.5em]" />
                    </IconBtn>
                    <RemoveBtn onClick={() => handleRemove(item)} />
                  </div>
                )}
              </>
            )}
          </div>
        </li>
      ))}
    </ListTag>
  );
};
