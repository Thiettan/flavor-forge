/* Show list of added ingredients */
export const DirectionsList = ({ directions }) => {
  return (
    <ol className="mt-4 list-decimal list-inside text-sm">
      {directions.map((item, idx) => (
        <li className="" key={idx}>
          <span className="indent-1 inline-block">{item}</span>
        </li>
      ))}
    </ol>
  );
};
