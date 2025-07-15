import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PayrollLineChart() {
  const { data = [] } = useQuery({
    queryKey: ["payrollRequestStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/hr/payroll-requests-stats");
      return res.data;
    },
  });

  const months = data.map((item) => item.month);
  const requestCounts = data.map((item) => item.totalRequests);

  <PayrollLineChart months={months} requestCounts={requestCounts} />;

  const dataChart = {
    labels: months,
    datasets: [
      {
        label: "Payroll Requests",
        data: requestCounts,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <Card className="mt-6 p-5">
      <CardContent className="h-[350px]">
        <h3 className="text-lg font-semibold ">Payroll Requests Trend</h3>
        <Line data={dataChart} options={options} />
      </CardContent>
    </Card>
  );
}
