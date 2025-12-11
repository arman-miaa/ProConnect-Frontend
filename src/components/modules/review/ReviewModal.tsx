/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { submitReview } from "@/services/review/review.service";

export default function ReviewModal({ orderId }: any) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (rating === 0) return toast.error("Please select a rating");
      setLoading(true);

      await submitReview({ orderId, rating, comment });

      toast.success("Review submitted successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* REVIEW Button */}
      <Button className="mt-3" onClick={() => setOpen(true)}>
        Write a Review ⭐
      </Button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>

          {/* Rating Stars */}
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl ${
                  rating >= star ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Comment Input */}
          <Textarea
            placeholder="Write your review..."
            className="mt-4"
            value={comment}
           
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="mt-4" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
