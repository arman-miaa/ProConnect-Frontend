/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Props {
  user: any;
  onUpdate: (id: string, payload: any) => void | Promise<void>;
}

const UserActionDropdown: React.FC<Props> = ({ user, onUpdate }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[150px] bg-white">
        {/* Verify / Unverify toggle */}
        {user.isVerified ? (
          <DropdownMenuItem
            onClick={() => onUpdate(user._id, { isVerified: false })}
          >
            Unverify User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onUpdate(user._id, { isVerified: true })}
          >
            Verify User
          </DropdownMenuItem>
        )}

        {/* Active / Inactive toggle */}
        {user.is_active !== "BLOCKED" && (
          <DropdownMenuItem
            onClick={() =>
              onUpdate(user._id, {
                is_active: user.is_active === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              })
            }
          >
            {user.is_active === "ACTIVE" ? "Set Inactive" : "Set Active"}
          </DropdownMenuItem>
        )}

        {/* Block / Unblock toggle */}
        <DropdownMenuItem
          onClick={() =>
            onUpdate(user._id, {
              is_active: user.is_active === "BLOCKED" ? "ACTIVE" : "BLOCKED",
            })
          }
        >
          {user.is_active === "BLOCKED" ? "Unblock User" : "Block User"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionDropdown;
