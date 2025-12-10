// src/components/ui/Pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPage: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({ page, totalPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </Button>

      <span className="px-4">
        Page {page} of {totalPage}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPage}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2"
      >
        Next <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
