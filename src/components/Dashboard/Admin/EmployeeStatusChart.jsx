import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function EmployeeStatusLineChart({ months, activeCounts, firedCounts }) {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Active Employees",
        data: activeCounts,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10B981",
      },
      {
        label: "Fired Employees",
        data: firedCounts,
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#EF4444",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#6B7280" } },
      title: { display: true, text: "Employee Activity Trend", color: "#374151" },
    },
    scales: {
      x: {
        ticks: { color: "#9CA3AF" },
        title: { display: true, text: "Month", color: "#4B5563" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#9CA3AF" },
        title: { display: true, text: "Employees", color: "#4B5563" },
      },
    },
  };

  return (
    <Card className="mb-10">
      <CardContent className="h-[300px] dark:bg-gray-900 bg-white rounded">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
