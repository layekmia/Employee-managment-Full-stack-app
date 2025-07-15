import { Card, CardContent } from "@/components/ui/card";
import {
  FaMoneyCheckAlt,
  FaClock,
  FaHourglassHalf,
  FaUserCheck,
} from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";
import useAuth from "@/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const fetchEmployeeOverview = async () => {
  const res = await axiosInstance.get("/employee/overview");
  return res.data;
};

export default function EmployeeOverview() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["employeeOverview"],
    queryFn: fetchEmployeeOverview,
  });

  const chartData = data?.totalPayment.map((payment) => ({
    month: `${payment.month} ${payment.year}`,
    salary: payment.salary,
  }));
  console.log(chartData);

  console.log(data);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800 font-secondary mb-4 dark:text-white">
        Hi, Welcome back, {user.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white ">
          <CardContent className="flex items-center justify-between p-4 font-secondary font-medium">
            <div>
              <p className="text-sm">Salary This Month</p>
              <h2 className="text-xl font-bold">৳{data?.salaryThisMonth}</h2>
            </div>
            <FaMoneyCheckAlt size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-secondary font-medium">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm">Total Work Hours</p>
              <h2 className="text-xl font-bold">{data?.totalWorkHours}hrs</h2>
            </div>
            <FaClock size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-secondary font-medium">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm">Pending Payment</p>
              <h2 className="text-xl font-bold">৳ {data?.pendingPayments}</h2>
            </div>
            <FaHourglassHalf size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm">Verified Status</p>
              <h2 className="text-xl font-bold">
                {!data?.isVerified ? (
                  <span className="flex items-center gap-1">
                    <img
                      className="w-10 h-10"
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/unverified-symbol-3d-icon-download-in-png-blend-fbx-gltf-file-formats--unprotected-off-approve-or-decline-pack-sign-symbols-icons-8196424.png"
                      alt=" icon"
                    />
                    Not Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <img
                      className="w-10 h-10"
                      src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
                      alt="verified"
                    />{" "}
                    Verified
                  </span>
                )}
              </h2>
            </div>
            <FaUserCheck size={32} />
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="w-full h-[350px] rounded-md shadow-sm p-4 bg-white dark:bg-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
          >
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
              name="Salary (TK)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow rounded-lg mt-5 p-4 overflow-x-auto">
        <h3 className="text-lg font-secondary  font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Recent Payments
        </h3>
        <Table className="w-full text-sm text-left">
          <TableHead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
            <TableHeadCell className="px-3 py-2">Month</TableHeadCell>
            <TableHeadCell className="px-3 py-2">Year</TableHeadCell>
            <TableHeadCell className="px-3 py-2">Amount</TableHeadCell>
            <TableHeadCell className="px-3 py-2">Status</TableHeadCell>
            <TableHeadCell className="px-3 py-2">Date</TableHeadCell>
          </TableHead>

          <TableBody>
            {data.recentPayments.map((item, idx) => (
              <TableRow
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <TableCell className="px-3 py-2 text-gray-800 dark:text-gray-200">
                  {item.month}
                </TableCell>
                <TableCell className="px-3 py-2 text-gray-800 dark:text-gray-200">
                  {item.year}
                </TableCell>
                <TableCell className="px-3 py-2 text-green-600 dark:text-green-400">
                  ৳{item.salary}
                </TableCell>
                <TableCell className="px-3 py-2 text-gray-700 dark:text-gray-300">
                  {item.paymentStatus}
                </TableCell>
                <TableCell className="px-3 py-2 text-gray-700 dark:text-gray-300">
                  {item.paymentDate?.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
