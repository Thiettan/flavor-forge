import MinusIcon from "./icons/MinusIcon";
const RemoveBtn = ({
  children,
  type = "button",
  variant = "primary",
  title = "Remove",
  className = "", //destructuring syntax a default string to avoid undefined
  ...props //Captures any extra props for flexibility
}) => {
  /*     const baseStyles =
    "bg-transparent text-white rounded-full flex items-center justify-center w-[1rem] h-[1rem] text-xs font-bold cursor-pointer text-center absolute "; */
  const baseStyles =
    "bg-transparent text-white rounded-full flex items-center justify-center w-[1rem] h-[1rem] text-xs font-bold cursor-pointer text-center";

  const variants = {
    primary:
      "bg-transparent text-white hover:bg-gray-700 focus:ring-gray-500 focus:border-gray-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    save: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
  };

  return (
    <span
      type={type}
      title={`${title}`}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <MinusIcon className="w-4 h-4 text-white hover:text-red-500" />
      {children}
    </span>
  );
};
export default RemoveBtn;
