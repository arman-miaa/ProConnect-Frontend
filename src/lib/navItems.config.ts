import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

// ----------------------------------------------------------------------
// ⭐ কমন নেভিগেশন আইটেম (সকল অথেন্টিকেটেড ইউজারের জন্য)
// ----------------------------------------------------------------------
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
        },
      ],
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
        href: "/seller/create-service",
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
      // ✅ মেসেজিং/চ্যাট অপশন যোগ করার জন্য স্থান রাখা হলো
      {
        title: "Messages",
        href: "/seller/messages",
        icon: "MessageCircle", // Message Icon
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
        title: "My Projects",
        href: "/client/my-projects",
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
      // ✅ মেসেজিং/চ্যাট অপশন যোগ করার জন্য স্থান রাখা হলো
      {
        title: "Messages",
        href: "/client/messages",
        icon: "MessageCircle", // Message Icon
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
// 👑 অ্যাডমিন নেভিগেশন আইটেম (SUPER_ADMIN এর জন্য কমন)
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
// 🏠 সবার শেষে যুক্ত করার জন্য নতুন Home Section
// ----------------------------------------------------------------------
// Note: title: ' ' ব্যবহার করা হয়েছে যেন শুধু বর্ডারটি দেখা যায়
export const homePageNavSection: NavSection = {
  title: " ",
  items: [
    {
      title: "Home Page",
      href: "/", // ধরে নেওয়া হলো মূল হোম পেজের রুট '/'
      icon: "Home", // আপনার আইকন লাইব্রেরি থেকে সঠিক আইকন দিন
      roles: ["SUPER_ADMIN", "ADMIN", "SELLER", "CLIENT"],
      // ✅ এখানে border/separator যোগ করার জন্য কোনো কাস্টম প্রপার্টি (যেমন: isSeparator)
      // ব্যবহার করা যেতে পারে, যদি আপনার UI কম্পোনেন্ট এটি সমর্থন করে।
      // তবে, যেহেতু আপনি একটি নতুন NavSection ব্যবহার করছেন, UI কম্পোনেন্টটি
      // দুটি সেকশনের মাঝে স্বয়ংক্রিয়ভাবে একটি স্পেস বা বর্ডার দেখাতে পারে।
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

  // ✅ সমস্ত আইটেম এবং সবার শেষে নতুন Home Page সেকশন যোগ করা হলো
  return [...commonNavItems, ...roleSpecificItems, homePageNavSection];
};
