export default function IconBtn({
  children,
  type = "button",
  variant = "primary",
  className = "", //destructuring syntax a default string to avoid undefined
  tooltip = "",
  ...props //Captures any extra props for flexibility
}) {
  const baseStyles =
    "inline-flex items-center justify-center  rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variants = {
    primary:
      " text-white hover:text-tangerine-200  focus:ring-tangerine-300 focus:border-tangerine-300 ",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    save: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
    utility: "bg-gray-700 hover:bg-gray-600",
  };

  return (
    <div className="relative group inline-block">
      <button
        type={type}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>

      {tooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max text-xs bg-gray-800 text-white px-2 py-1 rounded z-10 whitespace-nowrap">
          {tooltip}
        </span>
      )}
    </div>
  );
}
