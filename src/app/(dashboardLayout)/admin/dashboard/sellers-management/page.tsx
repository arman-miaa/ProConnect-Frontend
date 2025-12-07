import UserTable from "@/components/modules/Admin/userManageMent/UserTable";
import { getAllUsers, adminUpdateUser } from "@/services/admin/usersManagement";

import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function SellersManagementPage() {
  const users = await getAllUsers();
  const sellers = users.filter((u) => u.role === "SELLER");

  const currentUser = await getUserInfo();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sellers Management</h2>

      <UserTable
        users={sellers}
        currentUserRole={currentUser?.role}
        onUpdate={adminUpdateUser}
      />
    </div>
  );
}
