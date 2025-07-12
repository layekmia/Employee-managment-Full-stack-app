import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../hook/useAuth";
import axiosInstance from "../utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
} from "flowbite-react";
import { formatDate } from "../utils/helper";
import Spinner from "../components/Dashboard/Spinner";

export default function PaymentHistory() {
  const { user } = useAuth();

  const { data: paymentsHistory = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user.uid],
    queryFn: async () => {
      const res = await axiosInstance.get("/payment-history");
      return res.data;
    },
  });

  if(isLoading) return <Spinner/>

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableHeadCell className="bg-blue-50">payment Date</TableHeadCell>
          <TableHeadCell className="bg-blue-50">Amount</TableHeadCell>
          <TableHeadCell className="bg-blue-50">Transaction Id</TableHeadCell>
          <TableHeadCell className="bg-blue-50">Status</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {paymentsHistory.map((payment) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {formatDate(new Date(payment.paymentDate)) || "Processing"}
              </TableCell>
              <TableCell className="font-medium text-green-600">{payment.salary} TK</TableCell>
              <TableCell>{payment.transactionId || "--"}</TableCell>
              <TableCell>
                {payment.paymentStatus === "Paid" ? (
                  <Badge color="success" size="xs" className="w-fit">
                    Paid
                  </Badge>
                ) : (
                  payment.paymentStatus
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
