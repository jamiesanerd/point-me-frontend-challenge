import StarRating from '@/components/StarRating';
import { ReviewsProvider } from '@/context/ReviewsContext';
import ReviewList from './ReviewList';

const ReviewApp = () => {
  // Tip: You can grab data with fetch or an HTTP client of your choice:
  //      await fetch("http://localhost:3000/api/reviews")
  //      await axios.get("http://localhost:3000/api/reviews")

  return (
    <ReviewsProvider>
      <StarRating />
      <ReviewList />
    </ReviewsProvider>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
