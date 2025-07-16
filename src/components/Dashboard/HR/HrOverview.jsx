import axiosInstance from "@/utils/axiosInstance";
import HrDashboardCards from "./HrDashboardCards";
import { useQuery } from "@tanstack/react-query";
import HrPaymentBarChart from "./HrPaymentChart";
import PayrollLineChart from "./PayrollRequestChart";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "../Spinner";
import SmallSpinner from "../SmallSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

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

  const { data: latestPayments = [], isLoading: latestPaymentLoading } =
    useQuery({
      queryKey: ["latestPayments"],
      queryFn: async () => {
        const res = await axiosInstance.get("/hr/latest-payments");
        return res.data;
      },
    });

  if (isLoading) return <Spinner />;

  return (
    <div>
      <HrDashboardCards />
      <HrPaymentBarChart
        months={months}
        paidData={paidData}
        pendingData={pendingData}
      />
      <PayrollLineChart />
      <Card className="mt-6 p-3">
        <CardContent>
          <h3 className="text-lg font-semibold mb-3">
            Latest Payment Requests
          </h3>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px] w-full text-sm text-left shadow-md rounded-md overflow-hidden">
              <TableHead className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
                <TableRow>
                  <TableHeadCell className="px-4 py-2">Employee</TableHeadCell>
                  <TableHeadCell className="px-4 py-2">Month</TableHeadCell>
                  <TableHeadCell className="px-4 py-2">Status</TableHeadCell>
                  <TableHeadCell className="px-4 py-2">Amount</TableHeadCell>
                </TableRow>
              </TableHead>

              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                {latestPaymentLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan="4"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      <SmallSpinner />
                    </TableCell>
                  </TableRow>
                ) : (
                  latestPayments.map((item, idx) => (
                    <TableRow
                      key={item._id}
                      className={
                        idx % 2 === 0
                          ? "bg-blue-50/40 dark:bg-gray-800/50"
                          : "bg-white dark:bg-gray-900"
                      }
                    >
                      <TableCell className="px-4 py-2 font-medium text-gray-800 dark:text-gray-100">
                        {item.employeeId?.name}
                      </TableCell>

                      <TableCell className="px-4 py-2 capitalize text-gray-600 dark:text-gray-300">
                        {item.month}
                      </TableCell>

                      <TableCell className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            item.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : item.paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </TableCell>

                      <TableCell className="px-4 py-2 font-semibold text-blue-700 dark:text-blue-400">
                        ৳{item.salary}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
