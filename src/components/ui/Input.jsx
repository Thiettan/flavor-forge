// components/Input.jsx
const Input = ({ type, className = "", ...props }) => {
  const baseStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const variants = {
    button:
      "px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 cursor-pointer",
    checkbox:
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500",
    color: "w-12 h-10 border border-gray-300 rounded cursor-pointer",
    date: "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    "datetime-local":
      "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    email:
      "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    file: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
    hidden: "", // No styling needed
    image:
      "w-24 h-24 object-cover border border-gray-300 rounded-md cursor-pointer",
    month:
      "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    number:
      "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    password:
      "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    radio:
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500",
    range:
      "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm",
    reset:
      "px-4 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400 cursor-pointer",
    search:
      "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    submit:
      "px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 cursor-pointer",
    tel: "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    text: "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    time: "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    url: "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
    week: "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
  };

  return (
    <input
      type={type}
      className={`${baseStyles} ${variants[type]} ${className}`}
      {...props}
    />
  );
};

export default Input;
