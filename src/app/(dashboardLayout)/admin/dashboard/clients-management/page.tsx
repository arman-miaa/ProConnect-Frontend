import UserTable from "@/components/modules/Admin/userManageMent/UserTable";
import { getAllUsers, adminUpdateUser } from "@/services/admin/usersManagement";

import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function AdminClientsManagementPage() {
  const users = await getAllUsers();
  const clients = users.filter((u) => u.role === "CLIENT");

  const currentUser = await getUserInfo();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Clients Management</h2>

      <UserTable
        users={clients}
        currentUserRole={currentUser?.role}
        onUpdate={adminUpdateUser}
      />
    </div>
  );
}
