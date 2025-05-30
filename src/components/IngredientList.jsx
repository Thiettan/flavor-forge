import React, { useState, useRef, useEffect } from "react";
import RemoveBtn from "./ui/RemoveBtn";
import Checkbox from "./ui/Checkbox";
import IconBtn from "./ui/IconBtn";
import EditIcon from "./ui/icons/EditIcon";

export const IngredientList = React.memo(
  ({ ingredients, editMode, setIngredients, className, showCheckbox }) => {
    // Track which item is currently being edited
    const [editingIndex, setEditingIndex] = useState(null);

    // Store the value of the item being edited
    const [editingValue, setEditingValue] = useState("");

    // Ref to the input field for auto-focus
    const inputRef = useRef(null);

    // Focus the input when editing is triggered
    useEffect(() => {
      if (editingIndex !== null && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editingIndex]);

    // Remove an ingredient from the list
    const handleRemove = (itemToRemove) => {
      setIngredients(ingredients.filter((item) => item !== itemToRemove));
    };

    // Start editing a specific ingredient
    const handleEditStart = (idx, value) => {
      setEditingIndex(idx);
      setEditingValue(value);
    };

    // Save the edited ingredient
    const handleEditSave = () => {
      if (!editingValue.trim()) return; // prevent empty values
      const updated = [...ingredients];
      updated[editingIndex] = editingValue.trim();
      setIngredients(updated);
      setEditingIndex(null); // exit edit mode
      setEditingValue("");
    };

    // Cancel edit mode without saving
    const handleEditCancel = () => {
      setEditingIndex(null);
      setEditingValue("");
    };

    // Allow saving with Enter or cancelling with Escape
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
      <ul className={`mt-4 list-none text-sm pl-0 ${className}`}>
        {ingredients.map((item, idx) => (
          <li key={idx} className={`relative my-2 ${conditionalCSS}`}>
            <div className="flex justify-between items-center gap-2">
              {/* If this is the item being edited, show input field */}
              {editingIndex === idx ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    ref={inputRef} // auto-focus
                    className="text-sm px-2 py-1 border rounded w-full"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={handleKeyDown} // handle Enter / Escape
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
                  {/* Normal display mode */}
                  <div className="w-full flex items-center gap-2">
                    {showCheckbox ? (
                      <Checkbox />
                    ) : (
                      <span className="text-gray-500 pt-[2px]">•</span>
                    )}
                    <span>{item}</span>
                  </div>
                  {/* Edit and Remove buttons (only in editMode) */}
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
      </ul>
    );
  }
);
