/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllReviews } from "@/services/review/review.service";
import ReviewCard from "@/components/modules/review/ReviewCard";

export default async function AdminReviewsPage() {
  let reviews = [];
  try {
    reviews = await getAllReviews();
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    reviews = [];
  }

  const role: "ADMIN" | "SUPER_ADMIN" = "ADMIN";

  // fallback condition
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No reviews available .
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((r: any) => (
        <ReviewCard key={r._id} review={r} role={role} />
      ))}
    </div>
  );
}
