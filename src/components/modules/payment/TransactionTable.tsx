/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TransactionCard from "./TransactionCard";

interface Column {
  header: string;
  accessorKey: string;
}

interface TransactionTableProps {
  data: any[];
  columns: Column[];
}

// স্ট্যাটাস অনুযায়ী Badge রঙ
const getStatusVariant = (status: string) => {
  switch (status) {
    case "SUCCESS":
    case "COMPLETED":
    case "EARNED":
      return "default";
    case "PENDING":
    case "PROCESSING":
      return "secondary";
    case "FAILED":
    case "REVERSED":
      return "destructive";
    default:
      return "outline";
  }
};


// ডেটা রেন্ডার ফাংশন
const renderValue = (row: any, column: Column) => {
  const value = row[column.accessorKey];

  // STATUS Badge
  if (column.accessorKey === "status") {
    return <Badge variant={getStatusVariant(value)}>{value}</Badge>;
  }

  // AMOUNT / NET AMOUNT
  if (column.accessorKey === "amount" || column.accessorKey === "netAmount") {
    return (
      <span className="font-semibold text-gray-800">
        ${Number(value).toFixed(2)}
      </span>
    );
  }

  // CREATED DATE
  if (column.accessorKey === "createdAt") {
    return new Date(value).toLocaleDateString();
  }

  // ⭐ ORDER ID fallback logic
  if (column.accessorKey === "relatedOrder") {
    if (value) return value; // যদি Order ID থাকে

    // যদি withdrawal transaction হয়
    if (row.type === "WITHDRAWAL") return "Withdrawal Payment";

    // অন্য যেকোনো ক্ষেত্রে
    return "N/A";
  }

  return value;
};


export default function TransactionTable({
  data,
  columns,
}: TransactionTableProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        No transactions found.
      </p>
    );
  }

  return (
    <>
      {/* বড় স্ক্রিনের জন্য Table */}
      <div className="hidden md:block rounded-xl border overflow-hidden shadow-lg">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessorKey}
                  className="font-bold text-gray-600 uppercase tracking-wider"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-primary/5 transition-colors"
              >
                {columns.map((column) => (
                  <TableCell key={column.accessorKey} className="py-3">
                    {renderValue(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ছোট স্ক্রিনের জন্য Card view */}
      <div className="md:hidden space-y-4">
        {data.map((row, index) => (
          <TransactionCard
            key={index}
            row={row}
            columns={columns}
            renderValue={renderValue}
          />
        ))}
      </div>
    </>
  );
}
