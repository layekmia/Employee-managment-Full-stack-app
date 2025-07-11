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

  // Access like this:
  const employee = data?.employee;
  const payments = data?.payments;

  console.log(employee, payments);

  if (isLoading) return <Spinner />;

  const chartData = payments.map((payment) => ({
    month: `${payment.month} ${payment.year}`,
    salary: payment.salary,
  }));

  return (
    <div className="p-6">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={employee.image || "https://via.placeholder.com/100"}
          alt={employee.name}
          className="w-24 h-24 rounded-full object-contain border-4 border-blue-600"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">{employee.designation || "Employee"}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Salary vs. Month</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#4361ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
