/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Column {
  header: string;
  accessorKey: string;
}

interface TransactionCardProps {
  row: any;
  columns: Column[];
  renderValue: (row: any, column: Column) => React.ReactNode;
}

const TransactionCard = ({
  row,
  columns,
  renderValue,
}: TransactionCardProps) => {
  // প্রথম কলামকে primary হিসেবে ধরছি
  const primaryColumn = columns[0];
  const primaryValue = row[primaryColumn.accessorKey];

  // স্ট্যাটাস
  const statusColumn = columns.find((col) => col.accessorKey === "status");
  const statusElement = statusColumn ? renderValue(row, statusColumn) : null;

  // অ্যামাউন্ট
  const amountColumn = columns.find(
    (col) => col.accessorKey === "amount" || col.accessorKey === "netAmount"
  );
  const amountValue = amountColumn ? row[amountColumn.accessorKey] : 0;
  const amountElement = amountColumn ? renderValue(row, amountColumn) : null;

  // তারিখ
  const dateColumn = columns.find((col) => col.accessorKey === "createdAt");
  const dateElement = dateColumn ? renderValue(row, dateColumn) : null;

  // Amount color check
  const isNegativeAmount = (value: any) =>
    typeof value === "number" && value < 0;

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-md bg-white space-y-3">
      {/* 💰 Header: Amount & Status */}
      <div className="flex justify-between items-center border-b pb-3">
        <div
          className={cn(
            "text-lg font-bold",
            isNegativeAmount(amountValue) ? "text-red-600" : "text-green-600"
          )}
        >
          {amountElement}
        </div>
        {statusElement}
      </div>

      {/* 🆔 Main ID / Type */}
      <div className="text-sm font-medium text-gray-700 truncate">
        <span className="text-muted-foreground mr-2">
          {primaryColumn.header}:
        </span>
        {primaryValue}
      </div>

      {/* 📅 Footer: Date & Other details */}
      <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
        {/* তারিখ */}
        <p>{dateElement}</p>

        {/* অন্যান্য ডেটা */}
        <div className="text-right space-y-1">
          {columns
            .filter(
              (col) =>
                col.accessorKey !== primaryColumn.accessorKey &&
                col.accessorKey !== "status" &&
                col.accessorKey !== amountColumn?.accessorKey &&
                col.accessorKey !== "createdAt"
            )
            .map((col) => (
              <p key={col.accessorKey}>
                <span className="font-semibold mr-1">{col.header}:</span>
                {row[col.accessorKey]}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
