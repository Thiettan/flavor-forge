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
    "bg-transparent text-white rounded-full w-[1rem] h-[1rem] text-xs font-bold cursor-pointer text-center";

  const variants = {
    primary: "flex items-center justify-center",
    secondary: "absolute -top-1 -right-1",
    danger: "",
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
