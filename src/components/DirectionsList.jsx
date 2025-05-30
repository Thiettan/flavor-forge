import React, { useState, useRef, useEffect } from "react";
import RemoveBtn from "./ui/RemoveBtn";
import Checkbox from "./ui/Checkbox";
import IconBtn from "./ui/IconBtn";
import EditIcon from "./ui/icons/EditIcon";

export const DirectionsList = ({
  directions,
  setDirections,
  editMode,
  className,
  showCheckbox,
}) => {
  // Track which step is being edited
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const inputRef = useRef(null);

  // Focus the input field automatically after rendering new input & when editing starts
  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  // Remove a step
  const handleRemove = (itemToRemove) => {
    setDirections(directions.filter((item) => item !== itemToRemove));
  };

  // Start editing a step
  const handleEditStart = (idx, value) => {
    setEditingIndex(idx);
    setEditingValue(value);
  };

  // Save the edited step
  const handleEditSave = () => {
    if (!editingValue.trim()) return; // prevent empty values
    const updated = [...directions];
    updated[editingIndex] = editingValue.trim();
    setDirections(updated);
    setEditingIndex(null); // exit edit mode
    setEditingValue("");
  };

  // Cancel editing without saving
  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  // Handle keyboard input: Enter to save, Escape to cancel
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const conditionalCSS = showCheckbox ? "flex" : "";

  return (
    <ol className={`mt-4 list-none text-sm ${className}`}>
      {directions.map((item, idx) => (
        <li key={idx} className={`relative my-2 ${conditionalCSS}`}>
          <div className="flex justify-between items-start gap-2">
            {/* Inline editing UI */}
            {editingIndex === idx ? (
              <div className="flex items-start gap-2 w-full">
                <span className="pt-1 text-gray-500">{idx + 1}.</span>
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
                {/* Normal step display */}
                <div className="w-full flex items-center gap-2">
                  {showCheckbox ? (
                    <Checkbox />
                  ) : (
                    <span className="text-gray-500">{idx + 1}.</span>
                  )}
                  <span>{item}</span>
                </div>
                {/* Edit/Remove buttons in editMode */}
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
    </ol>
  );
};
