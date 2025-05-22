const AddBtn = ({
  children,
  type = "button",
  variant = "primary",
  className = "", //destructuring syntax a default string to avoid undefined
  ...props //Captures any extra props for flexibility
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    save: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AddBtn;
