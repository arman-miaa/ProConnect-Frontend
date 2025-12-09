import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

// ----------------------------------------------------------------------
// ⭐ কমন নেভিগেশন আইটেম (সকল অথেন্টিকেটেড ইউজারের জন্য)
// ----------------------------------------------------------------------
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  const items: NavSection["items"] = [];

  // শুধুমাত্র অ্যাডমিনদের জন্য Dashboard দেখাবে
  if (role === "SUPER_ADMIN" || role === "ADMIN") {
    items.push({
      title: "Dashboard",
      href: defaultDashboard,
      icon: "LayoutDashboard",
      roles: ["SUPER_ADMIN", "ADMIN"],
    });
  }

  // সকলের জন্য My Profile
  items.push(
    {
      title: "My Profile",
      href: `/my-profile`,
      icon: "User",
      roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
    },
    {
      title: "Change Password",
      href: "/change-password",
      icon: "KeyRound",
      roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
    }
  );

  return [
    {
      items,
    },
  
  ];
};

// ----------------------------------------------------------------------
// 💼 সেলার নেভিগেশন আইটেম
// ----------------------------------------------------------------------
export const sellerNavItems: NavSection[] = [
  {
    items: [
      {
        title: "My Services",
        href: "/seller/dashboard/services",
        icon: "ListOrdered",
        roles: ["SELLER"],
      },
      {
        title: "All Orders",
        href: "/all-orders",
        icon: "ShoppingCart",
        roles: ["SELLER"],
      },
      {
        title: "Payment History",
        href: "/seller/dashboard/payment-history",
        icon: "Receipt",
        roles: ["SELLER"],
      },
      {
        title: "Earnings & Withdraw",
        href: "/seller/dashboard/earnings",
        icon: "DollarSign",
        roles: ["SELLER"],
      },
      {
        title: "Client Reviews",
        href: "/seller/dashboard/reviews",
        icon: "Star",
        roles: ["SELLER"],
      },
    ],
  },
];

// ----------------------------------------------------------------------
// 👥 ক্লায়েন্ট নেভিগেশন আইটেম
// ----------------------------------------------------------------------
export const clientNavItems: NavSection[] = [
  {
    items: [
      {
        title: "Find Services",
        href: "/services",
        icon: "Search",
        roles: ["CLIENT"],
      },
      {
        title: "My Orders",
        href: "/all-orders",
        icon: "CalendarCheck",
        roles: ["CLIENT"],
      },
      {
        title: "My Transactions",
        href: "/client/dashboard/transactions",
        icon: "CreditCard",
        roles: ["CLIENT"],
      },
      {
        title: "My Reviews",
        href: "/client/dashboard/reviews",
        icon: "MessageSquare",
        roles: ["CLIENT"],
      },
    ],
  },
];

// ----------------------------------------------------------------------
// 👑 অ্যাডমিন নেভিগেশন আইটেম
// ----------------------------------------------------------------------
export const adminNavItems: NavSection[] = [
  {
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Sellers Management",
        href: "/admin/dashboard/sellers-management",
        icon: "Users",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Clients Management",
        href: "/admin/dashboard/clients-management",
        icon: "UserSquare",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "All Orders",
        href: "/all-orders",
        icon: "ShoppingCart",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "All Reviews",
        href: "/admin/dashboard/reviews",
        icon: "Star",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Support Messages",
        href: "/admin/dashboard/messages",
        icon: "MessageCircle",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      // {
      //   title: "Reports & Disputes",
      //   href: "/admin/dashboard/reports-management",
      //   icon: "AlertTriangle",
      //   roles: ["SUPER_ADMIN", "ADMIN"],
      // },
      {
        title: "Transactions",
        href: "/admin/dashboard/transactions",
        icon: "DollarSign",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];

// ----------------------------------------------------------------------
// 🏠 Home Section
// ----------------------------------------------------------------------
export const homePageNavSection: NavSection = {

  items: [
    {
      title: "Home Page",
      href: "/",
      icon: "Home",
      roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
    },
  ],
};

// ----------------------------------------------------------------------
// 🔄 রোল অনুযায়ী নেভিগেশন আইটেম গেটার
// ----------------------------------------------------------------------
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  let roleSpecificItems: NavSection[] = [];
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      roleSpecificItems = adminNavItems;
      break;
    case "SELLER":
      roleSpecificItems = sellerNavItems;
      break;
    case "CLIENT":
      roleSpecificItems = clientNavItems;
      break;
    default:
      roleSpecificItems = [];
      break;
  }

  return [...commonNavItems, ...roleSpecificItems, homePageNavSection];
};
