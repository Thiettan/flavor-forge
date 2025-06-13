/**
 * SortableItem wraps a single item and enables drag-and-drop sorting.
 * It uses useSortable hook to provide drag attributes and styling.
 *
 * @param {string} id - Unique id for sortable item
 * @param {number} index - Index of the item in the list
 * @param {function} children - Render function which receives drag listeners
 */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export function SortableItem({ id, index, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative my-2"
    >
      {/* Pass drag listeners to children so drag handle can attach them */}
      {children({ listeners })}
    </li>
  );
}
