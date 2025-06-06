const ToggleBtn = ({
  children,
  onChange,
  checked,
  disabled = false,
  ...props
}) => {
  const textStyle = disabled
    ? "text-gray-400 dark:text-gray-500"
    : "text-gray-900 dark:text-gray-300";

  const containerStyle = `relative w-11 h-6 rounded-full transition-colors duration-500 ${
    disabled
      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
      : "bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
  }`;

  const knobStyle = `after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
    after:bg-white after:border after:rounded-full after:h-5 after:w-5 
    after:transition-transform after:duration-500 dark:after:border-gray-600 
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full`;

  return (
    <label
      className={`inline-flex items-center gap-2 ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <div className={`${containerStyle} ${knobStyle}`}></div>
      <span className={`text-sm font-medium ${textStyle}`}>{children}</span>
    </label>
  );
};

export default ToggleBtn;
