/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewCard from "@/components/modules/review/ReviewCard";
import { getMyReviews } from "@/services/review/review.service";

export default async function ClientReviewsPage() {
  const userRole = "CLIENT";
  let reviews = [];

  try {
    reviews = await getMyReviews();
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    reviews = [];
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        📝 No reviews available  .
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((r: any) => (
        <ReviewCard key={r._id} review={r} role={userRole} />
      ))}
    </div>
  );
}
