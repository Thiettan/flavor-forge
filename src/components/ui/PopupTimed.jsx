// src/components/ui/Popup.jsx
import { useEffect } from "react";

export default function PopupTimed({
  message,
  isVisible,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose(); // Auto-close after duration
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 right-5 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300">
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          &times;
        </button>
      </div>
    </div>
  );
}
