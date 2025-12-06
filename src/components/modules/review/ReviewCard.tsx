/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface ReviewCardProps {
  review: any;
  role: "CLIENT" | "SELLER" | "ADMIN";
}

const ReviewCard = ({ review, role }: ReviewCardProps) => {
  // Rating color
  const ratingColor =
    review.rating >= 4
      ? "bg-green-500"
      : review.rating === 3
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-3 bg-white hover:shadow-md transition-shadow">
      {/* Top: Client Name + Rating */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-800">
          {review.clientId?.name || "Anonymous Client"}
        </p>
        <span className={`px-2 py-1 rounded text-white ${ratingColor}`}>
          {review.rating} ★
        </span>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-600">{review.comment}</p>

      {/* Divider */}
      <hr className="border-t border-gray-200" />

      {/* Role-specific info */}
      <div className="text-xs text-muted-foreground space-y-1">
        {/* Admin sees all */}
        {(role === "ADMIN" || role === "SELLER" || role === "CLIENT") && (
          <>
            {role !== "CLIENT" && (
              <p>
                <span className="font-medium">Client:</span>{" "}
                {review.clientId?.name}
              </p>
            )}

            {role !== "SELLER" && (
              <p>
                <span className="font-medium">Seller:</span>{" "}
                {review.sellerId?.name || "N/A"}
              </p>
            )}

            <p>
              <span className="font-medium">Service:</span>{" "}
              {review.serviceId?.title || "N/A"}
            </p>

            {(role === "ADMIN" || role === "SELLER") && (
              <>
                <p>
                  <span className="font-medium">Order ID:</span>{" "}
                  {review.orderId}
                </p>

                <p>
                  <span className="font-medium">Service ID:</span>{" "}
                  {review.serviceId?._id || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
