/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface ReviewCardProps {
  review: any;
  role: "CLIENT" | "SELLER" | "ADMIN";
}

const ReviewCard = ({ review, role }: ReviewCardProps) => {
  if (!review) return null;

  const getRatingStyles = (rating: number) => {
    if (rating >= 4.5) return "from-emerald-500 to-green-500";
    if (rating >= 4) return "from-green-500 to-lime-500";
    if (rating >= 3) return "from-yellow-500 to-orange-400";
    return "from-orange-500 to-red-500";
  };

  const ratingGradient = getRatingStyles(review.rating || 0);

  return (
    <div className="group relative rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
      {/* Gradient top accent */}
      <div
        className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r ${ratingGradient}`}
      />

      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shrink-0">
              <span className="text-white font-semibold text-sm">
                {(review.clientId?.name || "A")[0].toUpperCase()}
              </span>
            </div>

            {/* Name & date */}
            <div className="min-w-0">
              <p className="font-semibold truncate">
                {review.clientId?.name || "Anonymous Client"}
              </p>
              <p className="text-xs text-muted-foreground">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div
            className={`px-3 py-1.5 rounded-full bg-linear-to-r ${ratingGradient} shadow-md`}
          >
            <span className="text-white font-bold text-sm">
              {review.rating || 0} ★
            </span>
          </div>
        </div>

        {/* Comment */}
        <p className="text-sm leading-relaxed rounded-xl bg-muted p-4 border">
          {review.comment || "No comment provided"}
        </p>

        {/* Meta info */}
        <div className="pt-4 border-t space-y-3 text-sm">
          {role !== "CLIENT" && (
            <InfoRow label="Client" value={review.clientId?.name} />
          )}

          {role !== "SELLER" && (
            <InfoRow label="Seller" value={review.sellerId?.name || "N/A"} />
          )}

          <InfoRow label="Service" value={review.serviceId?.title || "N/A"} />

          {(role === "ADMIN" || role === "SELLER") && (
            <div className="pt-3 mt-3 border-t space-y-2 text-xs">
              <CodeRow label="Order ID" value={review.orderId} />
              <CodeRow
                label="Service ID"
                value={review.serviceId?._id || "N/A"}
              />
              <InfoRow
                label="Created"
                value={new Date(review.createdAt).toLocaleString()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Helpers ---------- */

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-2">
    <span className="text-muted-foreground font-medium min-w-[70px]">
      {label}:
    </span>
    <span className="truncate">{value}</span>
  </div>
);

const CodeRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-2">
    <span className="text-muted-foreground font-medium min-w-20">
      {label}:
    </span>
    <code className="rounded bg-muted px-2 py-0.5 font-mono">{value}</code>
  </div>
);

export default ReviewCard;
