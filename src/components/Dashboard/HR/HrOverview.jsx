import axiosInstance from "@/utils/axiosInstance";
import HrDashboardCards from "./HrDashboardCards";
import { useQuery } from "@tanstack/react-query";
import HrPaymentBarChart from "./HrPaymentChart";

export default function HrOverview() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["hrPaymentSummary"],
    queryFn: async () => {
      const res = await axiosInstance.get("/hr/payment-summary");
      return res.data;
    },
  });

  const months = [...new Set(data.map((item) => item._id.month))];

  const paidData = months.map((month) => {
    const found = data.find(
      (d) => d._id.month === month && d._id.status === "Paid"
    );
    return found ? found.count : 0;
  });

  const pendingData = months.map((month) => {
    const found = data.find(
      (d) => d._id.month === month && d._id.status === "Pending"
    );
    return found ? found.count : 0;
  });

  return (
    <div>
      <HrDashboardCards />
      <HrPaymentBarChart
        months={months}
        paidData={paidData}
        pendingData={pendingData}
      />
    </div>
  );
}
