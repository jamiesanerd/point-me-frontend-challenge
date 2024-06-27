interface StarProps extends React.HTMLAttributes<HTMLSpanElement> {
  hovered: boolean;
  marked: boolean;
  starId: number;
};

const Star: React.ElementType<StarProps> = ({ hovered, marked, starId, ...props }) => {
  return (
    <span
      data-star-id={starId}
      className={`text-3xl cursor-pointer ${hovered ? "text-blue-300" : "text-yellow-500"}`}
      role="button"
      {...props}
    >
      {(marked || hovered) ? "\u2605" : "\u2606"}
    </span>
  );
};

Star.displayName = "Star";
export default Star;
