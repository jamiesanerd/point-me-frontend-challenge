type StarProps = {
  marked: boolean;
  starId: number;
};

const Star = ({ marked, starId }: StarProps) => {
  return (
    <span
      data-star-id={starId}
      className="text-3xl cursor-pointer"
      role="button"
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

Star.displayName = "Star";
export default Star;
