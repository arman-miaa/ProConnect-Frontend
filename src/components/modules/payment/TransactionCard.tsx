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
  const primaryColumn = columns[0];
  const primaryValue = row[primaryColumn.accessorKey];

  const statusColumn = columns.find((col) => col.accessorKey === "status");
  const statusElement = statusColumn ? renderValue(row, statusColumn) : null;

  const amountColumn = columns.find(
    (col) => col.accessorKey === "amount" || col.accessorKey === "netAmount"
  );
  const amountValue = amountColumn ? row[amountColumn.accessorKey] : 0;
  const amountElement = amountColumn ? renderValue(row, amountColumn) : null;

  const dateColumn = columns.find((col) => col.accessorKey === "createdAt");
  const dateElement = dateColumn ? renderValue(row, dateColumn) : null;

  const isNegativeAmount = (value: any) =>
    typeof value === "number" && value < 0;

  return (
    <div className="group relative rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Top accent */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 rounded-t-2xl",
          isNegativeAmount(amountValue)
            ? "bg-gradient-to-r from-red-500 to-orange-500"
            : "bg-gradient-to-r from-emerald-500 to-green-500"
        )}
      />

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div
            className={cn(
              "text-xl font-bold tracking-tight",
              isNegativeAmount(amountValue)
                ? "text-red-500"
                : "text-emerald-500"
            )}
          >
            {amountElement}
          </div>

          {statusElement && (
            <div className="text-xs font-medium">{statusElement}</div>
          )}
        </div>

        {/* Primary Info */}
        <div className="text-sm truncate">
          <span className="text-muted-foreground mr-1">
            {primaryColumn.header}:
          </span>
          <span className="font-medium">{primaryValue}</span>
        </div>

        {/* Extra Details */}
        <div className="pt-3 border-t grid grid-cols-2 gap-3 text-xs">
          {/* Date */}
          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="font-medium">{dateElement}</p>
          </div>

          {/* Other columns */}
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
                  <span className="text-muted-foreground mr-1">
                    {col.header}:
                  </span>
                  <span className="font-medium break-all">
                    {row[col.accessorKey]}
                  </span>
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
