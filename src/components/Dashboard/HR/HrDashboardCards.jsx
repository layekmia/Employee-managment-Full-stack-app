import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaMoneyCheckAlt,
} from "react-icons/fa";

export default function HrDashboardCards() {
  const { data = {}, isLoading } = useQuery({
    queryKey: ["hrOverviewStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/hr/overview");
      return res.data;
    },
  });

  const stats = [
    {
      title: "Total Employees",
      value: data.totalEmployees,
      icon: <FaUsers className="text-white text-2xl" />,
      bg: "bg-gradient-to-tr from-indigo-500 to-indigo-700",
    },
    {
      title: "Verified Employees",
      value: data.verifiedEmployees,
      icon: <FaUserCheck className="text-white text-2xl" />,
      bg: "bg-gradient-to-tr from-emerald-500 to-emerald-700",
    },
    {
      title: "Pending Verifications",
      value: data.pendingVerifications,
      icon: <FaUserClock className="text-white text-2xl" />,
      bg: "bg-gradient-to-tr from-yellow-400 to-yellow-600",
    },
    {
      title: "Pending Salary Requests",
      value: data.pendingSalaryRequests,
      icon: <FaMoneyCheckAlt className="text-white text-2xl" />,
      bg: "bg-gradient-to-tr from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((item, idx) => (
        <Card
          key={idx}
          className={`${item.bg} text-white shadow-md rounded-xl transition-all hover:scale-[1.015]`}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <h4 className="text-sm font-medium opacity-90">{item.title}</h4>
              <p className="text-3xl font-bold mt-1">
                {isLoading ? "..." : item.value}
              </p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">{item.icon}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
