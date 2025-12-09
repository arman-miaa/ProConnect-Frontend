"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
                {userInfo.profilePicture ? (
                      <Image
                        width={200}
                        height={200}
                        src={userInfo.profilePicture}
                        alt={userInfo.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-primary">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </span>
                    )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-white">
        {/* ---------------- User Info ---------------- */}
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium truncate">{userInfo.name}</p>
            {userInfo.email && (
              <p className="text-xs text-muted-foreground truncate">
                {userInfo.email}
              </p>
            )}
            <p className="text-xs text-primary capitalize">{userInfo.role}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* ---------------- Profile & Password ---------------- */}
        <DropdownMenuItem asChild>
          <Link href="/my-profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/change-password" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Change Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ---------------- Logout Button ---------------- */}
        <Button
          onClick={handleLogout}
          className="w-full text-left bg-destructive text-white hover:bg-destructive/90"
        >
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
