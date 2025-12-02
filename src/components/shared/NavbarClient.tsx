/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

interface NavbarClientProps {
  navItems: Array<{ label: string; href: string }>;
  isAuthenticated: boolean ;
  userInfo: any;
  
}

export default function NavbarClient({
  navItems,
  isAuthenticated,
  userInfo,
  
}: NavbarClientProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false); // md+ হলে sidebar auto-close
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-15 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">ProConnect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
          {navItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <UserDropdown userInfo={userInfo} />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)} // Mobile এ click করলে close
                      className={`text-lg transition-colors ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Mobile Auth */}
                <div className="border-t pt-4">
                  {isAuthenticated ? (
                    <div className="py-2">
                      <div>
                        <span className="md:hidden flex flex-col gap-2 ">
                          <Link href="/my-profile">
                            <Button className="w-full">My Profile</Button>
                          </Link>
                          <LogoutButton />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
