/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllReviews } from "@/services/review/review.service";
import ReviewCard from "@/components/modules/review/ReviewCard";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

 const role: "ADMIN" | "SUPER_ADMIN" = "ADMIN";


return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {reviews.map((r:any) => (
      <ReviewCard key={r._id} review={r} role={role} />
    ))}
  </div>
);

}
