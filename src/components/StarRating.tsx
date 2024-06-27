import Star from "@/components/Star";

const StarRating = () => {
  return (
    <section className="flex flex-col items-center">
      <div>
        <Star starId={1} marked={false} />
        <Star starId={2} marked={false} />
        <Star starId={3} marked={false} />
        <Star starId={4} marked={false} />
        <Star starId={5} marked={false} />
      </div>
      <input
        type="submit"
        className="mt-10 h-10 px-6 font-semibold rounded-md bg-black text-white"
        value="Submit review"
      />
    </section>
  );
};

StarRating.displayName = "StarRating";
export default StarRating;
