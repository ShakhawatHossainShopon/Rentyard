import { ProvideReview, ReviewCard, ReviewTitle } from "./components";

export const Reviews = ({ propertyId, reviews }) => {
  return (
    <div className="px-4 space-y-5" id="reviews">
      <ReviewTitle />
      <ProvideReview propertyId={propertyId} />
      <div className="space-y-5">
        {reviews.map((review, index) => (
          <ReviewCard propertyId={propertyId} key={index} review={review} />
        ))}
      </div>
    </div>
  );
};
