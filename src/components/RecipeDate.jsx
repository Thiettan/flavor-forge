export default function RecipeDate({ date }) {
  const displayDate = new Date(date).toLocaleDateString();
  return (
    <>
      <span className="text-gray-400 text-sm">{displayDate}</span>
    </>
  );
}
