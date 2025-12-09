import { PublicFooter } from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <PublicNavbar />

        {/* Main content */}
        <main className="grow">{children}</main>

        <PublicFooter />
      </div>
    </>
  );
};

export default CommonLayout;
