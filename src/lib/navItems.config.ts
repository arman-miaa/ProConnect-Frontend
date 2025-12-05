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
  items.push({
    title: "My Profile",
    href: `/my-profile`,
    icon: "User",
    roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
  });

  return [
    {
      items,
    },
    {
      title: "Settings & Security",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "KeyRound",
          roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
        },
      ],
    },
  ];
};

// ----------------------------------------------------------------------
// 💼 সেলার নেভিগেশন আইটেম
// ----------------------------------------------------------------------
export const sellerNavItems: NavSection[] = [
  {
    title: "Service Management",
    items: [
      {
        title: "My Services",
        href: "/seller/services-management",
        icon: "ListOrdered",
        roles: ["SELLER"],
      },
      {
        title: "Create Service",
        href: "/seller/dashboard/create-service",
        icon: "SquarePen",
        roles: ["SELLER"],
      },
    ],
  },
  {
    title: "Finance & Projects",
    items: [
      {
        title: "My Projects",
        href: "/seller/project-management",
        icon: "Trello",
        badge: "5",
        roles: ["SELLER"],
      },
      {
        title: "Payment History",
        href: "/seller/payment-history",
        icon: "Receipt",
        roles: ["SELLER"],
      },
      {
        title: "Earnings & Withdraw",
        href: "/seller/earnings",
        icon: "DollarSign",
        roles: ["SELLER"],
      },
    ],
  },
  {
    title: "Communication & Feedback",
    items: [
      {
        title: "Messages",
        href: "/seller/messages",
        icon: "MessageCircle",
        roles: ["SELLER"],
      },
      {
        title: "My Reviews",
        href: "/seller/reviews",
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
    title: "Service Discovery",
    items: [
      {
        title: "Find Services",
        href: "/services",
        icon: "Search",
        roles: ["CLIENT"],
      },
      {
        title: "Favorites",
        href: "/client/favourites",
        icon: "Heart",
        roles: ["CLIENT"],
      },
    ],
  },
  {
    title: "My Activities",
    items: [
      {
        title: "My Orders",
        href: "/client/dashboard/my-orders",
        icon: "CalendarCheck",
        roles: ["CLIENT"],
      },
      {
        title: "My Transactions",
        href: "/client/transactions",
        icon: "CreditCard",
        roles: ["CLIENT"],
      },
    ],
  },
  {
    title: "Feedback & Alerts",
    items: [
      {
        title: "Messages",
        href: "/client/messages",
        icon: "MessageCircle",
        roles: ["CLIENT"],
      },
      {
        title: "Reviews & Ratings",
        href: "/client/reviews",
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
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/admins-management",
        icon: "Shield",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Sellers Management",
        href: "/admin/sellers-management",
        icon: "Users",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Clients Management",
        href: "/admin/clients-management",
        icon: "UserSquare",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    title: "Marketplace Management",
    items: [
      {
        title: "Service Verification",
        href: "/admin/service-verification",
        icon: "CheckCircle",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Reports & Disputes",
        href: "/admin/reports-management",
        icon: "AlertTriangle",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Transactions",
        href: "/admin/transactions",
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
  title: " ",
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
