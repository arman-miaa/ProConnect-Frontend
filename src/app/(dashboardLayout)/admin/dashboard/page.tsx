import { StatsCards } from "@/components/modules/Admin/StatsCards";
import { UserDistributionChart } from "@/components/modules/Admin/UserDistributionChart";
import { RevenueChart } from "@/components/modules/Admin/RevenueChart";
import { OrdersChart } from "@/components/modules/Admin/OrdersChart";
import { getAdminDashboard } from "@/services/admin/admin.service";

const AdminDashboardPage = async () => {
  const dashboardStats = await getAdminDashboard();
  if (!dashboardStats || !dashboardStats.data) return null;

  return (
    <div className="">
      <div className="">
        <main className="p-4 md:p-6 lg:p-8 space-y-6">
          {/* Stats Overview */}
          <StatsCards stats={dashboardStats.data} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart stats={dashboardStats.data} />
            </div>
            <div>
              <UserDistributionChart stats={dashboardStats.data} />
            </div>
          </div>

          {/* Orders Chart */}
          <OrdersChart monthlyOrders={dashboardStats.data.monthlyOrders} />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
