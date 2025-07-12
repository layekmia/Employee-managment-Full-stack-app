
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  // LinearGradient,
  // Stop,
} from "recharts";
import Spinner from "../Spinner";

export default function SlugDetails() {
  const { id: employeeId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["employeeDetails", employeeId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/employee-details/${employeeId}`);
      return res.data;
    },
  });

  const employee = data?.employee;
  const payments = data?.payments;

  if (isLoading) return <Spinner />;

  const chartData = payments.map((payment) => ({
    month: `${payment.month} ${payment.year}`,
    salary: payment.salary,
  }));

  return (
    <div >
      {/* Employee Info */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={employee.image || "https://via.placeholder.com/100"}
          alt={employee.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">{employee.designation || "Employee"}</p>
        </div>
      </div>

      {/* Chart Title */}
      <h3 className="text-xl font-semibold mb-4 text-blue-700">
        Monthly Salary Overview
      </h3>

      {/* Chart */}
      <div className="w-full h-[350px] rounded-xl shadow-md p-4 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            {/* Gradient fill definition */}
            <defs>
              <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "14px",
              }}
              labelStyle={{ fontWeight: "bold", color: "#1e3a8a" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="salary"
              fill="url(#colorSalary)"
              radius={[8, 8, 0, 0]}
              barSize={40}
              name="Salary (USD)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
