import { useState } from 'react';
import StarScale from './StarScale';
import { useReviewContext } from '@/context/ReviewsContext';

const STAR_SCALE = [1, 2, 3, 4, 5];

const StarRating = () => {
  const { addReview } = useReviewContext();
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const handleOnValueChange = (starId: number) => {
    setSelectedStar(starId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedStar === null) {
      return;
    }
    const review = {
      rating: selectedStar,
      review: e.currentTarget.review.value,
      author: 'Current User', // For now, we'll just hardcode the author
    };
    addReview(review);
  };

  return (
    <form
      className="flex flex-col items-center border border-gray-300 rounded-lg p-4 mb-4 w-full"
      onSubmit={e => handleSubmit(e)}
    >
      <StarScale value={selectedStar} onValueChange={handleOnValueChange} />
      <textarea
        name="review"
        placeholder="Enter your review"
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <input
        disabled={selectedStar === null}
        type="submit"
        role="button"
        value="Submit review"
        className={`mt-10 h-10 px-6 font-semibold rounded-md bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed`}
      />
    </form>
  );
};

StarRating.displayName = 'StarRating';
export default StarRating;
