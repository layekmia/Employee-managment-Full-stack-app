import { Card, CardContent } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminRoleChart({ admins, hrs, employees }) {
  const data = {
    labels: ["Admins", "HRs", "Employees"],
    datasets: [
      {
        label: "User Roles",
        data: [admins, hrs, employees],
        backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%", // to make donut shape
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6 max-w-[500px] mx-auto">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Role Distribution
        </h3>
        <Doughnut data={data} options={options} />
      </CardContent>
    </Card>
  );
}
