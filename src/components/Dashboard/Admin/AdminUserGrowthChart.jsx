import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
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

export default function AdminUserGrowthChart({ months, userCounts }) {
  const data = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: userCounts,
        fill: true,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.3,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Users Joined" },
      },
      x: {
        title: { display: true, text: "Month" },
      },
    },
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Monthly User Growth
        </h3>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
