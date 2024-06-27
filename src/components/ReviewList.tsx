import React, { useState } from 'react';
import ReviewEntry from './ReviewEntry';
import { useReviewContext } from '@/context/ReviewsContext';

const ReviewList: React.FC = () => {
  const { reviews, isLoading, hasMore, loadMoreReviews } = useReviewContext();

  return (
    <section className="flex flex-col items-stretch">
      <p className="italic mb-4 text-center text-gray-500">
        Hear what other customers have to say:
      </p>
      {reviews.map(review => (
        <ReviewEntry key={review.id} entry={review} />
      ))}
      {isLoading ? (
        <p className="italic mb-4 text-center text-gray-500">Loading...</p>
      ) : (
        hasMore && (
          <button
            className="h-10 px-6 font-semibold rounded-md bg-brand-purple text-white self-center"
            onClick={loadMoreReviews}
          >
            Load More
          </button>
        )
      )}
    </section>
  );
};

export default ReviewList;
