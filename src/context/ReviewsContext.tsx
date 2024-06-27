import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import Review from '@/data/Review';

const API_ROOT = 'http://localhost:3000/api';
const DEFAULT_PAGE_SIZE = 5;

type ReviewFormData = Omit<Review, 'id'>;

// Create a new context for reviews
const ReviewsContext = createContext<{
  reviews: Review[];
  addReview: (newReview: ReviewFormData) => void;
  isLoading: boolean;
  loadMoreReviews: () => void;
  hasMore: boolean;
}>({
  reviews: [],
  addReview: () => {},
  isLoading: false,
  loadMoreReviews: () => {},
  hasMore: true,
});

// Create a ReviewsProvider component
const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial page of reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_ROOT}/reviews?page=1&pageSize=${DEFAULT_PAGE_SIZE}`,
        );
        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Load more reviews, TODO: implement true pagination in the endpoint so we know when we've reached the end
  // instead of the current hacky way of checking if we got less than the page size
  const loadMoreReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_ROOT}/reviews?page=${
          currentPage + 1
        }&pageSize=${DEFAULT_PAGE_SIZE}`,
      );
      const data = await response.json();
      if (data.length < DEFAULT_PAGE_SIZE) {
        setHasMore(false);
      }
      setIsLoading(false);
      setCurrentPage(prevPage => prevPage + 1);
      setReviews(prevReviews => [...prevReviews, ...data]);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching reviews:', error);
    }
  }, [currentPage]);

  // Function to update a review
  const addReview = useCallback(async (newReview: ReviewFormData) => {
    try {
      const response = await fetch(`${API_ROOT}/review`, {
        method: 'POST',
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        console.log('Review added successfully');
        // in the real world we'd update this so it's getting the value from the server, for now just adding an id i know is safe
        setReviews(prevReviews => [
          ...prevReviews,
          { ...newReview, id: prevReviews.length + 100 },
        ]);
      } else {
        console.error('Error updating review:', response.status);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  }, []);

  // Add the updateReview function to the context value
  return (
    <ReviewsContext.Provider
      value={{ reviews, isLoading, loadMoreReviews, hasMore, addReview }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

const useReviewContext = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviewContext must be used within a ReviewsProvider');
  }
  return context;
};

export { ReviewsContext, ReviewsProvider, useReviewContext };
