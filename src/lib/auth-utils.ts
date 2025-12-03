// src/constants/routes.ts

// ⭐ 1. User Role Type
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "CLIENT" | "SELLER";

// ⭐ 2. RouteConfig Type
export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

// ⭐ 3. Auth Routes (Public Routes)
export const authRoutes = ["/login", "/register", "/forgot-password"];

// ⭐ 4. Common Protected Routes (All authenticated users can access)
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
  patterns: [],
};

// ⭐ 5. ADMIN + SUPER_ADMIN Routes
export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/], // Routes starting with /admin/*
  exact: [],
};

// ⭐ 6. SELLER Routes
export const sellerProtectedRoutes: RouteConfig = {
  patterns: [/^\/seller/], // Routes starting with /seller/*
  exact: [],
};

// ⭐ 7. CLIENT Routes
export const clientProtectedRoutes: RouteConfig = {
  patterns: [/^\/client/], // Routes starting with /dashboard/*
  exact: [],
};

// ⭐ 8. Auth Route Checker
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

// ⭐ 9. Pattern + Exact Matcher Function
export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

// ⭐ 10. Get Route Owner (Role)
export const getRouteOwner = (
  pathname: string
): "SUPER_ADMIN" | "ADMIN" | "SELLER" | "CLIENT" | "COMMON" | null => {
  // both SUPER_ADMIN & ADMIN share same route group
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";

  if (isRouteMatches(pathname, sellerProtectedRoutes)) return "SELLER";

  if (isRouteMatches(pathname, clientProtectedRoutes)) return "CLIENT";

  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";

  return null;
};

// ⭐ 11. Get Default Dashboard Route (Fixed Logic)
export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "SUPER_ADMIN" || role === "ADMIN") {
    return "/admin/dashboard";
  }

  if (role === "SELLER") {
    return "/my-profile";
  }

  if (role === "CLIENT") {
    return "/my-profile";
  }

  return "/";
};

// ⭐ 12. Redirect Validation Function (Fixed Logic)
export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  // Unprotected routes and common routes -> always allowed
  if (routeOwner === null || routeOwner === "COMMON") return true;

  // SUPER_ADMIN + ADMIN can access admin routes
  if (routeOwner === "ADMIN" && (role === "ADMIN" || role === "SUPER_ADMIN")) {
    return true;
  }

  // Other role-specific matched access
  if (routeOwner === role) return true;

  return false;
};
