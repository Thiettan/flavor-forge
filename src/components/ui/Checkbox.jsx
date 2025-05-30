const Checkbox = ({ checked, onChange }) => {
  return (
    <input
      className="mr-2 cursor-pointer"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
export default Checkbox;
