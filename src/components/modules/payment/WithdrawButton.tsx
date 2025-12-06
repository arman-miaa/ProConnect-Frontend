// components/WithdrawButton.tsx
"use client";

import { Button } from "@/components/ui/button";

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function WithdrawButton({ disabled, onClick }: Props) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      Request Payout
    </Button>
  );
}
