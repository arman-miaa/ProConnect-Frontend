import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import NavbarClient from "./NavbarClient";

export const dynamic = "force-dynamic";

const PublicNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo | null;

  // console.log(userInfo);
  

  const isAuthenticated = !!userInfo?._id


  const navItems = [
    { href: "/services", label: "Services" },
    { href: "/how-it-work", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <NavbarClient
      navItems={navItems}
      isAuthenticated={isAuthenticated}
      userInfo={userInfo}
    />
  );
};

export default PublicNavbar;
