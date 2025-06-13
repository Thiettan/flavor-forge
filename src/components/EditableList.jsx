import React, { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import RemoveBtn from "./ui/RemoveBtn";
import Checkbox from "./ui/Checkbox";
import IconBtn from "./ui/IconBtn";
import EditIcon from "./ui/icons/EditIcon";
import { SortableItem } from "./ui/SortableItem";

/**
 * EditableList
 *
 * Renders a list of editable, optionally sortable and checkable items.
 * Supports edit mode enabling drag handles, editing, and removing.
 *
 * @param {string[]} items - Array of item strings
 * @param {function} setItems - State setter for items
 * @param {boolean} editMode - Enable edit features (drag, edit, remove)
 * @param {string} className - Additional CSS classes for the list container
 * @param {boolean} showCheckbox - Show checkbox for each item
 * @param {boolean} isOrdered - Render ordered list if true, unordered if false
 * @param {function|null} getItemPrefix - Optional function to get prefix (e.g., numbering)
 */
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

  // Focus the input field automatically when editing starts
  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  // Setup sensors for drag behavior
  // Always call hooks unconditionally to comply with React rules of hooks
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Drag only activates after moving 5 pixels to avoid accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Remove item at given index
  const handleRemove = (idxToRemove) => {
    setItems(items.filter((_, idx) => idx !== idxToRemove));
  };

  // Start editing item at index with current value
  const handleEditStart = (idx, value) => {
    setEditingIndex(idx);
    setEditingValue(value);
  };

  // Save the edited value and exit edit mode
  const handleEditSave = () => {
    if (!editingValue.trim()) return; // Prevent empty items
    const updated = [...items];
    updated[editingIndex] = editingValue.trim();
    setItems(updated);
    setEditingIndex(null);
    setEditingValue("");
  };

  // Cancel editing without saving changes
  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  // Handle Enter/Escape keys while editing
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  // Toggle checked state for checkbox items
  const toggleChecked = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Choose list type based on isOrdered flag
  const ListTag = isOrdered ? "ol" : "ul";

  // Handle drag end to update items order
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item === active.id);
      const newIndex = items.findIndex((item) => item === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  // Render each list item with editing, drag handle, checkbox, and remove buttons
  const renderListItems = () =>
    items.map((item, idx) => (
      <SortableItem key={item} id={item} index={idx}>
        {({ listeners }) => (
          <div className="flex justify-between items-start gap-2 w-full">
            {editingIndex === idx ? (
              // Edit mode input UI
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
                  {/* Drag handle only shown in edit mode */}
                  {editMode && (
                    <button
                      type="button"
                      {...listeners}
                      className="cursor-grab text-gray-400 hover:text-black"
                      aria-label="Drag to reorder"
                    >
                      ≡
                    </button>
                  )}
                  {/* Checkbox with label if enabled */}
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
                      {/* Prefix for unordered/ordered list */}
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

                {/* Edit and Remove buttons shown only in edit mode */}
                {editMode && (
                  <div className="flex gap-2 items-center justify-center">
                    <IconBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStart(idx, item);
                      }}
                    >
                      <EditIcon className="w-[1.5em] h-[1.5em]" />
                    </IconBtn>
                    <RemoveBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(idx);
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </SortableItem>
    ));

  return (
    <>
      {editMode ? (
        // Wrap with DndContext and SortableContext only when editing is enabled
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ListTag className={`mt-4 list-none text-sm pl-0 ${className}`}>
              {renderListItems()}
            </ListTag>
          </SortableContext>
        </DndContext>
      ) : (
        // Render plain list without drag-and-drop if not editing
        <ListTag className={`mt-4 list-none text-sm pl-0 ${className}`}>
          {renderListItems()}
        </ListTag>
      )}
    </>
  );
};
