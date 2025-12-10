/* eslint-disable @typescript-eslint/no-explicit-any */

import ReviewCard from "@/components/modules/review/ReviewCard";
import { getReviewsBySellerId } from "@/services/review/review.service";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function SellerReviewsPage() {
const user = await getUserInfo();
  const reviews = await getReviewsBySellerId(user._id);
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        📝 No reviews available  .
      </div>
    );
  }
return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {reviews.map((r:any) => (
      <ReviewCard key={r._id} review={r} role="SELLER" />
    ))}
  </div>
);

}
