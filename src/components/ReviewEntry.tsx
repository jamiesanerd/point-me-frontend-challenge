import Review from '@/data/Review';
import React from 'react';
import StarScale from './StarScale';

interface ReviewEntryProps {
  entry: Review;
}

export default function ReviewEntry({
  entry: { rating, review, author },
}: ReviewEntryProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-600">{author}</h2>
        <StarScale value={rating} display={true} />
      </div>
      {review && <div className="italic ext-gray-800 mt-4">{review}</div>}
    </div>
  );
}
