/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // ⚡ Client Component

import React, { useEffect, useState } from "react";
import {
  getSellerFinancialSummary,
  requestWithdrawalAPI,
} from "@/services/transaction/transaction.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Wallet, ArrowDownCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Summary {
  totalEarned: number;
  availableBalance: number;
  totalWithdrawn: number;
}

export default function SellerEarningsPage() {
  const [summary, setSummary] = useState<Summary>({
    totalEarned: 0,
    availableBalance: 0,
    totalWithdrawn: 0,
  });
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 🎯 Fetch financial summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSellerFinancialSummary();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching financial summary:", error);
        toast.error("Failed to fetch financial summary.");
      }
    };
    fetchSummary();
  }, []);

  // 💰 Withdrawal request
  const requestWithdrawal = async () => {
    if (withdrawAmount <= 0 || withdrawAmount > summary.availableBalance) {
      toast.error("Invalid withdrawal amount.");
      return;
    }

    try {
      setLoading(true);
      await requestWithdrawalAPI(withdrawAmount);

      toast.success("Withdrawal requested successfully!");

      // Update UI after withdrawal
      setSummary((prev) => ({
        ...prev,
        availableBalance: prev.availableBalance - withdrawAmount,
        totalWithdrawn: prev.totalWithdrawn + withdrawAmount,
      }));

      setWithdrawAmount(0); // reset input
    } catch (error: any) {
      toast.error(error.message || "Withdrawal failed.");
    } finally {
      setLoading(false);
    }
  };

  const { totalEarned, availableBalance, totalWithdrawn } = summary;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">💰 Earnings Overview</h2>

      {/* Financial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Available Balance
            </CardTitle>
            <Wallet className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">
              ${availableBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready for withdrawal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawn
            </CardTitle>
            <ArrowDownCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              ${totalWithdrawn.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Amount paid out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Card */}
      <Card>
        <CardHeader>
          <CardTitle>Withdraw Funds</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Available balance:{" "}
              <span className="font-bold text-green-600">
                ${availableBalance.toFixed(2)}
              </span>
            </p>
            <input
              type="number"
              min={0}
              max={availableBalance}
              value={withdrawAmount === 0 ? "" : withdrawAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setWithdrawAmount(0);
                  return;
                }
                const num = Number(val);
                if (!isNaN(num) && num >= 0) setWithdrawAmount(num);
              }}
              className="border rounded px-2 py-1 w-24"
              placeholder="Amount"
            />
          </div>
          <Button
            onClick={requestWithdrawal}
            disabled={
              withdrawAmount <= 0 ||
              withdrawAmount > availableBalance ||
              loading
            }
            className="w-full md:w-auto"
          >
            {loading ? "Processing..." : "Request Payout"}
          </Button>
        </CardContent>
      </Card>

      {/* Payment History Link */}
      <div className="text-center pt-4">
        <Link
          href="/seller/dashboard/payment-history"
          className="text-primary hover:underline font-medium"
        >
          View Full Payment History →
        </Link>
      </div>
    </div>
  );
}
