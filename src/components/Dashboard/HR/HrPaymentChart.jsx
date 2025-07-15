// import { Line } from "react-chartjs-2";
// import { Card, CardContent } from "@/components/ui/card";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register only what's needed for line charts
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function HrPaymentLineChart({ months, paidData, pendingData }) {
//   const data = {
//     labels: months,
//     datasets: [
//       {
//         label: "Paid",
//         data: paidData,
//         borderColor: "#4CAF50",
//         backgroundColor: "#4CAF50",
//         tension: 0.4,
//         fill: false,
//       },
//       {
//         label: "Pending",
//         data: pendingData,
//         borderColor: "#F59E0B",
//         backgroundColor: "#F59E0B",
//         tension: 0.4,
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//   };

//   return (
//         <Card className="mt-6">
//       <CardContent>
//         <h3 className="text-lg font-semibold mb-3">Monthly Payment Status</h3>
//           <Line data={data} options={options}/>
//       </CardContent>
//     </Card>

//   );
// }

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

// Register only required components (avoids bloat and bugs)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HrPaymentLineChart({ months, paidData, pendingData }) {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Paid",
        data: paidData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        fill: true,
        tension: 0.4, // for smooth lines
      },
      {
        label: "Pending",
        data: pendingData,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow custom height
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          color: "#6B7280",
          font: { size: 12 },
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <Card className="mt-6">
      <CardContent>
        <h3 className="text-lg font-semibold mb-3 p-2">
          Monthly Payment Status
        </h3>
        <div className="h-64">
          {" "}
          {/* control the chart height here */}
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
