"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card shadow-lg">
      {/* ---------------- Top Logo ---------------- */}
      <div className="flex h-16 items-center justify-center border-b px-6 shrink-0">
        <Link href={dashboardHome} className="text-xl font-bold text-primary">
          ProConnect
        </Link>
      </div>

      {/* ---------------- Scrollable Area (User Info + Navigation) ---------------- */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 space-y-6">
          {/* ---------------- User Info ---------------- */}
          <div className="flex flex-col items-center space-y-2  ">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-primary/10">
              {userInfo.profilePicture ? (
                <Image
                  width={200}
                  height={200}
                  src={userInfo.profilePicture}
                  alt={userInfo.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {userInfo.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold text-base truncate">
                {userInfo.name}
              </p>
              {userInfo.email && (
                <p className="text-xs text-muted-foreground truncate">
                  {userInfo.email}
                </p>
              )}
              <p className="text-xs text-primary font-medium capitalize">
                {userInfo.role}
              </p>
            </div>
          </div>

          {/* ---------------- Navigation ---------------- */}
          <nav className="space-y-6 border-t pt-2 -mt-3 ">
            {navItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                {section.title && (
                  <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = getIconComponent(item.icon);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                          isActive
                            ? "bg-primary text-primary-foreground shadow"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={isActive ? "secondary" : "default"}
                            className="ml-auto"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
                {sectionIdx < navItems.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>

      {/* ---------------- Logout Button at Bottom ---------------- */}
      <div className="w-full p-4  shrink-0">
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
