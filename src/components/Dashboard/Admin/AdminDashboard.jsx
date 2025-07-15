import axiosInstance from "@/utils/axiosInstance";
import AdminStatsCards from "./AdminStatsCard";
import { useQuery } from "@tanstack/react-query";
import AdminRoleChart from "./AdminCahrt";
import AdminUserGrowthChart from "./AdminUserGrowthChart";
import Spinner from "../Spinner";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/overview");
      return res.data;
    },
  });

  const { data: userGrowth = [] } = useQuery({
    queryKey: ["userGrowth"],
    queryFn: async () => {
      const year = new Date().getFullYear();
      const res = await axiosInstance.get(`/admin/user-growth?year=${year}`);
      return res.data;
    },
  });

  const months = userGrowth.map((item) => item.month);
  const userCounts = userGrowth.map((item) => item.count);

  if (isLoading) return <Spinner />;
  return (
    <div>
      <AdminStatsCards stats={stats} isLoading={isLoading} />
      <AdminUserGrowthChart months={months} userCounts={userCounts} />
      <AdminRoleChart
        admins={stats?.admins}
        hrs={stats?.hrs}
        employees={stats?.employees}
      />
    </div>
  );
}
