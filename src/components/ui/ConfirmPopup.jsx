import { useEffect, useRef } from "react";
import SuccessIcon from "../../assets/success-namazu.jpg";
export default function ConfirmPopup({
  isVisible,
  title,
  icon = "Success",
  message,
  onConfirm,
  onClose,
}) {
  const popupRef = useRef(null);
  const ICONS = {
    Success: SuccessIcon,
  };

  // Close when clicking outside the popup
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-amber-900 p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
      >
        <p className="text-2xl">{title}</p>
        <img
          src={ICONS[icon] || SuccessIcon}
          alt={`${icon} icon`}
          className="mx-auto w-24 h-24 mb-4 rounded-full"
        />
        <p className="text-md mb-4">{message}</p>

        <button
          onClick={onConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
